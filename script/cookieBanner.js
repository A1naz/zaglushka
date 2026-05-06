(function () {
  'use strict';

  var STORAGE_KEY = 'cookieNoticeDismissed';

  if (localStorage.getItem(STORAGE_KEY)) return;

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner__text">' +
        'Наш сайт использует только технически необходимые файлы cookie, которые обеспечивают его корректную работу и безопасность. ' +
        'Эти файлы не требуют вашего согласия. Подробнее в&nbsp;' +
        '<a href="./docs/politikaPersonalnyhDannyh.pdf" target="_blank" class="cookie-banner__link">Политике обработки персональных данных</a>.' +
      '</p>' +
      '<button id="cookieBannerBtn" class="cookie-banner__btn">Понятно</button>';

    document.body.appendChild(banner);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('is-visible');
      });
    });

    document.getElementById('cookieBannerBtn').addEventListener('click', function () {
      banner.classList.remove('is-visible');
      localStorage.setItem(STORAGE_KEY, '1');
      setTimeout(function () { banner.remove(); }, 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBanner);
  } else {
    createBanner();
  }
})();
