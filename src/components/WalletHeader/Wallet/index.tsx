import { useConnectWallet } from '@web3-onboard/react'

import { Connected } from './Connected'
import { NotConnected } from './NotConnected'

import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export function Wallet() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()

  async function handleWalletConnect() {
    if (wallet) return

    try {
      await connect()
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return (
    <div
      onClick={handleWalletConnect}
      className="flex items-center border-r-1 pr-3 border-stone-700 gap-2 hover:cursor-pointer"
    >
      {wallet ? (
        <Connected wallet={wallet} disconnect={disconnect} />
      ) : (
        <NotConnected />
      )}
    </div>
  )
}
