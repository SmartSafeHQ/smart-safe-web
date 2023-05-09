declare global {
  interface Window {
    // this is available when using metamask
    ethereum: any
  }
}

export {}
