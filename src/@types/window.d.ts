declare global {
  interface Window {
    // this is available when using the Tokenverse App (PlayStore/AppStore)
    AndroidInterface: {
      saveBiometric: (_email: string, _password: string) => void
      logout: () => void
      localizable: (_code: 'pt' | 'en') => void
    }
  }
}
window.AndroidInterface = window.AndroidInterface || {}

export {}
