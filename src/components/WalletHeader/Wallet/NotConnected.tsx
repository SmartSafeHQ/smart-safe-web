import { Keyhole } from '@phosphor-icons/react'

export function NotConnected() {
  return (
    <>
      <Keyhole size={40} weight="fill" />

      <div>
        <p className="font-bold">Not connected</p>
        <p className="text-red-500">Connect wallet</p>
      </div>
    </>
  )
}
