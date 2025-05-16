const sliderTrack = document.querySelector('.slider__track');
const reverseBtn = document.getElementById('reverseBtn');
const rightBtn = document.getElementById('rightBtn');
const track = sliderTrack;

let scrollInterval = null;
let scrollDirection = 1; // 1 - вправо, -1 - влево
let scrollSpeed = 1;

function startScroll(direction = 1, speed = 1) {
  stopScroll();
  scrollDirection = direction;
  scrollSpeed = speed;

  scrollInterval = setInterval(() => {
    // Проверка на край
    const atStart = sliderTrack.scrollLeft <= 0;
    const atEnd =
      sliderTrack.scrollLeft + sliderTrack.clientWidth >=
      sliderTrack.scrollWidth - 1; // -1 на случай погрешности

    if (atEnd && scrollDirection === 1) {
      scrollDirection = -1;
    } else if (atStart && scrollDirection === -1) {
      scrollDirection = 1;
    }

    sliderTrack.scrollLeft += scrollDirection * scrollSpeed ;
  }, 40);
}

function stopScroll() {
  clearInterval(scrollInterval);
}

// 🚀 Старт автоскролла при загрузке
startScroll(1, 1);

// ⬅️ Скролл назад
reverseBtn.addEventListener('mousedown', () => {
  startScroll(-1, 10);
});
rightBtn.addEventListener('mousedown', () => {
  startScroll(1, 10);
});

// ➡️ Возврат к автоскроллу
const backToForward = () => startScroll(scrollDirection, 1);
reverseBtn.addEventListener('mouseup', backToForward);
reverseBtn.addEventListener('mouseleave', backToForward);
document.addEventListener('mouseup', backToForward);

let mouseIsDown = false;

track.addEventListener('mousedown', () => {
  stopScroll();
  mouseIsDown = true;
});

track.addEventListener('mouseup', () => {
  mouseIsDown = false;
  startScroll(scrollDirection, 1);
});

track.addEventListener('mouseleave', () => {
  if (!mouseIsDown) startScroll(scrollDirection, 1);
});

document.addEventListener('mouseup', () => (mouseIsDown = false));
