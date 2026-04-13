(function () {
  'use strict';

  // Set to true to re-enable the widget
  var ENABLED = false;
  if (!ENABLED) return;

  // Show widgets when user scrolled ≥ 30% of the page
  var SCROLL_THRESHOLD = 0.30;

  function createWidgets() {
    // Wrapper group
    var group = document.createElement('div');
    group.className = 'widget-group';

    // — Scroll-to-top button —
    var scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('aria-label', 'Наверх');
    scrollBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<polyline points="18 15 12 9 6 15"/>' +
      '</svg>';
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // — Callback button —
    var callBtn = document.createElement('button');
    callBtn.id = 'callbackWidget';
    callBtn.className = 'callback-widget';
    callBtn.setAttribute('aria-label', 'Заказать обратный звонок');
    callBtn.innerHTML =
      '<span class="callback-widget__icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
        '</svg>' +
      '</span>' +
      'Заказать обратный звонок';
    callBtn.addEventListener('click', openModal);

    group.appendChild(scrollBtn);
    group.appendChild(callBtn);
    document.body.appendChild(group);

    return { group: group, scrollBtn: scrollBtn, callBtn: callBtn };
  }

  function openModal() {
    var modal = document.getElementById('callback-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.classList.add('no-scroll');
  }

  function checkScroll(els) {
    var scrolled = window.scrollY || window.pageYOffset;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;

    var visible = (scrolled / total) >= SCROLL_THRESHOLD;

    if (visible) {
      els.scrollBtn.classList.add('is-visible');
      els.callBtn.classList.add('is-visible');
    } else {
      els.scrollBtn.classList.remove('is-visible');
      els.callBtn.classList.remove('is-visible');
    }
  }

  function init() {
    var els = createWidgets();

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          checkScroll(els);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    checkScroll(els);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
