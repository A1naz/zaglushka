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
  
  burgerToggle.addEventListener('click', () => {
    overlay.classList.toggle('open');
  });
  
  // Закрытие по клику вне меню
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
  

document.querySelector('.close-menu').addEventListener('click', () => {
    overlay.classList.remove('open');
  });
document.querySelector('.close-menu1').addEventListener('click', () => {
    overlay.classList.remove('open');
  });
document.querySelector('.close-menu2').addEventListener('click', () => {
    overlay.classList.remove('open');
  });
document.querySelector('.close-menu3').addEventListener('click', () => {
    overlay.classList.remove('open');
  });
document.querySelector('.close-menu4').addEventListener('click', () => {
    overlay.classList.remove('open');
  });

const closeButtons = document.querySelectorAll('.close-menu');
if (closeButtons.length > 0) {
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.remove('open');
    });
  });
}