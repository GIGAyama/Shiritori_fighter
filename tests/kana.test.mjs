/*
 * かな変換としりとりの判定は、このゲームの中核。
 * ブラウザ用の素のスクリプトなので、vm で読み込んでそのまま試す。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const sandbox = createContext({});
runInContext(readFileSync(`${ROOT}/js/kana.js`, 'utf8'), sandbox);
const Kana = runInContext('Kana', sandbox);

test('ローマ字をひらがなにする', () => {
  assert.equal(Kana.toHiragana('ringo'), 'りんご');
  assert.equal(Kana.toHiragana('kitte'), 'きって');
  assert.equal(Kana.toHiragana('shashin'), 'しゃしん');
  assert.equal(Kana.toHiragana('koucha'), 'こうちゃ');
  assert.equal(Kana.toHiragana('tanuki'), 'たぬき');
});

test('カタカナをひらがなにする', () => {
  assert.equal(Kana.toHiragana('リンゴ'), 'りんご');
  assert.equal(Kana.toHiragana('ラーメン'), 'らーめん');
  assert.equal(Kana.toHiragana('ヴァイオリン'), 'ゔぁいおりん');
  // 全角スペースや記号は NFKC で整えてから判定する
  assert.equal(Kana.toHiragana('　りんご　'), 'りんご');
});

test('しりとりに使えることばかどうかを見分ける', () => {
  assert.equal(Kana.isValidWord('りんご'), true);
  assert.equal(Kana.isValidWord('らーめん'), true);
  assert.equal(Kana.isValidWord('りんご!'), false);
  assert.equal(Kana.isValidWord('リンゴ'), false);   // 変換前は通さない
  assert.equal(Kana.isValidWord(''), false);
});

test('次の文字を出す（小書き文字・長音符の扱い）', () => {
  assert.equal(Kana.nextChar('りんご'), 'ご');
  assert.equal(Kana.nextChar('らーめん'), 'ん');
  assert.equal(Kana.nextChar('けーき'), 'き');
  // 長音符で終わるときは、その前の音を見る（連続していても読み飛ばす）
  assert.equal(Kana.nextChar('こーひー'), 'ひ');
  assert.equal(Kana.nextChar('すぱげってぃ'), 'い');   // 小書き → 大きい文字に直す
  assert.equal(Kana.nextChar('がっこう'), 'う');
  assert.equal(Kana.nextChar('らっこ'), 'こ');
});

test('「ん」で終わることばは負けの判定に使える形で返る', () => {
  assert.equal(Kana.toHiragana('mikan').slice(-1), 'ん');
  assert.equal(Kana.toHiragana('ミカン').slice(-1), 'ん');
});
