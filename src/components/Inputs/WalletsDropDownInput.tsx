import * as RadixSelect from '@radix-ui/react-select'

import { Avatar } from '@components/Avatar'
import { Text } from '@components/Text'
import { SelectInput } from '@components/Inputs/SelectInput'

interface CoinsDropDownInputProps extends RadixSelect.SelectProps {
  wallets: {
    network: string
    icon: string
  }[]
}

export function WalletsDropDownInput({
  wallets,
  ...props
}: CoinsDropDownInputProps) {
  return (
    <SelectInput.Root className="w-full" defaultValue="0" {...props}>
      <SelectInput.Trigger className="min-h-[3rem] py-1" />

      <SelectInput.Content className="bg-gray-100 dark:bg-gray-900">
        <SelectInput.Group>
          {wallets.map(({ icon, network }, index) => (
            <SelectInput.Item
              key={network}
              value={String(index)}
              className="py-1"
            >
              <div className="w-full flex items-center justify-start gap-2">
                <Avatar.Root fallbackName={network} className="w-7 h-7">
                  <Avatar.Image src={icon} alt={`${network} native token`} />
                </Avatar.Root>

                <Text className="text-md font-bold dark:text-gray-50 uppercase">
                  {network}
                </Text>
              </div>
            </SelectInput.Item>
          ))}
        </SelectInput.Group>
      </SelectInput.Content>
    </SelectInput.Root>
  )
}