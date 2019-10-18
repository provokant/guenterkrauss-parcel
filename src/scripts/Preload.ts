export default class Preload {

  private options: Options
  private allImages: NodeListOf<Element>

  constructor(options?: any) {
    this.resetOptions(options)
    this.queryAllImages()
    this.preloadImages()
    this.showLoading()
  }

  private showLoading() {
    const { bodyClass, loadingClass, loading } = this.options

    document.body.classList.add(bodyClass)
    document.querySelector(loading).classList.add(loadingClass)
  }

  private queryAllImages(): void {
    const { imageSelector } = this.options

    this.allImages = document.querySelectorAll(imageSelector)
  }

  private preloadImages() {
    if (!this.allImages) return;

    const { animationDuration } = this.options

    window.setTimeout(() => {
      this.resetBody()
      this.hideLoading()
    }, animationDuration)
  }

  private resetBody(): void {
    const { bodyClass } = this.options

    document.body.classList.remove(bodyClass)
  }

  private hideLoading(): void {
    const { loading, loadingClass } = this.options

    document.querySelector(loading).remove()
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        loading: '.loading-screen',
        loadingClass: '--show',
        bodyClass: '--loading',
        imageSelector: '[data-preload]',
        animationDuration: 2300
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
  animationDuration: number
}