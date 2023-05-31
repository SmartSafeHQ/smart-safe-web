import Image from 'next/image'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSend } from '@contexts/SendContext'
import { FetchSafeTokensOutput } from '@hooks/safes/retrieve/queries/useSafeTokens'
import { useSafeTokenBalance } from '@hooks/chains/queries/useSafeTokenBalance'
import { useSafe } from '@contexts/SafeContext'

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
  const { safe } = useSafe()
  const { selectedToken } = useSend()

  const { data, isLoading } = useSafeTokenBalance(
    safe?.address,
    selectedToken?.symbol,
    selectedToken?.rpcUrl,
    !!safe && !!selectedToken
  )

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
              <SelectInput.Trigger className="min-h-[3rem] bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

              <SelectInput.Content className="border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                <SelectInput.Group>
                  {tokens.map(token => (
                    <SelectInput.Item
                      key={token.symbol}
                      value={token.symbol}
                      className="min-h-[3rem] py-1"
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

              <Skeleton isLoading={isLoading} className="w-28 h-6">
                {data && (
                  <div className="flex items-center gap-1">
                    <Text className="capitalize">balance:</Text>

                    <Text className="font-semibold">
                      {data.balance.toFixed(3)}
                    </Text>
                  </div>
                )}
              </Skeleton>
            </div>
          </div>
        )}
      </Skeleton>
    </>
  )
}
