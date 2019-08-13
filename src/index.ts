import  './styles/index.scss'

const canvas = document.querySelector('header')
const wrapper = document.querySelector('.swiper-wrapper')
const children = wrapper.children
const activeClass = '--active'

let width = updateWidth()
let activePosition = Math.floor(Math.random() * children.length)

updateClasses(activePosition)

canvas.addEventListener('mousemove', (e) => {
  const nextPosition = position(e)
  updateActive(nextPosition)
})

window.addEventListener('resize', () => {
  updateWidth()
})

function position(e) {
  return Math.floor(e.pageX / width * children.length)
}

function updateActive(nextPosition) {
  if (nextPosition === activePosition) return

  updateClasses(nextPosition)

  activePosition = nextPosition
}

function updateClasses(position) {
  children[activePosition].className = ''
  children[position].className = activeClass
}

function updateWidth() {
  return width = canvas.offsetWidth
}
