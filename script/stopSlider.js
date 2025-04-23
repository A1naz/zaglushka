const track = document.querySelector('.slider__track');

console.log('track' + track)

if (track) {
    let isDragging = false;
    let startX;
    let scrollLeft;
  
    const pause = () => {
      track.style.animationPlayState = 'paused';
    };
  
    const play = () => {
      track.style.animationPlayState = 'running';
    };
  
    // Мышь
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      pause();
    });
  
    track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        play();
      }
    });
  
    track.addEventListener('mouseup', () => {
      isDragging = false;
      play();
    });
  
    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // скорость прокрутки
      track.scrollLeft = scrollLeft - walk;
    });
  
    // Тач
    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      pause();
    });
  
    track.addEventListener('touchend', () => {
      isDragging = false;
      play();
    });
  
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });
  }
