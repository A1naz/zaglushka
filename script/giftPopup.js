(function () {
  'use strict';

  var SHOW_DELAY_MS = 1000;
  var STORAGE_KEY = 'giftPopupDismissed';
  var POPUP_COMPONENT = '/components/giftPopup.html';

  function init() {
    // TODO: restore session check when popup behaviour is finalised
    // if (sessionStorage.getItem(STORAGE_KEY)) return;

    fetch(POPUP_COMPONENT)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper.firstElementChild);

        bindEvents();

        setTimeout(function () {
          showPopup();
        }, SHOW_DELAY_MS);
      })
      .catch(function (err) {
        console.warn('[giftPopup] failed to load component:', err);
      });
  }

  function showPopup() {
    var overlay = document.getElementById('giftPopupOverlay');
    if (!overlay) return;
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function hidePopup() {
    var overlay = document.getElementById('giftPopupOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function bindEvents() {
    var overlay = document.getElementById('giftPopupOverlay');
    var closeBtn = document.getElementById('giftPopupClose');
    var form = document.getElementById('giftPopupForm');
    var registerLink = overlay ? overlay.querySelector('.gift-popup__btn--secondary') : null;

    if (closeBtn) {
      closeBtn.addEventListener('click', hidePopup);
    }

    // Click outside modal closes it
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) hidePopup();
      });
    }

    // ESC key closes popup
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hidePopup();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('giftPopupName').value.trim();
        var email = document.getElementById('giftPopupEmail').value.trim();
        var phone = document.getElementById('giftPopupPhone').value.trim();

        if (!name && !email && !phone) {
          highlightEmpty();
          return;
        }

        if (typeof ym !== 'undefined') {
          ym(99192893, 'reachGoal', 'submitFromPopup');
        }
        hidePopup();
        window.location.href = '/thanks.html';
      });
    }

    // "Зарегистрироваться" — первый шаг составного события
    if (registerLink) {
      registerLink.addEventListener('click', function () {
        if (typeof ym !== 'undefined') {
          ym(99192893, 'reachGoal', 'registerFromPopup');
        }
        hidePopup();
      });
    }
  }

  function highlightEmpty() {
    var inputs = document.querySelectorAll('.gift-popup__input');
    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.style.background = '#fff5f5';
        input.style.borderColor = '#f87171';
        input.addEventListener('input', function clearHighlight() {
          input.style.background = '';
          input.style.borderColor = '';
          input.removeEventListener('input', clearHighlight);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
