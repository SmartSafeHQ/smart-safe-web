export function formatWalletAddress(walletAddress: string) {
  const formattedAddress = `${walletAddress.slice(
    0,
    6
  )}...${walletAddress.slice(-4)}`

  return formattedAddress
}

export function getTokenIconUrl(symbol: string) {
  const iconUrl =
    'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color'

  return `${iconUrl}/${symbol.toLowerCase()}.svg`
}
