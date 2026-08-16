(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (reg) { reg.unregister(); });
    });
  }
  if (window.caches) {
    caches.keys().then(function (keys) {
      keys.forEach(function (k) { caches.delete(k); });
    });
  }

  var standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  if (standalone) return;

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var onHome = location.pathname === "/" || /home\.html$/.test(location.pathname);
  if (!onHome) return;

  try {
    if (sessionStorage.getItem("pwa-hide") === "1") return;
  } catch (e) {}

  var bar = document.createElement("div");
  bar.id = "pwa-bar";
  bar.setAttribute("dir", "rtl");
  bar.innerHTML =
    '<button type="button" id="pwa-close" aria-label="סגור">×</button>' +
    (ios
      ? "<span>באייפון: Safari → <b>שיתוף</b> → <b>הוספה למסך הבית</b></span>"
      : "<span>לאנדרואיד: תפריט <b>⋮</b> → <b>הוספה למסך הבית</b><br>Add to Home screen — בלי התקנת APK</span>");
  document.head.insertAdjacentHTML(
    "beforeend",
    "<style>" +
      "#pwa-bar{position:fixed;z-index:50;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));" +
      "display:flex;align-items:flex-start;gap:10px;" +
      "background:rgba(22,33,44,.96);color:#e8e3d7;border:1px solid #2a3a49;border-radius:14px;" +
      "padding:12px;font:14px/1.5 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28)}" +
      "#pwa-bar span{flex:1;text-align:right}" +
      "#pwa-close{appearance:none;border:0;background:transparent;color:#9aa8b4;font-size:22px;" +
      "line-height:1;width:36px;height:36px;cursor:pointer;flex:0 0 auto}" +
      "</style>"
  );
  document.body.appendChild(bar);
  document.getElementById("pwa-close").addEventListener("click", function () {
    bar.remove();
    try { sessionStorage.setItem("pwa-hide", "1"); } catch (e) {}
  });
})();
