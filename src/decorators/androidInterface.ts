export class AndroidInterface {
  static #verifyAndroidInterface() {
    if ('AndroidInterface' in window) {
      return window.AndroidInterface
    }
  }

  static logout() {
    AndroidInterface.#verifyAndroidInterface()?.logout()
  }

  static localizable(localeId: 'pt' | 'en') {
    AndroidInterface.#verifyAndroidInterface()?.localizable(localeId)
  }

  static saveBiometric(email: string, password: string) {
    AndroidInterface.#verifyAndroidInterface()?.saveBiometric(email, password)
  }
}
