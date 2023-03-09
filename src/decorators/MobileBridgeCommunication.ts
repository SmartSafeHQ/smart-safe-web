/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
interface IMobileBridgeCommunication {
  logout(): void
  localizable(_localeId: 'pt' | 'en'): void
  saveBiometric(): void
  cameraAccess(): Promise<PermissionState>
  isPermissionGranted(): boolean
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

  async cameraAccess() {
    // TOOD: implement for IOS
    return 'denied' as PermissionState
  }

  isPermissionGranted() {
    const permission =
      window.webkit.messageHandlers.isPermissionGranted.postMessage()

    return permission
  }
}

class AndroidInterface implements IMobileBridgeCommunication {
  logout() {
    window.AndroidInterface.logout()
  }

  localizable(localeId: 'pt' | 'en') {
    window.AndroidInterface.localizable(localeId)
  }

  saveBiometric() {
    window.AndroidInterface.saveBiometric()
  }

  async cameraAccess() {
    const permissionState = window.AndroidInterface.cameraAccess()

    return permissionState
  }

  isPermissionGranted() {
    const permission = window.AndroidInterface.isPermissionGranted()

    return permission
  }
}

export class MobileBridgeCommunication {
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

  cameraAccess() {
    return this.#mobileOs?.cameraAccess()
  }

  isPermissionGranted() {
    return this.#mobileOs?.isPermissionGranted()
  }
}
