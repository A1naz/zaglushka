(function () {
  'use strict';

  // Показывать виджет когда пользователь прокрутил ≥ 80% страницы
  var SCROLL_THRESHOLD = 0.80;

  function createWidget() {
    var btn = document.createElement('button');
    btn.id = 'callbackWidget';
    btn.className = 'callback-widget';
    btn.setAttribute('aria-label', 'Заказать обратный звонок');
    btn.innerHTML =
      '<span class="callback-widget__icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
        '</svg>' +
      '</span>' +
      'Заказать обратный звонок';

    btn.addEventListener('click', openModal);
    document.body.appendChild(btn);
    return btn;
  }

  function openModal() {
    var modal = document.getElementById('callback-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.classList.add('no-scroll');
  }

  function checkScroll(widget) {
    var scrolled = window.scrollY || window.pageYOffset;
    var total = document.documentElement.scrollHeight - window.innerHeight;

    if (total <= 0) return;

    var ratio = scrolled / total;
    if (ratio >= SCROLL_THRESHOLD) {
      widget.classList.add('is-visible');
    } else {
      widget.classList.remove('is-visible');
    }
  }

  function init() {
    var widget = createWidget();

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          checkScroll(widget);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Проверяем сразу на случай если страница уже прокручена
    checkScroll(widget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
