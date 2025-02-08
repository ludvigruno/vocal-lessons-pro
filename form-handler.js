import { sendToYandexMetrika } from "./yandex-metrika.js";

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9+\- ]/g, ""); // Очищаем ввод
});

// Инициализация emailJS
(function () {
  emailjs.init("8aL2nfDJJWnZpoBOG");
})();

document.getElementById("contact-form").addEventListener("submit", async function (event) {
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

  // Отправляем цель в Яндекс.Метрику
  sendToYandexMetrika("form_submit");

  try {
    await emailjs.sendForm("service_xkjjzl9", "template_hue43vi", this);
    alert("✅ Сообщение отправлено успешно!");
    this.reset();
  } catch (error) {
    console.error("❌ Ошибка при отправке:", error);
    alert("❌ Ошибка при отправке, попробуйте снова.");
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Отправить";
    btnLoader.classList.add("hidden");
    console.log("✔️ Форма сброшена.");
  }
});
