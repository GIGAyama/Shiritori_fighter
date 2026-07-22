/**
 * Webアプリケーションにアクセスしたときに呼び出されるメイン関数。
 * index.htmlを読み込んで表示します。
 *
 * 【補足】GAS上でもゲームは動作しますが、PWA機能（ホーム画面への
 * インストール・オフライン動作）は GitHub Pages などの静的ホスティングで
 * 公開した場合のみ有効になります。詳しくは README.md を参照してください。
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('しりとりファイター')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
}
