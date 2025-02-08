document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+\- ]/g, ""); // Удаляет буквы автоматически
  });
  
  (function () {
    emailjs.init("8aL2nfDJJWnZpoBOG");
  })();
  
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
  
      let submitBtn = document.getElementById("submit-btn");
      let btnText = document.getElementById("btn-text");
      let btnLoader = document.getElementById("btn-loader");
  
      if (!submitBtn || !btnText || !btnLoader) {
        console.error("❌ Ошибка: кнопка или лоадер не найдены.");
        return;
      }
  
      console.log("⏳ Отправка сообщения...");
  
      submitBtn.disabled = true;
      btnText.textContent = "Отправка...";
      btnLoader.classList.remove("hidden");
  
      // ОТПРАВКА ЦЕЛИ В ЯНДЕКС МЕТРИКУ
      ym(99534141, "reachGoal", "form_submit");
      console.log("🎯 Цель form_submit отправлена в Яндекс Метрику!");
  
      emailjs
        .sendForm("service_xkjjzl9", "template_hue43vi", this)
        .then(() => {
          alert("✅ Сообщение отправлено успешно!");
          document.getElementById("contact-form").reset();
        })
        .catch((error) => {
          console.error("❌ Ошибка при отправке:", error);
          alert("❌ Ошибка при отправке, попробуйте снова.");
        })
        .finally(() => {
          submitBtn.disabled = false;
          btnText.textContent = "Отправить";
          btnLoader.classList.add("hidden");
          console.log("✔️ Форма сброшена.");
        });
    });
  
  // Yandex.Metrika counter
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
  })(
    window,
    document,
    "script",
    "https://mc.yandex.ru/metrika/tag.js",
    "ym"
  );
  
  ym(99534141, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
  