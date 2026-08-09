#!/usr/bin/env node
/*
 * 品質ゲート。CI と同じものを手元でも走らせる： npm run check
 *
 * 汎用の検査（project-quality.mjs）と Part I の検査（giga-v4-checks.mjs）を
 * ここで合成する。正本が更新されたら project-quality.mjs を丸ごと差し替えられる形にしてある。
 *
 * ⚠️ 検査は「わざと壊して落ちること」を確かめてから信用すること。
 *    0件でしたという結果だけでは、検査が動いているのか何も見ていないのか区別できない。
 *    確かめ方は scripts/selftest-quality.mjs（npm run check:selftest 相当）。
 */
import { readFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { run as runProject } from './lib/project-quality.mjs';
import { run as runGiga } from './lib/giga-v4-checks.mjs';

const ROOT = process.env.CHECK_ROOT
  || fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', '.github/ISSUE_TEMPLATE']);
const TEXT_EXT = /\.(html|css|js|mjs|json|webmanifest|md|yml|yaml)$/i;

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    const rel = relative(ROOT, abs).split(sep).join('/');
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(abs, acc);
    } else {
      acc.push(rel);
    }
  }
  return acc;
}

const allFiles = walk(ROOT);
const cache = new Map();

const ctx = {
  root: ROOT,
  config: JSON.parse(readFileSync(join(ROOT, 'quality.config.json'), 'utf8')),
  files: () => allFiles,
  textFiles: () => allFiles.filter((f) => TEXT_EXT.test(f)),
  exists: (p) => existsSync(join(ROOT, p)),
  size: (p) => statSync(join(ROOT, p)).size,
  buffer: (p) => readFileSync(join(ROOT, p)),
  read: (p) => {
    if (!cache.has(p)) cache.set(p, readFileSync(join(ROOT, p), 'utf8'));
    return cache.get(p);
  },
};

const findings = [...runProject(ctx), ...runGiga(ctx)];
const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

const line = (f) => `  [${f.id}] ${f.message}${f.where ? `  — ${f.where}` : ''}`;

console.log(`品質ゲート（${ctx.config.repo}）`);
if (warns.length) {
  console.log(`\n注意 ${warns.length}件`);
  warns.forEach((f) => console.log(line(f)));
}
if (errors.length) {
  console.log(`\n直すこと ${errors.length}件`);
  errors.forEach((f) => console.log(line(f)));
  console.log('\n※ コントラスト・タップ領域・PWA の挙動は静的には測れない。');
  console.log('  実ブラウザでの測定結果は AUDIT.md を見ること。');
  process.exit(1);
}
console.log(`\n通過（error 0件 / warn ${warns.length}件）`);
console.log('※ コントラスト・タップ領域・PWA の挙動は静的には測れない。AUDIT.md の実測を参照。');
