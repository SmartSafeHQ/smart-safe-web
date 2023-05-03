import { Wallet } from './Wallet'
import { Network } from './Network'

export function WalletHeader() {
  return (
    <div className="w-full items-center justify-end flex border-b-1 border-gray-700">
      <Wallet />

      <Network />
    </div>
  )
}
