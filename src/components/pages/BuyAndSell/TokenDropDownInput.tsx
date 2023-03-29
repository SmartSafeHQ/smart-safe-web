import * as RadixSelect from '@radix-ui/react-select'

import { Text } from '@components/Text'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Avatar } from '@/components/Avatar'

interface ITokenDropDownInput extends RadixSelect.SelectProps {
  tokens: { symbol: string; name: string; address: string; iconUrl: string }[]
}

export function TokenDropDownInput({ tokens, ...props }: ITokenDropDownInput) {
  return (
    <SelectInput.Root className="w-full" defaultValue="0" {...props}>
      <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

      <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
        <SelectInput.Group>
          {tokens.map((token, index) => (
            <SelectInput.Item
              key={token.symbol}
              value={String(index)}
              className="min-h-[3rem] py-1"
            >
              <div className="w-full flex items-center justify-start gap-2">
                <Avatar.Root fallbackName={token.symbol} className="w-7 h-7">
                  <Avatar.Image
                    src={token.iconUrl}
                    alt={`${token.symbol} token`}
                  />
                </Avatar.Root>

                <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                  {token.symbol}
                </Text>
              </div>
            </SelectInput.Item>
          ))}
        </SelectInput.Group>
      </SelectInput.Content>
    </SelectInput.Root>
  )
}
