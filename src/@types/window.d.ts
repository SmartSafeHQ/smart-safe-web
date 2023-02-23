declare global {
  interface Window {
    // this is available when using the Tokenverse App (PlayStore/AppStore)
    AndroidInterface: {
      saveBiometric: () => void
      logout: () => void
      localizable: (_code: 'pt' | 'en') => void
    }
    webkit: {
      messageHandlers: {
        saveBiometric: {
          postMessage: () => void
        }
        logout: {
          postMessage: () => void
        }
        localizable: {
          postMessage: (_code: 'pt' | 'en') => void
        }
      }
    }
  }
}

export {}
