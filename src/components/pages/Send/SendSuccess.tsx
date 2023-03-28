import dayjs from 'dayjs'
import Image from 'next/image'
import { ArrowSquareOut, CheckCircle } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { HoverCard } from '@components/HoverCard'

import { handleCopyToClipboard } from '@utils/global'
import { useCustomSendHook } from '@hooks/send/useSend'
import { useSend } from '@/contexts/SendContext'

export interface SendSuccessProps {
  transactionUrl: string
}

export function SendSuccess({ transactionUrl }: SendSuccessProps) {
  const { t } = useCustomSendHook()
  const { transaction, selectedCoin: coin, resetSendMutation } = useSend()

  if (!transaction) return <></>

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <CheckCircle className="w-24 h-24 text-green-500" weight="bold" />

      <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 md:max-w-xs text-gray-800 dark:text-gray-100">
        <div className="w-full flex flex-col items-center gap-2">
          <Heading className="text-2xl gray-50 capitalize">
            $ {transaction.usdAmount} {t.send.sent}
          </Heading>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button
                onClick={() => handleCopyToClipboard(transaction.to)}
                className="text-sm"
              >
                {t.send.to} {transaction.formattedTo}
              </button>
            </HoverCard.Trigger>

            <HoverCard.Content variant="highlighted" className="text-sm">
              {t.send.copyAddress}
              <HoverCard.Arrow />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>

        <div className="w-full flex items-start justify-between gap-2 ">
          <div className="flex items-center gap-2">
            <Heading asChild className="dark:text-gray-400 capitalize">
              <h3>{t.send.amount}</h3>
            </Heading>

            <Image
              src={coin.avatar}
              alt={`${coin.avatar} icon`}
              width={20}
              height={20}
              className="mr-1"
            />
          </div>

          <Text className="text-sm">
            {transaction.formattedCoinAmount} {coin.symbol}
          </Text>
        </div>

        <div className="w-full flex items-start justify-between gap-1">
          <Heading asChild className="dark:text-gray-400 capitalize">
            <h3>{t.send.date}</h3>
          </Heading>

          <Text className="text-sm">
            {dayjs(Date()).format('DD/MM/YYYY [at] HH:mm')}
          </Text>
        </div>

        <div className="w-full flex items-start justify-between gap-1">
          <Heading asChild className="dark:text-gray-400 capitalize">
            <h3>{t.send.proof}</h3>
          </Heading>

          <Text
            asChild
            className="flex items-center gap-1 text-sm font-semibold transition-colors text-brand-foregroundAccent1 hover:text-brand-foregroundAccent2"
          >
            <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
              <Text>{t.send.viewProof}</Text>

              <ArrowSquareOut
                className="w-3 h-3 md:hidden lg:inline"
                weight="bold"
              />
            </a>
          </Text>
        </div>

        <DialogModal.Trigger>
          <Button className="mt-6" onClick={resetSendMutation}>
            {t.send.backToSend}
          </Button>
        </DialogModal.Trigger>
      </div>
    </div>
  )
}
