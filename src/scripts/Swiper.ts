export default class Swiper {

  private width
  private currentPosition
  private options: Options

  constructor(options?: any) {
    this.resetOptions(options)
    this.width = this.updateWidth()
    this.randomPosition()
    this.updateClasses(this.currentPosition)
    this.attachListener()
  }

  private randomPosition(): void {
    const { children } = this.wrapper

    this.currentPosition = Math.floor(Math.random() * children.length)
  }

  private attachListener(): void {
    this.canvas.addEventListener('mousemove', e => {
      const nextPosition = this.position(e)
      this.updateActive(nextPosition)
    })
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        canvasSelector: 'header',
        wrapperSelector: '.swiper-wrapper',
        childClass: '--active'
      },
      ...options
    }
  }

  private get wrapper(): HTMLElement {
    return document.querySelector(this.options.wrapperSelector)
  }

  private get canvas(): HTMLElement {
    return document.querySelector(this.options.canvasSelector)
  }

  private position(e): number {
    const { children } = this.wrapper

    return Math.floor(e.pageX / this.width * children.length)
  }

  private updateActive(nextPosition): void {
    if (nextPosition === this.currentPosition) return

    this.updateClasses(nextPosition)

    this.currentPosition = nextPosition
  }

  private updateClasses(position): void {
    const { children } = this.wrapper
    const { childClass } = this.options

    children[this.currentPosition].classList.remove(childClass)
    children[position].classList.add(childClass)
  }

  private updateWidth(): number {
    return this.width = this.canvas.offsetWidth
  }
}

interface Options {
  canvasSelector: string 
  wrapperSelector: string
  childClass: string
}