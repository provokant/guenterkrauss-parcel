export default class Parallax {

  private options: Options
  private elements: ParallaxObject[] = []

  constructor(options?: any) {
    this.resetOptions(options)
    this.assignElements()
    this.attachListeners()
  }

  private attachListeners(): void {
    window.addEventListener('DOMContentLoaded', () => this.scrollEvent(), false)
  }

  private scrollEvent(): void {
    this.elements.forEach(({ element, parentNode, parallax }) => {
      // console.log(parentNode)
      const { top, bottom } = parentNode.getBoundingClientRect()
      const { innerHeight } = window
    
      if (top <= innerHeight && bottom >= 0) {
        const threshold = Math.floor((innerHeight - top) / innerHeight * 1000) / 1000
        const factor = innerHeight * parallax
        const y = factor - (1 + threshold * factor)

        element.style.transform = `translate3d(0, ${y}px, 0)`
      }
    })

    // console.log('s')

    requestAnimationFrame(() => this.scrollEvent())
  }

  private assignElements(): void {
    const { selector } = this.options

    document.querySelectorAll(selector).forEach(element => {
      const { dataset, parentNode } = element
      const { parallax } = dataset

      this.elements.push({
        element, 
        parentNode,
        parallax
      })
    }, this)
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        selector: '[data-parallax]'
      },
      ...options
    }
  }
}

interface Options {
  selector: string
}

interface ParallaxObject {
  element: HTMLElement
  parentNode: HTMLElement
  parallax: number
}