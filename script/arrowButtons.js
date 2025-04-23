const sliderTrack =  document.querySelector('.slider__track');
const reverseBtn = document.getElementById('reverseBtn');
const rightBtn = document.getElementById('rightBtn');
const track = document.querySelector('.slider__track');

console.log(rightBtn)
let scrollInterval = null;

function startScroll(direction = 1, speed = 1) {
  stopScroll(); // Сброс текущего скролла
  scrollInterval = setInterval(() => {
    sliderTrack.scrollLeft += direction * speed;
  }, 16); // ~60 FPS
}

function stopScroll() {
  clearInterval(scrollInterval);
}

// 🚀 Старт автоскролла вперёд при загрузке
startScroll(1, 1);

// ⬅️ При зажатии — скролл назад в 3 раза быстрее
reverseBtn.addEventListener('mousedown', () => {
    console.log('mousedown');
  startScroll(-1, 5);
});

rightBtn.addEventListener('mousedown', () => {
  startScroll(1, 3);
})

// ➡️ Отпустил кнопку — обратно вперёд
const backToForward = () => startScroll(1, 1);
reverseBtn.addEventListener('mouseup', backToForward);
reverseBtn.addEventListener('mouseleave', backToForward);
document.addEventListener('mouseup', backToForward); // Если курсор ушёл

track.addEventListener('mousedown', () => {
    stopScroll();
  });

  track.addEventListener('mouseup', () => {
    startScroll(1, 1);
  });

  track.addEventListener('mouseleave', () => {
    // Только если кнопка мыши отпущена (иначе можно словить баг)
    if (!mouseIsDown) startScroll(1, 1);
  });

  let mouseIsDown = false;
track.addEventListener('mousedown', () => mouseIsDown = true);
document.addEventListener('mouseup', () => mouseIsDown = false);