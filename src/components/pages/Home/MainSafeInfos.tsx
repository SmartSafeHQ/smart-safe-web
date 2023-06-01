import { ArrowSquareOut, Copy } from '@phosphor-icons/react'
import Link from 'next/link'

import { Avatar } from '@components/Avatar'
import { Heading } from '@components/Heading'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Text } from '@components/Text'

import { handleCopyToClipboard } from '@utils/clipboard'
import { useSafe } from '@contexts/SafeContext'
import { useSafeOwnersCount } from '@hooks/safe/queries/useSafeOwnersCount'

export function MainSafeInfos() {
  const { safe } = useSafe()
  const { data: ownersCount } = useSafeOwnersCount(safe?.address, !!safe)

  return (
    <main className="max-h-[16rem] min-w-[20rem] flex flex-col flex-1 items-stretch justify-start gap-3 relative p-6 rounded-lg border-1 border-zinc-200 dark:border-zinc-700 shadow-md bg-white dark:bg-black sm:min-w-[37rem]">
      <Heading className="text-lg font-semibold">Overview</Heading>

      <div className="w-full flex items-center justify-start gap-3 text-left">
        <Skeleton isLoading={!safe} variant="avatar" className="w-14 h-14">
          <Avatar.Root fallbackName={safe?.name} className="w-14 h-14">
            <Avatar.Image src="#" alt={safe?.ownerName} />
          </Avatar.Root>
        </Skeleton>

        <div className="flex flex-col items-stretch justify-start">
          <Skeleton isLoading={!safe} className="w-24 h-6 mb-2">
            <Text asChild className="text-lg font-medium">
              <strong>{safe?.name}</strong>
            </Text>
          </Skeleton>

          <div className="flex flex-col items-baseline justify-start gap-2 md:flex-row">
            <Skeleton isLoading={!safe} className="w-48 h-6">
              <Text className="text-zinc-600 dark:text-zinc-500">
                {safe?.formattedAddress}
              </Text>

              <div className="flex items-center justify-start gap-2">
                <button
                  onClick={() => handleCopyToClipboard(safe?.address ?? '')}
                  className="flex items-center justify-center p-2 rounded-lg whitespace-nowrap text-cyan-500 transition-colors bg-zinc-500/10 dark:bg-zinc-50/10 hover:bg-zinc-500/20 hover:dark:bg-zinc-50/20"
                >
                  <Copy className="w-4 h-4 " />
                </button>

                <Link
                  href={`${safe?.chain.explorerUrl}/address/${safe?.address}`}
                  target="_blank"
                  className="flex items-center justify-center p-2 rounded-lg whitespace-nowrap text-cyan-500 transition-colors bg-zinc-500/10 dark:bg-zinc-50/10 hover:bg-zinc-500/20 hover:dark:bg-zinc-50/20"
                >
                  <ArrowSquareOut className="w-4 h-4 " />
                </Link>
              </div>
            </Skeleton>
          </div>
        </div>

        <div className="h-full flex flex-1 items-start justify-end ml-2">
          <div className="flex items-center gap-2">
            <Skeleton isLoading={!safe} className="w-20 h-5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: safe?.chain.hexColor
                }}
              />

              <Text className="text-xs text-zinc-600 dark:text-zinc-500">
                {safe?.chain.networkName}
              </Text>
            </Skeleton>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-8 mt-auto">
        <Skeleton isLoading={!safe} className="w-14 h-[3.75rem]">
          <div className="flex flex-col items-stretch justify-start gap-1">
            <Text asChild className="text-sm text-zinc-500">
              <strong>Tokens</strong>
            </Text>

            <Text className="text-3xl">1</Text>
          </div>
        </Skeleton>

        <Skeleton isLoading={!safe} className="w-14 h-[3.75rem]">
          <div className="flex flex-col items-stretch justify-start gap-1">
            <Text asChild className="text-sm text-zinc-500">
              <strong>Owners</strong>
            </Text>

            <Text className="text-3xl">{ownersCount}</Text>
          </div>
        </Skeleton>
      </div>
    </main>
  )
}
