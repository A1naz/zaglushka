document.getElementById("loginBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  let targetUrl = "https://app.harmex.ru";

  const validHostnames = ["harmex.ru", "www.harmex.ru"];

  const isMainPage =
    validHostnames.includes(window.location.hostname) &&
    (window.location.pathname === "/" || window.location.pathname === "");
  console.log(isMainPage);

  if (referralCode) {
    localStorage.removeItem("referralCode");
    targetUrl = `https://app.harmex.ru/auth?ref=${referralCode}`;
  } else {
    if (isMainPage) {
      targetUrl =
        "https://app.harmex.ru/auth?ref=7917146c-ef4c-4b05-977c-1be2b73721b7";
    }
    targetUrl = "https://app.harmex.ru/auth";
  }

  window.open(targetUrl, "_blank");
});
document
  .getElementById("loginBtnWeb")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    let targetUrl = "https://app.harmex.ru";

    const isMainPage =
      validHostnames.includes(window.location.hostname) &&
      (window.location.pathname === "/" || window.location.pathname === "");
      
    if (referralCode) {
      localStorage.removeItem("referralCode");
      targetUrl = `https://app.harmex.ru/auth?ref=${referralCode}`;
    } else {
      if (isMainPage) {
        targetUrl =
          "https://app.harmex.ru/auth?ref=7917146c-ef4c-4b05-977c-1be2b73721b7";
      }
      targetUrl = "https://app.harmex.ru/auth";
    }

    window.open(targetUrl, "_blank");
  });

document
  .getElementById("registerBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    let targetUrl = "https://app.harmex.ru";

    const validHostnames = ["harmex.ru", "www.harmex.ru"];

    const isMainPage =
      validHostnames.includes(window.location.hostname) &&
      (window.location.pathname === "/" || window.location.pathname === "");

    if (referralCode) {
      localStorage.removeItem("referralCode");
      targetUrl = `https://app.harmex.ru/register?ref=${referralCode}`;
    } else {
      if (isMainPage) {
        targetUrl =
          "https://app.harmex.ru/register?ref=7917146c-ef4c-4b05-977c-1be2b73721b7";
      }
      targetUrl = "https://app.harmex.ru/register";
    }

    window.open(targetUrl, "_blank");
  });

document.querySelectorAll(".refBtn").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    console.log("click");
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    let targetUrl = "https://app.harmex.ru";

    const validHostnames = ["harmex.ru", "www.harmex.ru"];

    const isMainPage =
      validHostnames.includes(window.location.hostname) &&
      (window.location.pathname === "/" || window.location.pathname === "");

    if (referralCode) {
      localStorage.removeItem("referralCode");
      targetUrl = `https://app.harmex.ru/auth?ref=${referralCode}`;
    } else {
      if (isMainPage) {
        targetUrl =
          "https://app.harmex.ru/auth?ref=7917146c-ef4c-4b05-977c-1be2b73721b7";
      }
      targetUrl = "https://app.harmex.ru/auth";
    }

    window.open(targetUrl, "_blank");
  });
});
