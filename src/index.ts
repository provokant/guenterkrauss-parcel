import  './styles/index.css'
import Modals from './scripts/Modals'
import Swiper from './scripts/Swiper'
import Parallax from './scripts/Parallax'
import Preload from './scripts/Preload'

const swiper = new Swiper({ threshold: 120 })
const modals = new Modals()
const parallax = new Parallax({ siblingSelector: 'footer', lastElementKey: 65 })
const preload = new Preload({ animationDuration: 4000 })

document.addEventListener('keydown', e => {
  const isEscape = 
    e.keyCode === 27 
    || e.key === 'Escape' 
    || e.key === 'Esc'
    ? true
    : false

  if (isEscape) {
    modals.closeAll()
  }
})

const imprintEl = document.querySelector('.imprint')

document.addEventListener('DOMContentLoaded', () => {
  imprintEl.classList.add('--collapsed')
})

imprintEl.addEventListener('click', ({ target }) => {
  target.classList.remove('--collapsed')
})

imprintEl.addEventListener('click', ({ target }) => {
  target.classList.remove('--collapsed')
})

imprintEl.addEventListener('mouseover', ({ target }) => {
  target.classList.add('--hover')
})

imprintEl.addEventListener('mouseout', ({ target }) => {
  target.classList.remove('--hover')
})