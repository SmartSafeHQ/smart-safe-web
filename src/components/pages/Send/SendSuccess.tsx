import dayjs from 'dayjs'
import Image from 'next/image'
import { ArrowSquareOut, ArrowsCounterClockwise } from '@phosphor-icons/react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useSend } from '@contexts/SendContext'
import { useSafe } from '@contexts/SafeContext'

export interface SendSuccessProps {
  transactionUrl: string
}

export function SendSuccess({ transactionUrl }: SendSuccessProps) {
  const { transaction, selectedToken } = useSend()
  const { safe } = useSafe()

  if (!transaction || !selectedToken) return <></>

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <header className="flex w-full items-center flex-col gap-3 p-8 rounded-lg bg-zinc-50 dark:bg-zinc-950">
        <ArrowsCounterClockwise
          className="w-24 h-24 text-cyan-500"
          weight="bold"
        />

        <div className="w-full flex flex-col items-center gap-2">
          <Heading className="text-2xl zinc-50 capitalize">
            Request sent
          </Heading>

          <Text className="text-sm">1 of {safe?.threshold} approves</Text>
        </div>
      </header>

      <div className="w-full flex flex-col items-center justify-center gap-4 py-8 px-4 border-t-1 border-zinc-200 dark:border-zinc-700 sm:px-8">
        <div className="w-full flex items-start justify-between gap-2 ">
          <div className="flex items-center gap-2">
            <Heading asChild className="dark:text-zinc-400 capitalize">
              <h3>Amount</h3>
            </Heading>

            <Image
              src={selectedToken?.icon}
              alt={`${selectedToken?.icon} icon`}
              width={20}
              height={20}
              className="mr-1"
            />
          </div>

          <Text className="text-sm">
            {transaction.tokenAmount.toPrecision(2)} {selectedToken?.symbol}
          </Text>
        </div>

        <div className="w-full flex items-start justify-between gap-1">
          <Heading asChild className="dark:text-zinc-400 capitalize">
            <h3>date</h3>
          </Heading>

          <Text className="text-sm">
            {dayjs(Date()).format('DD/MM/YYYY [at] HH:mm')}
          </Text>
        </div>

        <div className="w-full flex items-start justify-between gap-1">
          <Heading asChild className="dark:text-zinc-400 capitalize">
            <h3>proof</h3>
          </Heading>

          <Text
            asChild
            className="flex items-center gap-1 text-sm font-semibold transition-colors text-cyan-500 hover:text-cyan-600"
          >
            <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
              <Text>View proof</Text>

              <ArrowSquareOut
                className="w-3 h-3 md:hidden lg:inline"
                weight="bold"
              />
            </a>
          </Text>
        </div>
      </div>

      <div className="w-full px-4 pb-6 flex justify-center items-center sm:px-8">
        <DialogModal.Trigger>
          <Button className="w-full">Close</Button>
        </DialogModal.Trigger>
      </div>
    </div>
  )
}
