(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(function () {});
  }

  var standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  if (standalone) return;

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var onHome = location.pathname === "/" || /home\.html$/.test(location.pathname);
  var deferred = null;

  function hideBar() {
    document.body.classList.add("pwa-hide");
    try { sessionStorage.setItem("pwa-hide", "1"); } catch (e) {}
  }

  if (onHome) {
    var bar = document.createElement("div");
    bar.id = "pwa-bar";
    bar.setAttribute("dir", "rtl");
    bar.innerHTML = ios
      ? '<button type="button" id="pwa-close" aria-label="סגור">×</button><span>באייפון: Safari → <b>שיתוף</b> → <b>הוספה למסך הבית</b></span>'
      : '<button type="button" id="pwa-close" aria-label="סגור">×</button><button type="button" id="pwa-install">התקינו כאפליקציה</button>';
    document.head.insertAdjacentHTML(
      "beforeend",
      "<style>" +
        "#pwa-bar{position:fixed;z-index:50;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));" +
        "display:flex;align-items:center;justify-content:center;gap:10px;" +
        "background:rgba(22,33,44,.96);color:#e8e3d7;border:1px solid #2a3a49;border-radius:14px;" +
        "padding:10px 12px;font:14px/1.45 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28)}" +
        "#pwa-bar span{flex:1;text-align:right}" +
        "#pwa-install{appearance:none;border:0;border-radius:10px;background:#5fb3d4;color:#0d1720;" +
        "font:700 14px sans-serif;padding:10px 14px;cursor:pointer}" +
        "#pwa-close{appearance:none;border:0;background:transparent;color:#9aa8b4;font-size:22px;" +
        "line-height:1;width:36px;height:36px;cursor:pointer}" +
        "body.pwa-hide #pwa-bar{display:none}" +
        "</style>"
    );
    document.body.appendChild(bar);
    document.getElementById("pwa-close").addEventListener("click", hideBar);
    try {
      if (sessionStorage.getItem("pwa-hide") === "1") document.body.classList.add("pwa-hide");
    } catch (e) {}
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    document.body.classList.remove("pwa-hide");
  });

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || t.id !== "pwa-install") return;
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.finally(function () {
      deferred = null;
      hideBar();
    });
  });
})();
