export default class Parallax {

  private options: Options = {
    selector: '[data-parallax]',
    lastElementKey: 0,
    siblingSelector: ''
  }
  private elements: ParallaxObject[] = []
  private siblingNode: HTMLElement | null = null
  // Standard-Maximalverschiebung in px, um übermäßige Offsets (und optische Lücken) zu vermeiden
  private readonly DEFAULT_CAP = 220

  constructor(options?: any) {
    this.resetOptions(options)
    this.assignElements()
    this.attachListeners()
  }

  private attachListeners(): void {
    window.addEventListener('DOMContentLoaded', () => this.scrollEvent(), false)
  }

  private scrollEvent(): void {
  // Glättungsfaktor für weiche Bewegungen (0..1); höher = schnelleres Folgen
  const SMOOTH_ALPHA = 0.08
  const EPS = 0.06
  const WRITE_EPS = 0.04
  // Globale Dämpfung der Amplitude für dezenteres Parallax-Verhalten
  const BASE_DAMP = 0.35
  // Sanfte Skalierung des Fortschritts, um Randbereiche weiter zu beruhigen
  const PROGRESS_SCALE = 0.85
  // Relative Begrenzung in Abhängigkeit von der Elementhöhe, um Überlappungen weiter zu reduzieren
  const RELATIVE_CAP_FACTOR = 0.26
  // Bereich oberhalb des Footers, in dem die Parallax-Bewegung weich ausfadet (größer = früher beruhigen)
  const FOOTER_FADE_RANGE_VH = 1.2
  // Schreib-Zonen: Kernzone (wie bisher) und erweiterte Zone, um Offscreen-Catch-up-Sprünge zu vermeiden
  const CORE_ZONE_TOP_VH = 1.2
  const CORE_ZONE_BOTTOM_VH = 0.2
  const EXT_ZONE_TOP_VH = 2.4
  const EXT_ZONE_BOTTOM_VH = 1.0

    this.elements.forEach(({ element, parentNode, parallax, lastY }, key) => {
  // Fortschritt robust gegen Self-Transform messen:
  // Bevorzugt die Geometrie des offsetParent + offsetTop nutzen.
  // Fallback auf direkten Parent, falls kein offsetParent vorhanden ist.
  const offsetParent = (element.offsetParent as HTMLElement) || parentNode
  const baseRect = offsetParent.getBoundingClientRect()
  const elCenter = baseRect.top + element.offsetTop + (element.offsetHeight / 2)
  const top = elCenter - (element.offsetHeight / 2)
  const bottom = elCenter + (element.offsetHeight / 2)
  const height = element.offsetHeight || 0
      const { lastElementKey } = this.options
      const { innerHeight } = window

      // Fortschritt relativ zur Viewport-Mitte (Elementzentrum vs. Viewportzentrum)
      // progress < 0: Elementzentrum oberhalb der Mitte, > 0: unterhalb der Mitte
  let progress = ((elCenter) - (innerHeight / 2)) / innerHeight
      // sanft begrenzen, damit Elemente am Rand nicht „davonfliegen“
      if (progress < -1.25) progress = -1.25
      else if (progress > 1.25) progress = 1.25
  const progressScaled = progress * PROGRESS_SCALE

      // Parallax-Offset: bewege entgegen der Scrollrichtung um den Faktor
      // negative progress (oben) -> positiver Offset (leicht nach unten), und umgekehrt
  let y = -progressScaled * innerHeight * parallax * BASE_DAMP
  // Footer-Nähe zusätzlich beruhigen
  if (this.siblingNode) {
    const footerRect = this.siblingNode.getBoundingClientRect()
    const distCenterToFooterTop = footerRect.top - (top + height / 2)
    const fadeRange = innerHeight * FOOTER_FADE_RANGE_VH
    if (distCenterToFooterTop < fadeRange) {
      const nearFooterScale = Math.max(0, Math.min(1, distCenterToFooterTop / fadeRange))
      y *= nearFooterScale
    }
  }
  // Optionaler Container-Boost: nächstgelegenen Vorfahren mit data-parallax-boost / -cap lesen
  const container = element.closest('[data-parallax-boost], [data-parallax-cap]') as HTMLElement | null
  const boostAttr = container?.getAttribute('data-parallax-boost')
  const capAttr = container?.getAttribute('data-parallax-cap')
  const elemCapAttr = element.getAttribute('data-parallax-cap')
  const relCapAttr = element.getAttribute('data-parallax-relcap')
  const boost = boostAttr ? parseFloat(boostAttr) : 1
  // Per-Element Cap hat Vorrang, sonst Container-Cap, sonst Default
  const cap = elemCapAttr ? parseFloat(elemCapAttr) : (capAttr ? parseFloat(capAttr) : this.DEFAULT_CAP)
  const yBoosted = y * (isFinite(boost) && boost > 0 ? boost : 1)
  // harte Begrenzung, damit Elemente außerhalb des Sichtbereichs nicht tausende Pixel verschoben werden
  const maxCapAbs = isFinite(cap) && cap > 0 ? cap : this.DEFAULT_CAP
  // relative Begrenzung optional deaktivieren (z.B. für sehr kleine Text-Elemente)
  const relCapDisabled = !!(relCapAttr && /^(0|false|off|no)$/i.test(relCapAttr))
  const elementCap = relCapDisabled ? Infinity : (height * RELATIVE_CAP_FACTOR)
  const effectiveCap = Math.max(0, Math.min(maxCapAbs, elementCap))
  const yClamped = Math.max(Math.min(yBoosted, effectiveCap), -effectiveCap)
  // Weiche Annäherung an das Ziel, um Wackeln/Zittern zu vermeiden
  const yNext = Math.abs(yClamped - lastY) < EPS
    ? yClamped
    : (lastY + (yClamped - lastY) * SMOOTH_ALPHA)
    
    // Update-Zonen berechnen
  const inCoreZone = (top <= innerHeight * CORE_ZONE_TOP_VH && bottom >= -innerHeight * CORE_ZONE_BOTTOM_VH)
  const inExtendedZone = !inCoreZone && (top <= innerHeight * EXT_ZONE_TOP_VH && bottom >= -innerHeight * EXT_ZONE_BOTTOM_VH)

    // In der Kernzone wie bisher aktualisieren
  if (inCoreZone) {
        // will-change einmal setzen (Performance-Hinweis für den Browser)
        if (element.style.willChange !== 'transform') {
          element.style.willChange = 'transform'
        }
        // Nur schreiben, wenn sich der Wert gegenüber dem zuletzt gerenderten Transform merklich geändert hat
        const lastAppliedY = this.elements[key].lastAppliedY ?? 0
        if (Math.abs(yNext - lastAppliedY) > WRITE_EPS) {
          element.style.transform = `translate3d(0, ${yNext}px, 0)`
          this.elements[key].lastAppliedY = yNext
        }
      } else if (inExtendedZone) {
        // In der erweiterten Zone weiterhin sanft folgen, damit beim Wiedereintreten kein großer Sprung entsteht
        const lastAppliedY = this.elements[key].lastAppliedY ?? 0
        if (Math.abs(yNext - lastAppliedY) > WRITE_EPS) {
          element.style.transform = `translate3d(0, ${yNext}px, 0)`
          this.elements[key].lastAppliedY = yNext
        }
      }

      // letzten Wert speichern (auch wenn wir knapp außerhalb der Update-Zone sind)
      this.elements[key].lastY = yNext

      // Footer-Manipulation deaktiviert
      if(key === lastElementKey && this.siblingNode) {
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
      this.siblingNode = document.querySelector(siblingSelector) as HTMLElement
    }

    document.querySelectorAll(selector).forEach((element) => {
      const htmlElement = element as HTMLElement
      const { dataset, parentNode } = htmlElement
      const { parallax } = dataset

      if (parallax && parentNode) {
        this.elements.push({
          element: htmlElement, 
          lastElement: htmlElement,
          parentNode: parentNode as HTMLElement,
          parallax: parseFloat(parallax),
          lastY: 0,
          lastAppliedY: 0
        })
      }
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
  lastY: number
  lastAppliedY: number
}