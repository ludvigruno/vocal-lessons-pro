import { sendToYandexMetrika } from "./yandex-metrika.js";

// Разрешаем только цифры, +, -, пробел
document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9+\- ]/g, "");
});

// Инициализация emailJS
(function () {
  emailjs.init("8aL2nfDJJWnZpoBOG");
})();

document.getElementById("contact-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoader = document.getElementById("btn-loader");

  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  // === Проверка honeypot ===
  const botField = document.getElementById("bot")

  if (!submitBtn || !btnText || !btnLoader) {
    console.error("❌ Ошибка: кнопка или лоадер не найдены.");
    return;
  }

  if (botField && botField.value.trim() !== "") {
  console.warn("⚠️ Бот обнаружен — форма не отправлена.");
  return; // форма не отправляется, пользователь не видит ошибок
  }
  
  // === Проверка e-mail ===
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Пожалуйста, введите корректный адрес электронной почты.");
    emailInput.focus();
    return;
  }

  // === Проверка телефона ===
  const phone = phoneInput.value.trim();
  // Разрешаем минимум 7 цифр, допускаем +, -, пробелы
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  if (phoneDigits.length < 7) {
    alert("❌ Пожалуйста, введите настоящий номер телефона (не менее 7 цифр).");
    phoneInput.focus();
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
