import * as RadixSelect from '@radix-ui/react-select'

import { Avatar } from '@components/Avatar'
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
      <SelectInput.Group>
        {coins.map((coin, index) => (
          <SelectInput.Item
            key={coin.symbol}
            value={String(index)}
            className="py-1"
          >
            <div className="w-full flex items-center justify-start gap-2">
              <Avatar.Root fallbackName={coin.symbol} className="w-7 h-7">
                <Avatar.Image src={coin.avatar} alt={`${coin.symbol} coin`} />
              </Avatar.Root>

              <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                {coin.symbol}
              </Text>
            </div>
          </SelectInput.Item>
        ))}
      </SelectInput.Group>
    </SelectInput.Root>
  )
}
