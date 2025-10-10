/**
 * Webアプリケーションにアクセスしたときに呼び出されるメイン関数。
 * index.htmlを読み込んで表示します。
 */
function doGet() {
  // index.html ファイルからHTML出力を生成し、Webページのタイトルを設定します。
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('しりとりファイター');
}
