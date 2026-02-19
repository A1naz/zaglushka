document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.dropdown');
      const arrow = toggle.querySelector('.arrow');
  
      parent.classList.toggle('open');
  
      // Меняем иконку
      arrow.src = parent.classList.contains('open') 
        ? './img/icons/arrowUp.svg'
        : './img/icons/arrowDown.svg';
    });
  });
  
const burgerToggle = document.querySelector('.burger-toggle');
const overlay = document.querySelector('.mobile-overlay');

if (burgerToggle && overlay) {
  burgerToggle.addEventListener('click', () => {
    overlay.classList.toggle('open');
  });

  // Закрытие по клику вне меню
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });

  const closeSelectors = ['.close-menu', '.close-menu1', '.close-menu2', '.close-menu3', '.close-menu4'];
  closeSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    });
  });
}
