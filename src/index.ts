import  './styles/index.scss'

const canvas = document.querySelector('header')
const wrapper = document.querySelector('.swiper-wrapper')
const width = canvas.offsetWidth
const children = wrapper.children
const activeClass = '--active'

let activePosition = 0

canvas.addEventListener('mousemove', (e) => {
  const currentPosition = position(e)
  updateActive(currentPosition)
})

function position(e) {
  return Math.floor(e.pageX / width * children.length)
}

function updateActive(currentPosition) {
  if (currentPosition === activePosition) return

  children[activePosition].className = ''
  children[currentPosition].className = activeClass

  activePosition = currentPosition
}