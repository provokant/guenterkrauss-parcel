export default class Parallax {

  private options: Options
  private elements: ParallaxObject[] = []
  private siblingNode: HTMLElement

  constructor(options?: any) {
    this.resetOptions(options)
    this.assignElements()
    this.attachListeners()
  }

  private attachListeners(): void {
    window.addEventListener('DOMContentLoaded', () => this.scrollEvent(), false)
  }

  private scrollEvent(): void {

    this.elements.forEach(({ element, parentNode, parallax }, key) => {
      const { top, bottom } = parentNode.getBoundingClientRect()
      const { lastElementKey } = this.options
      const { innerHeight } = window
      const threshold = Math.floor((innerHeight - top) / innerHeight * 1000) / 1000
      const factor = innerHeight * parallax
      const y = factor - (1 + threshold * factor)
    
      if (top <= innerHeight && bottom >= 0) {
        element.style.transform = `translate3d(0, ${y}px, 0)`
      }

      if(key === lastElementKey) {
        // this.siblingNode.style.marginTop = `${y}px`
        // this.siblingNode.style.paddingBottom = `${-y}px`
      }
    })

    requestAnimationFrame(() => this.scrollEvent())
  }

  private assignElements(): void {
    const { selector } = this.options
    const { siblingSelector } = this.options

    if (siblingSelector && document.querySelector(siblingSelector)) {
      this.siblingNode = document.querySelector(siblingSelector)
    }

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
  lastElementKey: number
  siblingSelector: string
}

interface ParallaxObject {
  element: HTMLElement
  lastElement: HTMLElement
  parentNode: HTMLElement
  parallax: number
}