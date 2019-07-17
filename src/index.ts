import  './styles/index.scss';
import Swiper from 'swiper'

new Swiper ('#creations-2019', {
  slidesPerView: 'auto',
  // centeredSlides: true,
  spaceBetween: 0,
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
})

new Swiper ('#creations-2018', {
  slidesPerView: 'auto',
  // centeredSlides: true,
  spaceBetween: 0,
  // freeMode: true,
  loop: true,
  centeredSlides: true,
  speed: 900,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})