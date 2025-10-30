import './styles/index.css'
import Modals from './scripts/Modals'
import Swiper from './scripts/Swiper'
import Parallax from './scripts/Parallax'
import Preload from './scripts/Preload'

const swiper = new Swiper({ threshold: 120 })
const modals = new Modals()
const parallax = new Parallax({ siblingSelector: 'footer', lastElementKey: 67 })
const preload = new Preload({ animationDuration: 4000 })

document.addEventListener('keydown', e => {
  const isEscape = 
    e.keyCode === 27 
    || e.key === 'Escape' 
    || e.key === 'Esc'

  if (isEscape) {
    modals.closeAll()
  }
})

const imprintEl = document.querySelector('.imprint') as HTMLElement | null

if (imprintEl) {
  document.addEventListener('DOMContentLoaded', () => {
    imprintEl.classList.add('--collapsed')
  })

  imprintEl.addEventListener('click', (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement

    const isCollapsed = target.classList.contains('--collapsed')

    if (isCollapsed) {
      target.classList.remove('--collapsed')
      target.classList.add('--expanded')
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      target.classList.add('--collapsed')
      target.classList.remove('--expanded')
    }
  })

  imprintEl.addEventListener('mouseover', (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement
    target.classList.add('--hover')
  })

  imprintEl.addEventListener('mouseout', (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement
    target.classList.remove('--hover')
  })
}
