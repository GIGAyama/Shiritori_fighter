/*
 * GIGA Standard Part I（共通技術仕様）の検査。
 *
 * 静的に読めることだけを見る。コントラストやタップ領域のように
 * 「実ブラウザで測らないと分からないもの」はここでは判定しない。
 * 測っていないものを ✅ と書かないため、この切り分けは崩さないこと。
 */

// 判定の前にコメントを落とす。落とさないと
// 「localStorage は操作しない」という注意書きに検査が反応する（実際に起きた誤検知）。
const stripComments = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/(^|[^:])\/\/.*$/gm, '$1 ')
  .replace(/<!--[\s\S]*?-->/g, ' ');

export function run(ctx) {
  const found = [];
  const err = (id, message, where) => found.push({ level: 'error', id, message, where });
  const warn = (id, message, where) => found.push({ level: 'warn', id, message, where });

  const htmlFiles = ctx.textFiles().filter((f) => f.endsWith('.html'));
  const cssFiles = ctx.textFiles().filter((f) => f.endsWith('.css'));
  const jsFiles = ctx.textFiles().filter((f) => f.endsWith('.js') && !f.startsWith('scripts/'));
  const entry = ctx.config.entry || 'index.html';

  /* ---------------- 表示 ---------------- */
  for (const f of htmlFiles) {
    const html = ctx.read(f);
    const vp = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
    if (f === entry || f === 'offline.html') {
      if (!vp) err('VIEWPORT', 'viewport の指定が無い', f);
      else if (!/viewport-fit=cover/.test(vp[0])) err('VIEWPORT_FIT', 'viewport に viewport-fit=cover が無い', f);
    }
    if (vp && /user-scalable=no|maximum-scale=1(\.0)?\b/.test(vp[0])) {
      err('VIEWPORT_NO_SCALE', '拡大を禁止している（見えづらい子が拡大できなくなる）', f);
    }
  }

  // 100vh の単独使用。@supports のフォールバックや、直後・直前に dvh を重ねてある形は正しい。
  // 前後を見ないと、正しく書いてあるものまで誤検知する（実際に起きた誤検知）。
  for (const f of [...cssFiles, ...htmlFiles]) {
    const lines = ctx.read(f).split('\n');
    lines.forEach((line, i) => {
      if (!/\b100vh\b/.test(line)) return;
      const around = lines.slice(Math.max(0, i - 3), i + 4).join('\n');
      if (/\b100dvh\b/.test(around)) return;                      // dvh を重ねてある
      if (/@supports[^{]*100dvh/.test(around)) return;            // @supports で受けている
      err('VIEWPORT_100VH', '100vh を単独で使っている（モバイルでアドレスバー分はみ出す）', `${f}:${i + 1}`);
    });
  }

  // ⚠️ 本体のスタイルだけを見る。offline.html まで混ぜると、
  //    本体から forced-colors が消えても offline.html の分で通ってしまう
  //    （自己テストで実際にすり抜けた）。
  const allStyle = [...cssFiles, ctx.exists(entry) ? entry : null]
    .filter(Boolean).map((f) => ctx.read(f)).join('\n');
  if (!/safe-area-inset/.test(allStyle)) err('SAFE_AREA', 'safe-area-inset を使っていない');
  if (!/clamp\(/.test(allStyle)) warn('FLUID_TYPE', 'clamp() による文字サイズの調整が無い');

  const rm = allStyle.match(/@media[^{]*prefers-reduced-motion[^{]*\{[\s\S]{0,600}?\}\s*\}/);
  if (!rm) err('REDUCED_MOTION', 'prefers-reduced-motion に対応していない');
  else if (/animation-duration:\s*0s?\b/.test(rm[0])) {
    // 0 にすると animation-fill-mode: forwards が壊れ、fadeIn 系の要素が消える
    err('REDUCED_MOTION_ZERO', 'animation-duration を 0 にしている（.01ms にすること）');
  }
  if (!/forced-colors:\s*active/.test(allStyle)) err('FORCED_COLORS', 'forced-colors（ハイコントラスト）に対応していない');

  if (ctx.config.presentationMode && !/\.presentation\b/.test(allStyle)) {
    err('PRESENTATION', '提示モード（.presentation）が無い');
  }
  if (ctx.config.printCss && !/@media\s+print/.test(allStyle)) err('PRINT_CSS', '印刷用の CSS が無い');

  // ふりがなの色。決め打ちするなら、色のついた面では継がせる指定が要る。
  if (/(^|[\s,{}])rt\s*\{[^}]*color\s*:/m.test(allStyle) && !/rt\s*\{\s*color:\s*inherit/.test(allStyle)) {
    err('RT_COLOR', 'rt の色を決め打ちしているが、色のついた面で継がせる指定が無い');
  }

  // Canvas の DPR 補正
  for (const f of jsFiles) {
    const body = stripComments(ctx.read(f));
    if (/getContext\(\s*['"]2d['"]/.test(body) && !/devicePixelRatio/.test(body)) {
      err('CANVAS_DPR', 'Canvas に devicePixelRatio の補正が無い（高DPI機でぼやける）', f);
    }
  }

  /* ---------------- 依存とCSP ---------------- */
  for (const f of htmlFiles) {
    const html = ctx.read(f);
    if (/babel\/standalone/.test(html)) err('CDN_BABEL', 'ブラウザの中で JSX をコンパイルしている', f);
    if (/cdn\.tailwindcss\.com/.test(html)) err('CDN_TAILWIND', 'Tailwind をブラウザ内で生成している', f);
    for (const m of html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)) {
      if (/^https?:\/\//.test(m[1])) err('CDN_EXEC', `実行コードを外部から読んでいる: ${m[1]}`, f);
    }
    // インラインの <script>（中身のあるもの）と onclick= は script-src 'self' で動かない。
    // ⚠️ 判定の前にコメントを落とす。落とさないと「インラインの <script> を書き足すな」
    //    という注意書き自体に反応する（この検査を作ったその日に踏んだ）。
    const code = stripComments(html);
    for (const m of code.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
      if (m[1].trim()) err('INLINE_SCRIPT', 'インラインの <script> がある（CSP で動かない）', f);
    }
    if (/\son\w+\s*=\s*["']/i.test(code)) err('INLINE_HANDLER', 'onclick= などの属性がある（CSP で動かない）', f);
    if (/<[^>]+\sstyle=["']/.test(code)) warn('INLINE_STYLE', 'style 属性がある（style-src に unsafe-inline が要る）', f);
  }

  const entryHtml = ctx.exists(entry) ? ctx.read(entry) : '';
  const csp = entryHtml.match(/<meta[^>]+Content-Security-Policy[\s\S]*?>/i);
  if (!csp) {
    err('CSP', 'CSP が無い', entry);
  } else {
    if (/script-src[^;]*'unsafe-inline'/.test(csp[0])) err('CSP_UNSAFE_INLINE', "script-src に 'unsafe-inline' がある", entry);
    // <meta> の frame-ancestors は無視され、警告が出るだけになる
    if (/frame-ancestors/.test(csp[0])) err('CSP_FRAME_ANCESTORS', '<meta> の frame-ancestors は無視される', entry);
  }

  /* ---------------- PWA ---------------- */
  if (ctx.exists('manifest.webmanifest')) {
    const man = JSON.parse(ctx.read('manifest.webmanifest'));
    const want = `/${ctx.config.repo}/`;
    for (const key of ['id', 'start_url', 'scope']) {
      if (man[key] !== want) err('MANIFEST_ABS', `manifest の ${key} が "${man[key]}"（"${want}" にすること）`, 'manifest.webmanifest');
    }
    const purposes = (man.icons || []).map((i) => i.purpose);
    if (!purposes.includes('maskable')) err('MANIFEST_MASKABLE', 'maskable アイコンが無い', 'manifest.webmanifest');
  } else {
    err('MANIFEST', 'manifest.webmanifest が無い');
  }

  if (!ctx.exists('offline.html')) err('OFFLINE_HTML', 'offline.html が無い');
  else if (/<script/i.test(ctx.read('offline.html'))) err('OFFLINE_JS', 'offline.html が JavaScript に頼っている');

  if (!ctx.exists('install-hook.js')) {
    err('INSTALL_HOOK', 'install-hook.js が無い（beforeinstallprompt を取りこぼす）');
  } else if (entryHtml) {
    const hookAt = entryHtml.indexOf('install-hook.js');
    const firstOther = [...entryHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)]
      .filter((m) => !m[1].includes('install-hook.js')).map((m) => m.index)[0] ?? Infinity;
    if (hookAt < 0 || hookAt > firstOther) {
      err('INSTALL_HOOK_ORDER', 'install-hook.js が他のスクリプトより後ろにある', entry);
    }
  }

  const swPath = ['sw.js', 'docs/sw.js', 'public/sw.js'].find((p) => ctx.exists(p));
  if (!swPath) {
    err('SW', 'sw.js が無い');
  } else {
    const raw = ctx.read(swPath);
    const sw = stripComments(raw);
    // 「消す式」を正規表現で追うと (k) => caches.delete(k) を見落とす。
    // 見るべきは「startsWith で自アプリ分に絞っているか」。
    if (/caches\.keys\(/.test(sw) && !/startsWith\(/.test(sw)) {
      err('SW_CACHE_WIPE', '他アプリのキャッシュまで消している（接頭辞で絞ること）', swPath);
    }
    if (/localStorage/.test(sw)) err('SW_LOCALSTORAGE', 'Service Worker が localStorage を触っている', swPath);
    const install = sw.match(/addEventListener\(\s*['"]install['"][\s\S]*?(?=addEventListener\(\s*['"]activate['"]|$)/);
    if (install && /skipWaiting\s*\(/.test(install[0])) {
      err('SW_SKIP_WAITING', 'install の中で skipWaiting している（操作中に中身が入れ替わる）', swPath);
    }
    if (!/SKIP_WAITING/.test(sw)) warn('SW_UPDATE_MSG', '更新を受け取る message ハンドラが無い', swPath);
  }

  // controllerchange は初回訪問でも飛んでくる。そのまま受けると必ず1回リロードされる。
  // 「もともと管理下だったか」で分ける直し方も別の形で壊れるので、
  // 見るべきは『利用者が押したかどうか』だけ。
  // 変数名で判定すると名前を変えただけですり抜けるため、
  // 「早期 return の条件に使っている変数が、SKIP_WAITING を送る場所で true になっているか」を見る。
  for (const f of jsFiles) {
    const body = stripComments(ctx.read(f));
    const at = body.indexOf('controllerchange');
    if (at < 0) continue;
    const seg = body.slice(at, at + 500);
    if (!/location\.reload/.test(seg)) continue;
    const guard = seg.match(/if\s*\(([^)]*)\)\s*(?:\{\s*)?return/);
    const ids = guard ? [...guard[1].matchAll(/[A-Za-z_$][\w$]*/g)].map((m) => m[0]) : [];
    // その変数が true になるのは「SKIP_WAITING を送る場所」でなければならない。
    // 近さだけで見ると、たまたま近くにある別の変数（二重リロード防止など）で通ってしまう。
    // 代入のあと、location.reload より先に SKIP_WAITING が来ることまで見る。
    const tiedToUserPress = ids.some((id) => [...body.matchAll(new RegExp(`${id}\\s*=\\s*true`, 'g'))]
      .some((m) => {
        const after = body.slice(m.index, m.index + 400);
        const skip = after.indexOf('SKIP_WAITING');
        const reload = after.indexOf('location.reload');
        return skip >= 0 && (reload < 0 || skip < reload);
      }));
    if (!tiedToUserPress) {
      err('SW_CONTROLLERCHANGE', 'controllerchange が「利用者が押したか」で分かれていない（初回訪問が勝手にリロードされる）', f);
    }
  }

  // Service Worker の登録は「もう load が済んでいる」場合を見ること
  for (const f of jsFiles) {
    const body = stripComments(ctx.read(f));
    if (!/serviceWorker\.register/.test(body)) continue;
    if (/readyState/.test(body)) continue;
    if (/addEventListener\(\s*['"](load|DOMContentLoaded)['"]/.test(body)) {
      err('SW_REGISTER_LOAD', 'load を待つだけで登録している（済んでいると二度と呼ばれない）', f);
    }
  }

  /* ---------------- 画像 ---------------- */
  const { iconLargeBytes = 61440, iconSmallBytes = 30720, imageBytes = 153600 } = ctx.config.budgets || {};
  for (const f of ctx.files().filter((p) => /\.(png|jpe?g|webp|gif)$/i.test(p))) {
    const size = ctx.size(f);
    const isIcon = f.startsWith('icons/');
    const limit = isIcon ? (/512/.test(f) ? iconLargeBytes : iconSmallBytes) : imageBytes;
    if (size > limit) {
      err('IMAGE_SIZE', `${(size / 1024).toFixed(1)}KB（上限 ${(limit / 1024).toFixed(0)}KB。パレット化で下がる）`, f);
    }
  }

  // apple-touch-icon に透明があると、iOS がその部分を黒で埋める
  if (ctx.exists('icons/apple-touch-icon.png')) {
    const png = ctx.buffer('icons/apple-touch-icon.png');
    if (pngHasAlpha(png)) err('APPLE_ICON_ALPHA', 'apple-touch-icon に透明が含まれる（iPad で四隅が黒くなる）', 'icons/apple-touch-icon.png');
  } else {
    err('APPLE_ICON', 'icons/apple-touch-icon.png が無い');
  }

  // <img> には width/height（レイアウトのガタつきを防ぐ）
  for (const f of htmlFiles) {
    for (const m of ctx.read(f).matchAll(/<img\b[^>]*>/gi)) {
      if (!/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])) err('IMG_SIZE_ATTR', '<img> に width/height が無い', f);
      if (!/\balt=/.test(m[0])) err('IMG_ALT', '<img> に alt が無い', f);
    }
  }

  return found;
}

// PNG のチャンクだけ見て、透明を持ちうるかを判定する（画像を展開しない）
function pngHasAlpha(buf) {
  if (buf.length < 26 || buf.readUInt32BE(0) !== 0x89504e47) return false;
  const colorType = buf[25];
  if (colorType === 4 || colorType === 6) return true;   // グレー+α / RGBA
  let pos = 8;
  while (pos + 8 <= buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'tRNS') return true;                    // パレット等に透明色がある
    if (type === 'IDAT' || type === 'IEND') return false;
    pos += 12 + len;
  }
  return false;
}
