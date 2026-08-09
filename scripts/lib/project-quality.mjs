/*
 * 汎用の品質検査（法務・配布・秘密情報・ファイルの大きさ）。
 *
 * ここはリポジトリ固有の内容を持たない。GIGA 全体で共通の「正本」に相当する部分で、
 * 正本が更新されたら丸ごと差し替えられるように、Part I 固有の検査は
 * giga-v4-checks.mjs に分けてある。
 */

const SECRET_PATTERNS = [
  { name: 'Google APIキー', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: 'スプレッドシートID風の直書き', re: /["'][a-zA-Z0-9_-]{40,50}["']\s*[,;)]/ },
  { name: 'メールアドレスの直書き', re: /[\w.+-]+@(?!example\.)[\w-]+\.[\w.]{2,}/ },
  { name: 'OAuthクライアントシークレット', re: /\bGOCSPX-[\w-]{20,}\b/ },
];

export function run(ctx) {
  const found = [];
  const err = (id, message, where) => found.push({ level: 'error', id, message, where });
  const warn = (id, message, where) => found.push({ level: 'warn', id, message, where });

  // ---- 法務・配布 ----
  if (!ctx.exists('LICENSE')) err('LICENSE', 'LICENSE が無い（実ファイルで置くこと）');
  if (!ctx.exists('.gitignore')) err('GITIGNORE', '.gitignore が無い');
  if (!ctx.exists('.github/dependabot.yml')) err('DEPENDABOT', '.github/dependabot.yml が無い');
  for (const doc of ctx.config.requiredDocs || []) {
    if (!ctx.exists(doc)) err('DOCS', `${doc} が無い`);
  }

  // CI は pull_request でも動くこと。push だけだと PR の時点で落ちていることに気づけない
  const ci = ctx.files().filter((f) => f.startsWith('.github/workflows/'));
  if (!ci.length) {
    err('CI', '.github/workflows にワークフローが無い');
  } else if (!ci.some((f) => /^\s*pull_request:/m.test(ctx.read(f)))) {
    err('CI_PR', 'CI が pull_request で動かない（push だけでは PR の時点で気づけない）', ci[0]);
  }

  // ---- 秘密情報 ----
  for (const f of ctx.files()) {
    if (/\.clasp\.json$|(^|\/)\.env$/.test(f)) err('SECRET_FILE', `${f} がコミットされている`, f);
  }
  for (const f of ctx.textFiles()) {
    if (f === 'scripts/lib/project-quality.mjs') continue;   // この検査自身の見本にあたるため
    const body = ctx.read(f);
    for (const p of SECRET_PATTERNS) {
      const m = body.match(p.re);
      if (!m) continue;
      const line = body.slice(0, m.index).split('\n').length;
      // 値そのものは報告しない（ファイル名と行番号だけ）
      warn('SECRET', `${p.name} らしき直書きがある`, `${f}:${line}`);
    }
  }

  // ---- ファイルの大きさ ----
  const { fileLines = 5000, fileBytes = 409600 } = ctx.config.budgets || {};
  for (const f of ctx.textFiles()) {
    const body = ctx.read(f);
    const lines = body.split('\n').length;
    const bytes = Buffer.byteLength(body);
    if (lines > fileLines) err('FILE_LINES', `${lines} 行（上限 ${fileLines} 行）`, f);
    if (bytes > fileBytes) err('FILE_BYTES', `${(bytes / 1024).toFixed(0)}KB（上限 ${(fileBytes / 1024).toFixed(0)}KB）`, f);
  }

  return found;
}
