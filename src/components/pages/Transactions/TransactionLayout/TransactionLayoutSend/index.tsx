import { ArrowDownRight, ArrowSquareOut, Copy } from '@phosphor-icons/react'
import { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'

import { handleCopyToClipboard } from '@utils/clipboard'

interface TransactionLayoutSendHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  txNonce: number
  amount: number
  token: {
    icon: string
    symbol: string
  }
  createdAt?: Date
}

function TransactionLayoutSendHeader({
  txNonce,
  createdAt,
  amount,
  token,
  children,
  className,
  ...props
}: TransactionLayoutSendHeaderProps) {
  return (
    <div
      className={clsx(
        'w-full flex items-stretch justify-between gap-4 font-medium capitalize md:items-center',
        className
      )}
      {...props}
    >
      <Text>{txNonce}</Text>

      <div className="max-w-5xl flex flex-1 flex-col items-stretch justify-between gap-2 md:items-center md:flex-row">
        <div className="flex items-center gap-2 lowercase">
          <ArrowDownRight className="w-4 h-4 text-red-500" />
          <Text>send</Text>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={token.icon}
            alt="chain to run safe transaction icon"
            width={24}
            height={24}
          />

          <Text className="uppercase">
            -{amount} {token.symbol}
          </Text>
        </div>

        {createdAt && (
          <Text className="w-min">{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
        )}
      </div>

      {children}
    </div>
  )
}

interface TransactionLayoutSendInfosProps
  extends HTMLAttributes<HTMLDivElement> {
  tokenSymbol: string
  address: string
  explorerLink: string
  formattedAddress: string
  amount: number
}

function TransactionLayoutSendInfos({
  tokenSymbol,
  address,
  formattedAddress,
  explorerLink,
  amount,
  ...props
}: TransactionLayoutSendInfosProps) {
  return (
    <div className="w-full flex flex-col gap-2" {...props}>
      <Heading className="text-xl font-medium">
        Send {amount} {tokenSymbol} to:
      </Heading>

      <div className="flex items-center justify-start gap-2">
        <div className="flex items-stretch justify-start gap-2">
          <Text>{formattedAddress}</Text>

          <div className="flex items-center justify-start gap-2">
            <button
              onClick={() => handleCopyToClipboard(address)}
              className="transition-colors hover:text-cyan-500"
            >
              <Copy className="w-4 h-4 " />
            </button>

            <Link
              href={explorerLink}
              target="_blank"
              className="transition-colors hover:text-cyan-500"
            >
              <ArrowSquareOut className="w-4 h-4 " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TransactionLayoutSend = {
  Header: TransactionLayoutSendHeader,
  Infos: TransactionLayoutSendInfos
}
