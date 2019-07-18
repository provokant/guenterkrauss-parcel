import  './styles/index.scss';
import Swiper from 'swiper'

const defaultSwiper = {
  slidesPerView: 3,
  // centeredSlides: true,
  spaceBetween: 30,
  // freeMode: true,
  loop: true,
  centeredSlides: true,
  speed: 900,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

new Swiper ('#first-impression', {
  slidesPerView: 1,
  // centeredSlides: true,
  spaceBetween: 0,
  // freeMode: true,
  loop: true,
  speed: 1200,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
})

new Swiper ('#creations-2019', {
  ...defaultSwiper
})

new Swiper ('#creations-2018', {
  ...defaultSwiper,

  autoplay: {
    delay: 3500,
    disableOnInteraction: true,
  },
})