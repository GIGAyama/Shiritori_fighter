/*
 * インストールの合図（beforeinstallprompt）を、いちばん先に受け取るための小さなファイル。
 *
 * Chrome は条件が揃うと即座にこの合図を出す。本体スクリプトの読み込みや
 * DOMContentLoaded を待ってから登録すると、通信が遅い端末では合図が先に飛んでしまい、
 * 「インストール」ボタンが永久に出てこない。
 * CSP に 'unsafe-inline' を足さずに済むよう、インラインではなく外部ファイルにして
 * <head> の先頭で同期読み込みしている。
 */
(function () {
  window.__pwaInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event('pwa-install-available'));
  });

  window.addEventListener('appinstalled', function () {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event('pwa-installed'));
  });
})();
