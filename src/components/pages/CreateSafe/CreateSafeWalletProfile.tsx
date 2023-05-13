import Image from 'next/image'
import { CaretDown } from 'phosphor-react'

import { Text } from '@components/Text'

type CreateSafeWalletProfileProps = {
  icon: string
  formattedOwnerAddress: string
}

export function CreateSafeWalletProfile({
  icon,
  formattedOwnerAddress
}: CreateSafeWalletProfileProps) {
  return (
    <div className="w-full h-9 flex items-center justify-between px-4 text-left overflow-hidden rounded-md pointer">
      <div className="flex items-center gap-3">
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
          alt="wallet connector provider icon"
          width={16}
          height={16}
          className="w-5 h-5"
        />

        <Text className="text-sm">{formattedOwnerAddress}</Text>
      </div>

      <CaretDown className="w-4 h-4 text-zinc-400" />
    </div>
  )
}
