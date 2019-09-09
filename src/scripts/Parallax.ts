export default class Parallax {

  private options: Options
  private elements: ParallaxObject[] = []

  constructor(options?: any) {
    this.resetOptions(options)
    this.assignElements()

    console.log(this.elements)
  }

  private assignElements(): void {
    const { selector } = this.options

    document.querySelectorAll(selector).forEach(element => {
      const { dataset, parentNode } = element
      const { parallax } = dataset

      console.log(element)

      this.elements.push({
        element, 
        parentNode,
        parallax: Number.parseFloat(parallax)
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
  element: Node
  parentNode: Node
  parallax: number
}