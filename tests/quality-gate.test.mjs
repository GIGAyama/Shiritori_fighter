/*
 * 品質ゲートが本当に動いているかを確かめる。
 *
 * 「0件でした」だけでは、検査が動いているのか何も見ていないのか区別できない。
 * わざと壊した複製を作って、狙った検査が落ちることを1件ずつ確かめる。
 * （この確認をしたことで、実際に検査そのものの誤検知が見つかっている）
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

function runCheck(mutate) {
  const dir = mkdtempSync(join(tmpdir(), 'giga-check-'));
  cpSync(ROOT, dir, {
    recursive: true,
    filter: (src) => !src.includes(`${ROOT}/.git/`) && !src.includes('/node_modules/'),
  });
  try {
    if (mutate) mutate(dir);
    const out = execFileSync(process.execPath, [join(dir, 'scripts/check-project.mjs')], {
      env: { ...process.env, CHECK_ROOT: dir }, encoding: 'utf8',
    });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout || ''}${e.stderr || ''}` };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const edit = (dir, file, fn) => {
  const p = join(dir, file);
  writeFileSync(p, fn(readFileSync(p, 'utf8')));
};

test('いまのリポジトリは品質ゲートを通る', () => {
  const { code, out } = runCheck();
  assert.equal(code, 0, out);
});

const CASES = [
  ['LICENSE を消すと落ちる', 'LICENSE',
    (d) => unlinkSync(join(d, 'LICENSE'))],

  ['CI が push だけになると落ちる', 'CI_PR',
    (d) => edit(d, '.github/workflows/ci.yml', (s) => s.replace(/^\s*pull_request:\s*$/m, ''))],

  ['100vh の単独使用を見つける', 'VIEWPORT_100VH',
    (d) => edit(d, 'css/style.css', (s) => s.replace(/    min-height: 100dvh;\n/, ''))],

  ['拡大の禁止を見つける', 'VIEWPORT_NO_SCALE',
    (d) => edit(d, 'index.html', (s) => s.replace('viewport-fit=cover"', 'viewport-fit=cover, user-scalable=no"'))],

  ['提示モードが無いと落ちる', 'PRESENTATION',
    (d) => edit(d, 'css/style.css', (s) => s.replaceAll('.presentation', '.big-view'))],

  ['ふりがなの色の決め打ちを見つける', 'RT_COLOR',
    (d) => edit(d, 'css/style.css', (s) => s.replace('button rt, a rt, label rt,', 'button rt2, a rt2, label rt2,')
      .replace(/\[class\*="btn"\] rt, \[class\*="bg-"\] rt \{ color: inherit; \}/, ''))],

  ['CSP が無いと落ちる', 'CSP',
    (d) => edit(d, 'index.html', (s) => s.replace(/<meta http-equiv="Content-Security-Policy"[\s\S]*?">/, ''))],

  ["script-src に 'unsafe-inline' を足すと落ちる", 'CSP_UNSAFE_INLINE',
    (d) => edit(d, 'index.html', (s) => s.replace("script-src 'self';", "script-src 'self' 'unsafe-inline';"))],

  ['<meta> の frame-ancestors を見つける', 'CSP_FRAME_ANCESTORS',
    (d) => edit(d, 'index.html', (s) => s.replace("object-src 'none';", "object-src 'none'; frame-ancestors 'none';"))],

  ['インラインの <script> を見つける', 'INLINE_SCRIPT',
    (d) => edit(d, 'index.html', (s) => s.replace('</body>', '<script>window.x = 1;</script>\n</body>'))],

  ['onclick= を見つける', 'INLINE_HANDLER',
    (d) => edit(d, 'index.html', (s) => s.replace('<button id="sound-btn"', '<button onclick="foo()" id="sound-btn"'))],

  ['CDN からの実行コードを見つける', 'CDN_EXEC',
    (d) => edit(d, 'index.html', (s) => s.replace('</head>', '<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>\n</head>'))],

  ['ブラウザ内 Babel を見つける', 'CDN_BABEL',
    (d) => edit(d, 'index.html', (s) => s.replace('</head>', '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n</head>'))],

  ['manifest の相対パスを見つける', 'MANIFEST_ABS',
    (d) => edit(d, 'manifest.webmanifest', (s) => s.replace('"start_url": "/Shiritori_fighter/"', '"start_url": "."'))],

  ['offline.html を消すと落ちる', 'OFFLINE_HTML',
    (d) => unlinkSync(join(d, 'offline.html'))],

  ['install-hook.js が後ろにあると落ちる', 'INSTALL_HOOK_ORDER',
    (d) => edit(d, 'index.html', (s) => s.replace('<script src="/Shiritori_fighter/install-hook.js"></script>\n', '')
      .replace('<script src="/Shiritori_fighter/js/app.js"></script>',
        '<script src="/Shiritori_fighter/js/app.js"></script>\n<script src="/Shiritori_fighter/install-hook.js"></script>'))],

  // 「消す式」ではなく「startsWith で絞る式があるか」を見ているか。
  // 削除式を正規表現で追う作りだと (k) => caches.delete(k) を見落とす。
  ['他アプリのキャッシュ全削除を見つける', 'SW_CACHE_WIPE',
    (d) => edit(d, 'sw.js', (s) => s.replace(/\.filter\([\s\S]*?\)\)\n/, '').replace(/startsWith/g, 'beginsWith'))],

  ['Service Worker の localStorage 操作を見つける', 'SW_LOCALSTORAGE',
    (d) => edit(d, 'sw.js', (s) => s.replace("self.addEventListener('message'", "localStorage.setItem('x','1');\nself.addEventListener('message'"))],

  ['install の中の skipWaiting を見つける', 'SW_SKIP_WAITING',
    (d) => edit(d, 'sw.js', (s) => s.replace('    // ここでは skipWaiting しない。', '    self.skipWaiting();'))],

  // 「押したかどうか」の判定を外し、reloading（二重防止）だけで守る形にする。
  // これは初回訪問でもリロードしてしまう壊れた形なので、検査は落ちなければならない。
  ['controllerchange の素通しを見つける', 'SW_CONTROLLERCHANGE',
    (d) => edit(d, 'js/app.js', (s) => s.replace('if (!userAskedUpdate || reloading) return;', 'if (reloading) return;'))],

  ['forced-colors が本体から消えると落ちる', 'FORCED_COLORS',
    (d) => edit(d, 'css/style.css', (s) => s.replace(/forced-colors:\s*active/g, 'forced-colours: active'))],

  ['アイコンが重すぎると落ちる', 'IMAGE_SIZE',
    (d) => writeFileSync(join(d, 'icons/icon-512.png'), Buffer.alloc(70 * 1024, 7))],

  ['<img> の width/height 抜けを見つける', 'IMG_SIZE_ATTR',
    (d) => edit(d, 'index.html', (s) => s.replace('</body>', '<img src="a.png" alt="a">\n</body>'))],
];

for (const [name, id, mutate] of CASES) {
  test(`わざと壊す: ${name}`, () => {
    const { code, out } = runCheck(mutate);
    assert.equal(code, 1, `落ちなかった。検査が何も見ていない可能性がある\n${out}`);
    assert.match(out, new RegExp(`\\[${id}\\]`), `別の検査で落ちている（${id} が出ていない）\n${out}`);
  });
}
