export default class Swiper {

  private canvas
  private wrapper
  private children
  private activeClass
  private width
  private activePosition

  constructor() {
    console.log('test')
    this.canvas = document.querySelector('header')
    this.wrapper = document.querySelector('.swiper-wrapper')
    this.children = this.wrapper.children
    this.activeClass = '--active'
    this.width = this.updateWidth()
    this.activePosition = Math.floor(Math.random() * this.children.length)
  
    this.updateClasses(this.activePosition)
  
    this.canvas.addEventListener('mousemove', e => {
      const nextPosition = this.position(e)
      this.updateActive(nextPosition)
    })
  }

  private position(e): number {
    return Math.floor(e.pageX / this.width * this.children.length)
  }

  private updateActive(nextPosition): void {
    if (nextPosition === this.activePosition) return

    this.updateClasses(nextPosition)

    this.activePosition = nextPosition
  }

  private updateClasses(position): void {
    this.children[this.activePosition].classList.remove(this.activeClass)
    this.children[position].classList.add(this.activeClass)
  }

  private updateWidth(): number {
    return this.width = this.canvas.offsetWidth
  }
}