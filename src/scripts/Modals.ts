export default class Modals {

  
  // private classes: Classes
  // private selectors: Selectors
  // private activeModal: Modal
  private allModals: NodeListOf<HTMLElement>
  private allTogglers: NodeListOf<HTMLElement>
  private allCloseButtons: NodeListOf<HTMLElement>
  private options: Options
  // private isActive: boolean
  private activeModal: string
  
  constructor(options?: any) {
    this.resetOptions(options)
    this.resetModals()
    this.selectModals()
    this.attachListeners()

    // this.classes = {
    //   active: '--active',
    //   bodyFixed: '--no-scroll'
    // }


  }

  public init(
  ) {
    // this.selectors = {
    //   modal: modalSelector,
    //   toggle: togglerSelector,
    //   closeButton: closeButtonSelector
    // }

  }

  private attachListeners(): void {
    this.allTogglers.forEach(toggler => {
      toggler.addEventListener('click', ({ target }) => {
        // tslint:disable-next-line
        const { dataset } = target
        this.showModal(dataset.modalTarget)
        this.modifyBody()
      })
    })
    
    this.allCloseButtons.forEach(toggler => {
      toggler.addEventListener('click', e => {
        this.resetModals()
        this.modifyBody()
      })
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
    document.getElementById(id).classList.add(modalClass)
  }

  // private resetActiveModal(): void {
  //   this.activeModal.element().className = ''
  //   this.activeModal.id = null
  //   this.activeModal.isActive = false
  // }

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
      document.getElementById(this.activeModal).classList.remove(modalClass)
    }
    this.activeModal = null
  }

  private resetOptions(options: any): void {
    this.options = {
      ...{
        modalSelector: '[data-modal]',
        togglerSelector: '[data-modal-target]',
        closeButtonSelector: '[data-modal-close]',
        modalClass: '--active',
        bodyClass: '--no-scroll'
      },
      ...options
    }
  }
}

interface Options {
  modalSelector: string 
  togglerSelector: string
  closeButtonSelector: string
  modalClass: string
  bodyClass: string
}

// interface Modal {
//   isActive: boolean
//   id: string
//   element(): HTMLElement
// }

// interface Selectors {
//   modal: string
//   toggle: string
//   closeButton: string
// }

// interface Classes {
//   [className: string]: string
// }