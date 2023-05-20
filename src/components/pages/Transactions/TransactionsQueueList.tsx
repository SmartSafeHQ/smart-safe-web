import {
  ArrowDownRight,
  ArrowSquareOut,
  ArrowsCounterClockwise,
  CheckCircle,
  Copy,
  PaperPlaneTilt,
  XCircle
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

import { useSafeTxQueue } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { useSafe } from '@contexts/SafeContext'
import { handleCopyToClipboard } from '@utils/clipboard'
import { Collapsible } from '@/components/Collapsible'

export function TransactionsQueueList() {
  const { safe } = useSafe()
  const {
    data: transactionsQueue,
    error,
    isLoading
  } = useSafeTxQueue(safe?.address, safe?.chain.chainId, !!safe)

  return (
    <ScrollArea className="w-full max-w-full px-2">
      {error ? (
        <ErrorState
          title="Unable to load safe transactions, please try again"
          description={
            (error as Error)?.message ??
            'An unknown error occurred. Please try again later.'
          }
        />
      ) : isLoading ? (
        <LoadingState title="Loading safe transactions queue" />
      ) : (
        transactionsQueue &&
        safe && (
          <section className="w-full flex flex-col items-stretch justify-start gap-2">
            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>To confirm</strong>
            </Text>

            <main className="flex flex-1 flex-col items-stretch justify-start relative rounded-md border-1 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black">
              <div className="w-full min-h-[4rem] flex items-stretch justify-between gap-4 py-4 px-6 font-medium capitalize md:items-center">
                <Text>7</Text>

                <div className="max-w-5xl flex flex-1 flex-col items-stretch justify-between gap-2 md:items-center md:flex-row">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <Text>send</Text>
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src="/networks/polygon-logo.svg"
                      alt="chain to deploy safe icon"
                      width={24}
                      height={24}
                    />

                    <Text className="uppercase">-0.001 matic</Text>
                  </div>

                  <Text>20/05/2023</Text>
                </div>

                <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
                  Approves 1/2
                </Text>
              </div>

              <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
                <div className="w-full flex flex-col items-stretch justify-start gap-5 p-6">
                  <div className="w-full flex flex-col items-stretch justify-start gap-3 md:max-w-sm">
                    <Heading className="text-2xl font-medium">
                      Send 0.003 MATIC to:
                    </Heading>

                    <div className="flex items-center justify-start gap-2 my-2">
                      <div className="w-min mb-3 flex items-center justify-center p-3 rounded-full bg-zinc-300 dark:bg-zinc-700">
                        <PaperPlaneTilt
                          className="w-5 h-5 text-cyan-500"
                          weight="bold"
                        />
                      </div>

                      <div className="flex flex-col items-stretch justify-start gap-2">
                        <Text>0x45e9...22fA1</Text>

                        <div className="flex items-center justify-start gap-2">
                          <button
                            onClick={() => handleCopyToClipboard('')}
                            className="transition-colors hover:text-cyan-500"
                          >
                            <Copy className="w-4 h-4 " />
                          </button>

                          <Link
                            href={''}
                            target="_blank"
                            className="transition-colors hover:text-cyan-500"
                          >
                            <ArrowSquareOut className="w-4 h-4 " />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch justify-start gap-2">
                      <div className="w-full flex items-start justify-between gap-1">
                        <Text
                          asChild
                          className="text-sm text-zinc-700 dark:text-zinc-400 font-medium capitalize"
                        >
                          <strong>transaction hash</strong>
                        </Text>

                        <div className="flex items-center gap-2">
                          <Text className="text-sm">0x3b4c...53ba</Text>

                          <button
                            onClick={() => handleCopyToClipboard('')}
                            className="transition-colors hover:text-cyan-500"
                          >
                            <Copy className="w-4 h-4 " />
                          </button>
                        </div>
                      </div>

                      <div className="w-full flex items-start justify-between gap-1">
                        <Text
                          asChild
                          className="text-sm text-zinc-700 dark:text-zinc-400 font-medium capitalize"
                        >
                          <strong>created at</strong>
                        </Text>

                        <Text className="text-sm">5/15/2023, 9:56:17 AM</Text>
                      </div>
                    </div>
                  </div>

                  <Collapsible.Root
                    defaultOpen={false}
                    className="w-full flex flex-col"
                  >
                    <div className="flex flex-col items-stretch justify-between gap-3 w-full text-left overflow-hidden sm:flex-row">
                      <div className="flex items-center justify-start gap-3">
                        <div className="w-min mb-3 flex items-center justify-center p-2 rounded-full bg-yellow-600">
                          <ArrowsCounterClockwise className="w-5 h-5 text-zinc-50" />
                        </div>

                        <div className="flex flex-col items-stretch justify-start">
                          <Heading asChild className="text-lg font-medium">
                            <h3>Send waiting approves (1/1)</h3>
                          </Heading>

                          <Text className="text-sm text-zinc-600 dark:text-zinc-500">
                            1 pending approval to execute the transaction
                          </Text>
                        </div>
                      </div>

                      <Collapsible.Trigger className="h-min text-xs text-start text-cyan-500 transition-colors hover:text-cyan-600">
                        Show all owners
                      </Collapsible.Trigger>
                    </div>

                    <Collapsible.Content className="w-full flex flex-col items-start justify-start">
                      <div className="flex items-center justify-start gap-1 mt-5">
                        <CheckCircle
                          className="w-6 h-6 text-green-600"
                          weight="fill"
                        />

                        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                          0x45e99255C041b69C8e3771b286Cae2EDA5622fA1
                        </Text>
                      </div>

                      <div className="flex items-center justify-start gap-1 mt-5">
                        <XCircle
                          className="w-6 h-6 text-red-500"
                          weight="fill"
                        />

                        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                          0x45e99255C041b69C8e3771b286Cae2EDA5622fA1
                        </Text>
                      </div>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </div>

                <div className="w-full flex justify-start items-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-900 border-t-1 border-zinc-200 dark:border-zinc-700">
                  <Button className="w-max bg-green-500">
                    Approve transaction
                  </Button>

                  <Button className="w-max" variant="red">
                    Reject transaction
                  </Button>
                </div>
              </div>
            </main>

            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>Pending Queue </strong>
            </Text>

            <ul>
              <li className="flex flex-1 flex-col items-stretch justify-start relative rounded-md border-1 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black">
                <div className="w-full min-h-[4rem] flex items-stretch justify-between gap-4 py-4 px-6 font-medium capitalize md:items-center">
                  <Text>7</Text>

                  <div className="max-w-5xl flex flex-1 flex-col items-stretch justify-between gap-2 md:items-center md:flex-row">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                      <Text>send</Text>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                        src="/networks/polygon-logo.svg"
                        alt="chain to deploy safe icon"
                        width={24}
                        height={24}
                      />

                      <Text className="uppercase">-0.001 matic</Text>
                    </div>

                    <Text>20/05/2023</Text>
                  </div>

                  <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
                    pending
                  </Text>
                </div>
              </li>
            </ul>
          </section>
        )
      )}
    </ScrollArea>
  )
}
