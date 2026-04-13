(function () {
  'use strict';

  var SHOW_DELAY_MS = 15000;
  var STORAGE_KEY = 'giftPopupDismissed';
  var POPUP_COMPONENT = '/components/giftPopup.html';

  function init() {
    // TODO: restore session check when popup behaviour is finalised
    if (sessionStorage.getItem(STORAGE_KEY)) return;

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

  function sendLead(phone) {
    return fetch('https://blog.harmex.ru/api/bitrix/addLead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      mode: 'no-cors',
      body: JSON.stringify({
        fields: {
          TITLE: 'Заявка с попапа harmex.ru ' + phone,
          NAME: 'Имя',
          EMAIL: [{ VALUE: 'test@mail.ru', VALUE_TYPE: 'WORK' }],
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
        },
      }),
    });
  }

  function bindPhoneFormatting(input) {
    input.addEventListener('input', function () {
      var raw = input.value.replace(/\D/g, '');
      if (!raw.startsWith('7')) raw = '7' + raw;
      var fmt = '+7';
      if (raw.length > 1) fmt += ' (' + raw.substring(1, 4);
      if (raw.length >= 5) fmt += ') ' + raw.substring(4, 7);
      if (raw.length >= 8) fmt += '-' + raw.substring(7, 9);
      if (raw.length >= 10) fmt += '-' + raw.substring(9, 11);
      input.value = fmt.substring(0, 18);
    });
    input.addEventListener('focus', function () {
      if (!input.value) input.value = '+7 ';
    });
    input.addEventListener('blur', function () {
      if (input.value === '+7 ') input.value = '';
    });
  }

  function bindEvents() {
    var overlay = document.getElementById('giftPopupOverlay');
    var closeBtn = document.getElementById('giftPopupClose');
    var form = document.getElementById('giftPopupForm');
    var phoneInput = document.getElementById('giftPopupPhone');
    var registerLink = overlay ? overlay.querySelector('.gift-popup__btn--secondary') : null;

    if (phoneInput) bindPhoneFormatting(phoneInput);

    if (closeBtn) {
      closeBtn.addEventListener('click', hidePopup);
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) hidePopup();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hidePopup();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var phone = phoneInput ? phoneInput.value.trim() : '';
        if (!phone || phone.length < 10) {
          highlightInput(phoneInput);
          return;
        }

        if (typeof ym !== 'undefined') {
          ym(99192893, 'reachGoal', 'submitFromPopup');
        }

        sendLead(phone).catch(function (err) {
          console.warn('[giftPopup] sendLead error:', err);
        });

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

  function highlightInput(input) {
    if (!input) return;
    input.style.background = '#fff5f5';
    input.style.borderColor = '#f87171';
    input.addEventListener('input', function clear() {
      input.style.background = '';
      input.style.borderColor = '';
      input.removeEventListener('input', clear);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
