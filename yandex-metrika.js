export function sendToYandexMetrika(goal) {
    if (typeof ym !== "undefined") {
      ym(99534141, "reachGoal", goal);
      console.log(`🎯 Цель ${goal} отправлена в Яндекс.Метрику!`);
    } else {
      console.warn("⚠️ Yandex Metrika не загружена.");
    }
  }
  
  // Инициализация Яндекс.Метрики
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    (k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
  ym(99534141, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
  