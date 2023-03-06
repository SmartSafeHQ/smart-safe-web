/* eslint-disable no-undef */

declare global {
  interface Window {
    // this is available when using the InWallet App (PlayStore/AppStore)
    AndroidInterface: {
      saveBiometric: () => void
      logout: () => void
      localizable: (_code: 'pt' | 'en') => void
      cameraAccess: () => Promise<PermissionState>
    }
    webkit: {
      messageHandlers: {
        saveBiometric: {
          postMessage: (_param) => void
        }
        logout: {
          postMessage: (_param) => void
        }
        localizable: {
          postMessage: (_code: 'pt' | 'en') => void
        }
      }
    }
  }
}

export {}
