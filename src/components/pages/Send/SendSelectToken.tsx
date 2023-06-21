import Image from 'next/image'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSend } from '@contexts/SendContext'
import { FetchSafeTokensOutput } from '@hooks/safe/queries/useSafeTokens'

interface SendSelectTokenProps {
  tokensIsLoading: boolean
  tokens?: FetchSafeTokensOutput[]
  handleChangeToken: (_tokenIndex: string) => void
}

export function SendSelectToken({
  tokens,
  tokensIsLoading,
  handleChangeToken
}: SendSelectTokenProps) {
  const { selectedToken } = useSend()

  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <Heading asChild className="text-zinc-900 dark:text-zinc-50 text-4xl">
          <h1>Send using:</h1>
        </Heading>

        <Skeleton isLoading={tokensIsLoading} className="w-full h-12">
          {tokens && (
            <SelectInput.Root
              className="w-full"
              onValueChange={handleChangeToken}
              defaultValue={tokens[0].symbol}
            >
              <SelectInput.Trigger className="h-12" />

              <SelectInput.Content>
                <SelectInput.Group>
                  {tokens.map(token => (
                    <SelectInput.Item
                      key={token.symbol}
                      value={token.symbol}
                      className="h-12"
                    >
                      <div className="w-full flex items-center justify-start gap-2">
                        <Image
                          src={token.icon}
                          alt={`${token.symbol} token`}
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />

                        <Text className="text-xl font-bold dark:text-zinc-50 uppercase">
                          {token.symbol}
                        </Text>
                      </div>
                    </SelectInput.Item>
                  ))}
                </SelectInput.Group>
              </SelectInput.Content>
            </SelectInput.Root>
          )}
        </Skeleton>
      </div>

      <Skeleton isLoading={tokensIsLoading} className="w-52 h-24 mx-auto">
        {selectedToken && (
          <div className="w-full flex items-center justify-center gap-3">
            <Image
              src={selectedToken?.icon}
              alt={`${selectedToken?.symbol} token`}
              width={96}
              height={96}
            />

            <div className="flex flex-col justify-center items-start">
              <Heading className="text-3xl uppercase">
                {selectedToken?.symbol}
              </Heading>

              <div className="flex items-center gap-1">
                <Text className="capitalize">balance:</Text>

                <Text className="font-semibold">
                  {selectedToken.balance.toFixed(4)}
                </Text>
              </div>
            </div>
          </div>
        )}
      </Skeleton>
    </>
  )
}
