document.addEventListener("DOMContentLoaded", (event) => {
   
  // Функция для получения параметров из URL
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const url = window.location.href;
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Проверка, что текущий домен - app.marketmonstr.pro

  // Извлечение параметра 'ref'

  const ref = getParameterByName("ref");

  if (ref) {
    // Сохранение значения параметра 'ref' в localStorage
    localStorage.setItem("referralCode", ref);

  }
});
