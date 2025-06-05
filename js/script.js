const mySwiper = document.querySelector('.gallery__top');
const pagination = document.querySelector('.pagination');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const paginationCurrent = document.querySelector('.pagination-current');
const paginationTotal = document.querySelector('.pagination-total');
console.log('swiper');

const swiper = new Swiper(mySwiper, {
  slidesPerView: 4,
  spaceBetween: 20,

  navigation: {
    nextEl: btnNext,
    prevEl: btnPrev,
  },
  on: {
    init: function () {
      updatePagination(this);
    },
    slideChange: function () {
      updatePagination(this);
    },
  },
});

function updatePagination(swiper) {
  // Текущее положение (нумерация с 1)
  paginationCurrent.textContent = swiper.realIndex + 1;
  // Всего страниц (слайдов)
  paginationTotal.textContent = swiper.snapGrid.length;

  // Отключаем/включаем кнопки
  if (swiper.isBeginning) {
    btnPrev.setAttribute('disabled', 'disabled');
  } else {
    btnPrev.removeAttribute('disabled');
  }
  if (swiper.isEnd) {
    btnNext.setAttribute('disabled', 'disabled');
  } else {
    btnNext.removeAttribute('disabled');
  }
}
