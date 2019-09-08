export default class Swiper {

  private width: number
  private currentPosition: Point
  private currentChild: number
  private options: Options

  constructor(options?: any) {
    this.resetOptions(options)
    this.width = this.updateWidth()
    this.randomPosition()
    this.updateChildren()
    this.attachListener()
  }

  private randomPosition(): void {
    const { children } = this.wrapper

    this.currentChild = Math.floor(Math.random() * children.length)
  }

  private attachListener(): void {
    this.canvas.addEventListener('mousemove', e => {

      const { threshold } = this.options
      const { clientX, clientY } = e

      if(this.calculateDelta(clientX, clientY) > threshold) {
        this.setCurrentPosition(clientX, clientY)
        this.updateChildren()
      }

    })
    this.canvas.addEventListener('touchmove', e => {
      const { threshold } = this.options
      const { changedTouches } = e
      const { clientX } = changedTouches[0]

      if(this.calculateDelta(clientX) > threshold) {
        this.setCurrentPosition(clientX)
        this.updateChildren()
      }
    })
  }

  private nextChild(): number {
    const { children } = this.wrapper

    return (this.currentChild + 1) % children.length
  }

  private setCurrentPosition(x: number, y: number = 0) {
    this.currentPosition = { x, y }
  }

  private calculateDelta(clientX: number, clientY: number = 0): number {
    if (!this.currentPosition) {
      this.currentPosition = {
        x: clientX,
        y: clientY
      }
    }
    
    const { x , y } = this.currentPosition

    return Math.hypot((clientX - x), (clientY - y))
  }

  private updateChildren(): void {
    const { children } = this.wrapper
    const { childClass } = this.options
    const nextChild = this.nextChild()

    children[this.currentChild].classList.remove(childClass)
    children[nextChild].classList.add(childClass)

    this.currentChild = nextChild
  }

  private updateWidth(): number {
    const { offsetWidth } = this.canvas

    return this.width = offsetWidth
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        canvasSelector: 'header',
        wrapperSelector: '.swiper-wrapper',
        childClass: '--active',
        threshold: 100
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

}

interface Options {
  canvasSelector: string 
  wrapperSelector: string
  childClass: string
  threshold: number
}

interface Point {
  x: number
  y: number
}