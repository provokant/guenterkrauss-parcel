export default class Preload {

  private options: Options
  private allImages: NodeListOf<Element>

  constructor(options?: any) {
    this.resetOptions(options)
    this.queryAllImages()
    this.preloadImages()
  }

  private queryAllImages(): void {
    const { imageSelector } = this.options

    this.allImages = document.querySelectorAll(imageSelector)
  }

  private preloadImages() {
    if (!this.allImages) return;

    window.setTimeout(() => {
      this.resetBody()
      this.hideLoading()
    }, 1600)
  }

  private resetBody(): void {
    const { bodyClass } = this.options

    document.body.classList.remove(bodyClass)
  }

  private hideLoading(): void {
    const { loading, loadingClass } = this.options

    // document.querySelector(loading).remove()
    document.querySelector(loading).classList.remove(loadingClass)
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        loading: '.loading-screen',
        loadingClass: '--show',
        bodyClass: '--loading',
        imageSelector: '[data-preload]'
      },
      ...options
    }
  }
}

interface Options {
  loading: string
  loadingClass: string
  bodyClass: string
  imageSelector: string
}