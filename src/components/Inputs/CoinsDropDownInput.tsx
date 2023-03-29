import * as RadixSelect from '@radix-ui/react-select'
import Image from 'next/image'

import { Text } from '@components/Text'
import { SelectInput } from '@components/Inputs/SelectInput'

interface CoinsDropDownInputProps extends RadixSelect.SelectProps {
  coins: { symbol: string; avatar: string }[]
}

export function CoinsDropDownInput({
  coins,
  ...props
}: CoinsDropDownInputProps) {
  return (
    <SelectInput.Root className="w-full" defaultValue="0" {...props}>
      <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

      <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
        <SelectInput.Group>
          {coins.map((coin, index) => (
            <SelectInput.Item
              key={coin.symbol}
              value={String(index)}
              className="min-h-[3rem] py-1"
            >
              <div className="w-full flex items-center justify-start gap-2">
                <Image
                  src={coin.avatar}
                  alt={`${coin.symbol} coin`}
                  width={28}
                  height={28}
                />

                <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                  {coin.symbol}
                </Text>
              </div>
            </SelectInput.Item>
          ))}
        </SelectInput.Group>
      </SelectInput.Content>
    </SelectInput.Root>
  )
}
