// UTM Tracking Script
// Отслеживание переходов по UTM-меткам

(function() {
  'use strict';

  // Функция для получения UTM параметра из URL
  function getUTMCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm');
  }

  // Функция для проверки, был ли уже отправлен запрос по этой метке
  function isUTMAlreadyTracked(utmCode) {
    const trackedUTMs = JSON.parse(localStorage.getItem('trackedUTMs') || '{}');
    return trackedUTMs.hasOwnProperty(utmCode);
  }

  // Функция для сохранения информации о метке в localStorage
  function saveUTMToStorage(utmCode) {
    const trackedUTMs = JSON.parse(localStorage.getItem('trackedUTMs') || '{}');
    trackedUTMs[utmCode] = {
      timestamp: new Date().toISOString(),
      tracked: true
    };
    localStorage.setItem('trackedUTMs', JSON.stringify(trackedUTMs));
  }

  // Функция для отправки запроса на сервер
  async function sendUTMTransition(utmCode) {
    try {
      const response = await fetch('https://app.harmex.ru/api/utm/transition?utmCode=' + utmCode, {
        method: 'GET',
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
        },
    
      });

      if (!response.ok) {
        console.warn('UTM tracking request failed:', response.status);
      }

      return response.ok;
    } catch (error) {
      console.error('Error sending UTM tracking request:', error);
      return false;
    }
  }

  // Основная функция отслеживания
  async function trackUTM() {
    const utmCode = getUTMCode();
    
    // Если UTM параметр не найден, выходим
    if (!utmCode) {
      return;
    }

    // Проверяем, был ли уже отправлен запрос по этой метке
    if (isUTMAlreadyTracked(utmCode)) {
      console.log('UTM already tracked:', utmCode);
      return;
    }

    console.log('Tracking new UTM:', utmCode);
    
    // Сохраняем в localStorage ДО отправки запроса
    // чтобы избежать повторных запросов даже если запрос не удался
    saveUTMToStorage(utmCode);
    
    // Отправляем запрос на сервер
    await sendUTMTransition(utmCode);
    
    console.log('UTM successfully tracked and saved');
  }

  // Запускаем отслеживание при загрузке страницы
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackUTM);
  } else {
    trackUTM();
  }

})();

