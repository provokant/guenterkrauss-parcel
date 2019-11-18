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
    const { loading, loadingClass, loadingFadeOutClass } = this.options

    document.querySelector(loading).classList.add(loadingFadeOutClass)

    window.setTimeout(() => {
      document.querySelector(loading).remove()
    }, 340);
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        loading: '.loading-screen',
        loadingClass: '--show',
        loadingFadeOutClass: '--fade-out',
        bodyClass: '--loading',
        imageSelector: '[data-preload]',
        animationDuration: 3500
      },
      ...options
    }
  }
}

interface Options {
  loading: string
  loadingClass: string
  loadingFadeOutClass: string
  bodyClass: string
  imageSelector: string
  animationDuration: number
}