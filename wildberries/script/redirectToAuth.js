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
  let targetUrl;

  if (referralCode) {
    localStorage.removeItem("referralCode");
    targetUrl = `https://app.harmex.ru/${basePath}?ref=${referralCode}`;
  } else {
    targetUrl = `https://app.harmex.ru/${basePath}`;
  }

  // Добавляем UTM метку к URL
  return addUTMToUrl(targetUrl);
}

document.getElementById("loginBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  const targetUrl = buildTargetUrl('auth', referralCode);

  window.open(targetUrl, '_blank');

});
document.getElementById("loginBtnWeb").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  const targetUrl = buildTargetUrl('auth', referralCode);

  window.open(targetUrl, '_blank');

});

document.getElementById("registerBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Отключаем стандартное поведение ссылки

  const referralCode = localStorage.getItem("referralCode");
  const targetUrl = buildTargetUrl('register', referralCode);

  window.open(targetUrl, '_blank');

});

document.querySelectorAll(".refBtn").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    console.log("click");
    event.preventDefault(); // Отключаем стандартное поведение ссылки

    const referralCode = localStorage.getItem("referralCode");
    const targetUrl = buildTargetUrl('auth', referralCode);

    window.open(targetUrl, "_blank");
  });
});