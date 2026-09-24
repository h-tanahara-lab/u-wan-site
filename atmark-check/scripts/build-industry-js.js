#!/usr/bin/env node
/**
 * data/industry.json → data/industry.js の変換スクリプト（1本のみ・二重管理防止）
 *
 * 使い方：
 *   node scripts/build-industry-js.js
 *   node scripts/build-industry-js.js path/to/input.json path/to/output.js
 *
 * 引数省略時は data/industry.json を読み、data/industry.js に書き出す。
 * data/industry.json がまだ存在しない場合（T3未完了）は data/industry.sample.json を代わりに使い、
 * その旨を出力ファイル先頭のコメントに明記する。
 *
 * 出力される industry.js は <script> で file:// でも読める素のJS（IIFE的にグローバル定数を1つ置くだけ）。
 * 正はあくまで industry.json。industry.js は「file:// でも読めるようにするための生成物」で、
 * 手で編集しない（このスクリプトを再実行して作り直す）。
 */

'use strict';

var fs = require('fs');
var path = require('path');

var DATA_DIR = path.join(__dirname, '..', 'data');
var DEFAULT_INPUT = path.join(DATA_DIR, 'industry.json');
var SAMPLE_INPUT = path.join(DATA_DIR, 'industry.sample.json');
var DEFAULT_OUTPUT = path.join(DATA_DIR, 'industry.js');

function main() {
  var args = process.argv.slice(2);
  var inputPath = args[0];
  var outputPath = args[1] || DEFAULT_OUTPUT;
  var usingSample = false;

  if (!inputPath) {
    if (fs.existsSync(DEFAULT_INPUT)) {
      inputPath = DEFAULT_INPUT;
    } else if (fs.existsSync(SAMPLE_INPUT)) {
      inputPath = SAMPLE_INPUT;
      usingSample = true;
      console.warn(
        '[build-industry-js] data/industry.json が見つからないため data/industry.sample.json を使用します（T3完了後に本番データで再生成してください）。'
      );
    } else {
      console.error('[build-industry-js] 入力ファイルが見つかりません: ' + DEFAULT_INPUT);
      process.exit(1);
    }
  }

  var raw = fs.readFileSync(inputPath, 'utf8');
  var data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('[build-industry-js] JSONパースに失敗しました: ' + inputPath);
    console.error(e.message);
    process.exit(1);
  }

  var sourceNote = usingSample
    ? '入力: data/industry.sample.json（暫定・T3完了後に data/industry.json から再生成すること）'
    : '入力: data/industry.json';

  var header = [
    '/**',
    ' * 自動生成ファイル。手で編集しない。',
    ' * 生成元: scripts/build-industry-js.js',
    ' * ' + sourceNote,
    ' * 生成日時: ' + new Date().toISOString(),
    ' *',
    ' * file:// で <script src="data/industry.js"></script> として読み込むためのJSON埋め込み版。',
    ' * 正は data/industry.json（またはT3完了前は data/industry.sample.json）。',
    ' * 内容を変えたいときはこのファイルを直接編集せず、元データを直してこのスクリプトを再実行する。',
    ' */',
    '',
  ].join('\n');

  var body =
    'var INDUSTRY_DATA = ' + JSON.stringify(data, null, 2) + ';\n\n' +
    "if (typeof module === 'object' && module.exports) {\n" +
    '  module.exports = INDUSTRY_DATA;\n' +
    '}\n';

  fs.writeFileSync(outputPath, header + body, 'utf8');
  console.log('[build-industry-js] 書き出し完了: ' + outputPath + (usingSample ? '（sample.jsonから生成・暫定）' : ''));
}

main();
