export class AndroidInterface {
  static #verifyAndroidInterface() {
    if ('AndroidInterface' in window) {
      return window.AndroidInterface
    }

    throw new Error(
      'AndroidInterface: AndroidInterface instance not available on window object.'
    )
  }

  static logout() {
    AndroidInterface.#verifyAndroidInterface().logout()
  }

  static localizable(localeId: 'pt' | 'en') {
    AndroidInterface.#verifyAndroidInterface().localizable(localeId)
  }

  static saveBiometric(email: string, password: string) {
    AndroidInterface.#verifyAndroidInterface().saveBiometric(email, password)
  }
}
