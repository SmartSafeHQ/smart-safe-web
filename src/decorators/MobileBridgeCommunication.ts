interface IMobileBridgeCommunication {
  logout: () => void
  localizable: (_localeId: 'pt' | 'en') => void
  saveBiometric: () => void
}

class IosInterface implements IMobileBridgeCommunication {
  logout() {
    window.webkit.messageHandlers.logout.postMessage('')
  }

  localizable(localeId: 'pt' | 'en') {
    window.webkit.messageHandlers.localizable.postMessage(localeId)
  }

  saveBiometric() {
    window.webkit.messageHandlers.saveBiometric.postMessage('')
  }
}

class AndroidInterface implements IMobileBridgeCommunication {
  logout() {
    window.AndroidInterface?.logout()
  }

  localizable(localeId: 'pt' | 'en') {
    window.AndroidInterface?.localizable(localeId)
  }

  saveBiometric() {
    window.AndroidInterface?.saveBiometric()
  }
}

export class MobileBridgeCommunication {
  // eslint-disable-next-line no-use-before-define
  static #instance: MobileBridgeCommunication
  readonly #mobileOs: IMobileBridgeCommunication | undefined

  private constructor() {
    this.#mobileOs = this.#isAndroid() || this.#isIOS()
  }

  static initialize() {
    if (!MobileBridgeCommunication.#instance) {
      MobileBridgeCommunication.#instance = new MobileBridgeCommunication()
    }

    return MobileBridgeCommunication.#instance
  }

  #isAndroid() {
    console.log('AndroidInterface' in window)
    console.log(window)
    if ('AndroidInterface' in window) {
      return new AndroidInterface()
    }
  }

  #isIOS() {
    if ('webkit' in window) {
      return new IosInterface()
    }
  }

  logout() {
    this.#mobileOs?.logout()
  }

  localizable(localeId: 'pt' | 'en') {
    this.#mobileOs?.localizable(localeId)
  }

  saveBiometric() {
    this.#mobileOs?.saveBiometric()
  }
}
