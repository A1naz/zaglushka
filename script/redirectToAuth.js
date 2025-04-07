document.getElementById("loginBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  let targetUrl = "https://app.harmex.ru";

  console.log(referralCode);
  if (referralCode) {
    localStorage.removeItem("referralCode");
    targetUrl = `https://app.harmex.ru/register?ref=${referralCode}`;
  }

  window.location.href = targetUrl;
});

document.getElementById("registerBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  let targetUrl = "https://app.harmex.ru";

  console.log(referralCode);
  if (referralCode) {
    localStorage.removeItem("referralCode");
    targetUrl = `https://app.harmex.ru/register?ref=${referralCode}`;
  }

  window.location.href = targetUrl;
});
