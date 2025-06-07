console.log('swiper');
const mySwiper = document.querySelector('.gallery__top');
const pagination = document.querySelector('.pagination');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const paginationCurrent = document.querySelector('.pagination-current');
const paginationTotal = document.querySelector('.pagination-total');
const paginationBullets = document.querySelector('.pagination-bullets');

const swiper = new Swiper(mySwiper, {
  spaceBetween: 30,
  speed: 600,
  navigation: {
    nextEl: btnNext,
    prevEl: btnPrev,
  },
  on: {
    init: function () {
      updateCustomPagination(this);
    },
    slideChange: function () {
      updateCustomPagination(this);
    },
    resize: function () {
      updateCustomPagination(this);
    },
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },

    576: {
      slidesPerView: 2,
    },
  },
});

function updateCustomPagination(swiper) {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Показываем bullets
    paginationBullets.style.display = 'flex';

    // Если количество bullets не совпадает с количеством слайдов — пересоздаём
    if (paginationBullets.children.length !== swiper.snapGrid.length) {
      paginationBullets.innerHTML = '';
      for (let i = 0; i < swiper.snapGrid.length; i++) {
        const bullet = document.createElement('span');
        bullet.className = 'custom-bullet';
        bullet.addEventListener('click', () => {
          swiper.slideTo(i);
        });
        paginationBullets.appendChild(bullet);
      }
    }

    // Снимаем active со всех bullets
    Array.from(paginationBullets.children).forEach((bullet, idx) => {
      // Если его индекс (idx) совпадает с текущим активным слайдом (swiper.realIndex), то класс 'active' добавляется.
      // Для всех остальных — класс 'active' убирается.
      bullet.classList.toggle('active', idx === swiper.realIndex);
    });
  } else {
    // Показываем fraction, скрываем bullets
    paginationCurrent.style.display = '';
    paginationTotal.style.display = '';
    paginationBullets.style.display = 'none';

    paginationCurrent.textContent = swiper.realIndex + 1;
    paginationTotal.textContent = swiper.snapGrid.length;
  }
}
