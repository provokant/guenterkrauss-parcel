export default class Modals {

  private allModals: NodeListOf<HTMLElement>
  private allTogglers: NodeListOf<HTMLElement>
  private allCloseButtons: NodeListOf<HTMLElement>
  private options: Options
  private activeModal: string
  private wrapperClasses: string[] = []
  
  constructor(options?: any) {
    this.resetOptions(options)
    this.resetModals()
    this.selectModals()
    this.attachListeners()
  }

  public closeAll(): void {
    this.resetModals()
    this.restoreBody()
    this.hideBackdrop()
    this.resetAllWrappers()
  }

  private attachListeners(): void {
    this.allTogglers.forEach(toggler => {
      toggler.addEventListener('click', ({ target }) => {
        // tslint:disable-next-line
        const { dataset } = target

        this.showModal(dataset.modalTarget)
        this.showBackdrop()
        this.modifyBody()

        if (dataset.modalWrapper) {
          const { modalWrapper } = dataset
          
          this.modifyWrapper(modalWrapper)
          this.wrapperClasses.push(modalWrapper)
        }
      })
    })
    
    this.allCloseButtons.forEach(toggler => {
      toggler.addEventListener('click', e => {
        this.closeAll()
      })
    })
  }

  private get hasBackdrop(): boolean {
    const { backdropSelector } = this.options

    return document.querySelector(backdropSelector) ? true : false;
  }

  private showBackdrop(): void {
    const { backdropSelector, backdropClass } = this.options

    if (this.hasBackdrop) {
      document.querySelector(backdropSelector)?.classList.add(backdropClass)
    }
  }

  private hideBackdrop(): void {
    const { backdropSelector, backdropClass } = this.options

    if (this.hasBackdrop) {
      document.querySelector(backdropSelector)?.classList.remove(backdropClass)
    }
  }

  private modifyWrapper(selector: string): void {
    const { wrapperClass } = this.options
    const wrapper = document.querySelector(selector)

    if (wrapper) {
      wrapper.classList.add(wrapperClass)
    }
  }

  private resetAllWrappers(): void {
    const { wrapperClass } = this.options

    this.wrapperClasses.forEach(selector => {
      const wrapper = document.querySelector(selector)

      if (wrapper) {
        wrapper.classList.remove(wrapperClass)
      }
    })
  }

  private selectModals() {
    this.allModals = document.querySelectorAll(this.options.modalSelector)
    this.allTogglers = document.querySelectorAll(this.options.togglerSelector)
    this.allCloseButtons = document.querySelectorAll(this.options.closeButtonSelector)
  }

  private showModal(id: string): void {
    const { modalClass } = this.options

    this.activeModal = id
    document.getElementById(id)?.classList.add(modalClass)
  }

  private restoreBody(): void {
    const { bodyClass } = this.options

    document.body.classList.remove(bodyClass)
  }
  
  private modifyBody(): void {
    const { bodyClass } = this.options

    document.body.className = bodyClass
  }

  private resetModals(): void {
    const { modalClass } = this.options

    if (this.activeModal) {
      document.getElementById(this.activeModal)?.classList.remove(modalClass)
    }
    this.activeModal = null
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        modalSelector: '[data-modal]',
        togglerSelector: '[data-modal-target]',
        closeButtonSelector: '[data-modal-close]',
        backdropSelector: '[data-modal-backdrop]',
        modalClass: '--active',
        bodyClass: '--no-scroll',
        backdropClass: '--active',
        wrapperClass: '--shift',
      },
      ...options
    }
  }
}

interface Options {
  modalSelector: string 
  togglerSelector: string
  closeButtonSelector: string
  backdropSelector: string
  modalClass: string
  bodyClass: string
  backdropClass: string
  wrapperClass: string
}