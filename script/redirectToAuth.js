// Функция для получения первой UTM метки из localStorage
function getFirstUTMFromStorage() {
  try {
    const trackedUTMs = JSON.parse(localStorage.getItem('trackedUTMs') || '{}');
    const utmKeys = Object.keys(trackedUTMs);
    return utmKeys.length > 0 ? utmKeys[0] : null;
  } catch (error) {
    console.error('Error getting UTM from localStorage:', error);
    return null;
  }
}

// Функция для добавления UTM параметра к URL
function addUTMToUrl(url) {
  const utmCode = getFirstUTMFromStorage();
  if (utmCode) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm=${utmCode}`;
  }
  return url;
}

// Универсальная функция для построения URL с ref и utm
function buildTargetUrl(basePath, referralCode) {
  const validHostnames = ["harmex.ru", "www.harmex.ru"];
  const isMainPage =
    validHostnames.includes(window.location.hostname) &&
    (window.location.pathname === "/" || window.location.pathname === "");

  let targetUrl;

  if (referralCode) {
    localStorage.removeItem("referralCode");
    targetUrl = `https://app.harmex.ru/${basePath}?ref=${referralCode}`;
  } else {
    if (isMainPage) {
      targetUrl = `https://app.harmex.ru/${basePath}?ref=7917146c-ef4c-4b05-977c-1be2b73721b7`;
    } else {
      targetUrl = `https://app.harmex.ru/${basePath}`;
    }
  }

  // Добавляем UTM метку к URL
  return addUTMToUrl(targetUrl);
}

document.getElementById("loginBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  const targetUrl = buildTargetUrl('auth', referralCode);

  // Отправка цели в Яндекс.Метрику
  if (typeof ym !== 'undefined') {
    ym(99192893,'reachGoal','LoginMobile')
  }

  window.open(targetUrl, "_blank");
});
document
  .getElementById("loginBtnWeb")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','login_click')
    }

    window.open(targetUrl, "_blank");
  });

document
  .getElementById("registerBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('register', referralCode);

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','register')
    }

    window.open(targetUrl, "_blank");
  });

// Обработчик для кнопки "Как это работает"
const howItWorksBtn = document.getElementById("howItWorksBtn");
if (howItWorksBtn) {
  howItWorksBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','HowItWorks')
    }
  });
}

// Обработчик для кнопки WhatsApp в хедере
const whatsappHeaderBtn = document.getElementById("whatsappHeaderBtn");
if (whatsappHeaderBtn) {
  whatsappHeaderBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','WhatsApp')
    }
  });
}

// Обработчик для кнопки WhatsApp в футере
const whatsappFooterBtn = document.getElementById("whatsappFooterBtn");
if (whatsappFooterBtn) {
  whatsappFooterBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','WhatsApp')
    }
  });
}

// Обработчик для кнопки Telegram в хедере
const telegramHeaderBtn = document.getElementById("telegramHeaderBtn");
if (telegramHeaderBtn) {
  telegramHeaderBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','telegram')
    }
  });
}

// Обработчик для кнопки Telegram в футере (мобильное меню)
const telegramFooterBtn = document.getElementById("telegramFooterBtn");
if (telegramFooterBtn) {
  telegramFooterBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','telegram')
    }
  });
}

// Обработчик для кнопки Telegram-бот в футере
const tgBtn = document.getElementById("tg");
if (tgBtn) {
  tgBtn.addEventListener("click", function () {
    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','telegram')
    }
  });
}

// Обработчик для кнопки "Заказать сейчас" на главной странице
const orderNowBtn1 = document.getElementById("orderNowBtn1");
if (orderNowBtn1) {
  orderNowBtn1.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','OrderNow1')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Попробовать сейчас" (orderItNow2)
const orderItNow2Btn = document.getElementById("orderItNow2Btn");
if (orderItNow2Btn) {
  orderItNow2Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow2')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Заказать" (orderItNow3)
const orderItNow3Btn = document.getElementById("orderItNow3Btn");
if (orderItNow3Btn) {
  orderItNow3Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow3')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Заказать" (orderItNow4)
const orderItNow4Btn = document.getElementById("orderItNow4Btn");
if (orderItNow4Btn) {
  orderItNow4Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow4')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Заказать" (orderItNow5)
const orderItNow5Btn = document.getElementById("orderItNow5Btn");
if (orderItNow5Btn) {
  orderItNow5Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow5')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Заказать" (orderItNow6)
const orderItNow6Btn = document.getElementById("orderItNow6Btn");
if (orderItNow6Btn) {
  orderItNow6Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow6')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

// Обработчик для кнопки "Попробовать" (orderItNow7)
const orderItNow7Btn = document.getElementById("orderItNow7Btn");
if (orderItNow7Btn) {
  orderItNow7Btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','orderItNow7')
    }

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
}

document.querySelectorAll(".refBtn").forEach((toggle) => {
  // Пропускаем кнопки с отдельными обработчиками
  if (toggle.id === "orderNowBtn1" || toggle.id === "orderItNow2Btn" || toggle.id === "orderItNow3Btn" || toggle.id === "orderItNow4Btn" || toggle.id === "orderItNow5Btn" || toggle.id === "orderItNow6Btn" || toggle.id === "orderItNow7Btn") return;
  
  toggle.addEventListener("click", () => {
    console.log("click");
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    // Отправка цели в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99192893,'reachGoal','register')
    }

    window.open(targetUrl, "_blank");
  });
});
