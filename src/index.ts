import  './styles/index.scss'

const canvas = document.querySelector('header')
const wrapper = document.querySelector('.swiper-wrapper')
const children = wrapper.children
const activeClass = '--active'
const activeModal = {
  isActive: false,
  id: null,
  element: function() {
    return document.getElementById(this.id)
  }
}
const modals = document.querySelectorAll('[data-modal]')
const modalTogglers = document.querySelectorAll('[data-modal-target]')
const modalCloseTogglers = document.querySelectorAll('[data-modal-close]')

let width = updateWidth()
let activePosition = Math.floor(Math.random() * children.length)

updateClasses(activePosition)

canvas.addEventListener('mousemove', e => {
  const nextPosition = position(e)
  updateActive(nextPosition)
})

window.addEventListener('resize', () => {
  updateWidth()
})

modalTogglers.forEach(toggler => {
  toggler.addEventListener('click', e => {
    showModal(e.target.dataset.modalTarget)
  })
})

modalCloseTogglers.forEach(toggler => {
  toggler.addEventListener('click', e => {
    closeModal()
  })
})

function position(e): number {
  return Math.floor(e.pageX / width * children.length)
}

function updateActive(nextPosition): void {
  if (nextPosition === activePosition) return

  updateClasses(nextPosition)

  activePosition = nextPosition
}

function updateClasses(position): void {
  children[activePosition].className = ''
  children[position].className = activeClass
}

function updateWidth(): number {
  return width = canvas.offsetWidth
}

function showModal(id: string): void {
  activeModal.id = id
  activeModal.isActive = true

  activeModal.element().className = activeClass
  bodyFixed()
}

function closeModal(): void {
  activeModal.element().className = ''
  activeModal.id = null
  activeModal.isActive = false
  bodyScrollable()
}

function bodyScrollable(): void {
  document.body.className = ''
}

function bodyFixed(): void {
  document.body.className = '--no-scroll'
}