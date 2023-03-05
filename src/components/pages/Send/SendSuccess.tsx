import dayjs from 'dayjs'
import { ArrowSquareOut, CheckCircle } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { HoverCard } from '@components/HoverCard'

import { handleCopyToClipboard } from '@utils/global'
import { useSend } from '@hooks/send/useSend'

export interface SendSuccessProps {
  to: string
  formattedToWallet: string
  amountInUsd: number
  amountIncoin: number
  transactionUrl: string
  coinName: string
  coinAvatar: string
}

export function SendSuccess({
  transactionUrl,
  to,
  formattedToWallet,
  amountInUsd,
  amountIncoin,
  coinName,
  coinAvatar
}: SendSuccessProps) {
  const { t } = useSend()

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <CheckCircle className="w-24 h-24 text-green-500" weight="bold" />

      <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 md:max-w-xs text-gray-800 dark:text-gray-100">
        <div className="w-full flex flex-col items-center gap-2">
          <Heading className="text-2xl font-medium gray-50 capitalize">
            $ {amountInUsd.toFixed(2)} {t.send.sent}
          </Heading>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button
                onClick={() => handleCopyToClipboard(to)}
                className="text-sm"
              >
                {t.send.to} {formattedToWallet}
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

            <Avatar.Root fallbackName={coinName} className="w-5 h-5 mr-1">
              <Avatar.Image src={coinAvatar} alt={`${coinAvatar} icon`} />
            </Avatar.Root>
          </div>

          <Text className="text-sm">
            {amountIncoin.toFixed(4)} {coinName}
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
          <Button className="mt-6">{t.send.backToSend}</Button>
        </DialogModal.Trigger>
      </div>
    </div>
  )
}
