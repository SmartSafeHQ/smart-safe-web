export function formatWalletAddress({
  walletAddress
}: {
  walletAddress: string
}) {
  const formattedAddress = `${walletAddress.slice(
    0,
    6
  )}...${walletAddress.slice(-4)}`

  return formattedAddress
}
