import { useEffect } from 'react'
import * as RadixSelect from '@radix-ui/react-select'

import { useSellContext } from '@/contexts/pages/SellContext'

import { Text } from '@components/Text'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Avatar } from '@/components/Avatar'

interface ITokenDropDownInput extends RadixSelect.SelectProps {
  tokens: {
    symbol: 'IBRL' | 'IEUR'
    name: string
    address: string
    iconUrl: string
  }[]
}

export function TokenDropDownInput({ tokens, ...props }: ITokenDropDownInput) {
  const { setValue, handleSetDropDownInputValue } = useSellContext()

  useEffect(() => {
    setValue('tokenSymbol', tokens[0].symbol)
  }, [])

  return (
    <SelectInput.Root
      className="w-full"
      defaultValue={tokens[0].symbol}
      onValueChange={value => handleSetDropDownInputValue(value, 'tokenSymbol')}
      {...props}
    >
      <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

      <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
        <SelectInput.Group>
          {tokens.map(token => (
            <SelectInput.Item
              key={token.symbol}
              value={token.symbol}
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
