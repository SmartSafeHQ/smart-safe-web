import {
  ArrowDownRight,
  ArrowSquareOut,
  Copy,
  CheckCircle,
  ArrowsCounterClockwise,
  XCircle
} from '@phosphor-icons/react'
import { HTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import dayjs from 'dayjs'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Button } from '@components/Button'

import { handleCopyToClipboard } from '@utils/clipboard'
import {
  OwnerApproveStatus,
  TransactionStatus
} from '@hooks/transactions/useTransactionsQueue'

interface TransactionLayoutRootProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode
  asChild?: boolean
}

function TransactionLayoutRoot({
  children,
  asChild,
  className,
  ...props
}: TransactionLayoutRootProps) {
  const Comp = asChild ? Slot : 'li'

  return (
    <Comp
      className={clsx(
        'flex flex-1 flex-col items-stretch justify-start relative rounded-md border-1 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

TransactionLayoutRoot.displayName = 'TransactionLayout.Root'

interface TransactionLayoutSendHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  txNonce: number
  type: 'SEND'
  createdAt: Date
  token: {
    icon: string
    symbol: string
    amount: number
  }
}

function TransactionLayoutSendHeader({
  txNonce,
  type,
  createdAt,
  token,
  children,
  ...props
}: TransactionLayoutSendHeaderProps) {
  return (
    <div
      className="w-full min-h-[4rem] flex items-stretch justify-between gap-4 py-4 px-6 font-medium capitalize md:items-center"
      {...props}
    >
      <Text>{txNonce}</Text>

      <div className="max-w-5xl flex flex-1 flex-col items-stretch justify-between gap-2 md:items-center md:flex-row">
        <div className="flex items-center gap-2 lowercase">
          <ArrowDownRight className="w-4 h-4 text-red-500" />
          <Text>{type}</Text>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={token.icon}
            alt="chain to run safe transaction icon"
            width={24}
            height={24}
          />

          <Text className="uppercase">
            -{token.amount} {token.symbol}
          </Text>
        </div>

        <Text>{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
      </div>

      {children}
    </div>
  )
}

TransactionLayoutSendHeader.displayName = 'TransactionLayout.SendHeader'

interface TransactionLayoutInfosProps extends HTMLAttributes<HTMLDivElement> {
  txHash: string
  formattedTxHash: string
  createdAt: Date
}

function TransactionLayoutInfos({
  txHash,
  formattedTxHash,
  createdAt,
  ...props
}: TransactionLayoutInfosProps) {
  return (
    <div className="flex flex-col items-stretch justify-start gap-2" {...props}>
      <div className="w-full flex items-start justify-between gap-1">
        <Text
          asChild
          className="text-sm text-zinc-700 dark:text-zinc-400 font-medium capitalize"
        >
          <strong>transaction hash</strong>
        </Text>

        <div className="flex items-center gap-2">
          <Text className="text-sm">{formattedTxHash}</Text>

          <button
            onClick={() => handleCopyToClipboard(txHash)}
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

        <Text className="text-sm">
          {dayjs(createdAt).format('DD/MM/YYYY [at] HH:mm')}
        </Text>
      </div>
    </div>
  )
}

TransactionLayoutInfos.displayName = 'TransactionLayout.Infos'

interface TransactionLayoutSendToInfosProps
  extends HTMLAttributes<HTMLDivElement> {
  tokenSymbol: string
  address: string
  explorerLink: string
  formattedAddress: string
  amount: number
}

function TransactionLayoutSendToInfos({
  tokenSymbol,
  address,
  formattedAddress,
  explorerLink,
  amount,
  ...props
}: TransactionLayoutSendToInfosProps) {
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

TransactionLayoutSendToInfos.displayName = 'TransactionLayout.SendToInfos'

interface TransactionLayoutApproveStatusProps
  extends HTMLAttributes<HTMLDivElement> {
  status: TransactionStatus
  signatures: number
  requiredSignatures: number
}

function TransactionLayoutApproveStatus({
  status,
  signatures,
  requiredSignatures,
  ...props
}: TransactionLayoutApproveStatusProps) {
  const pendingSignatures = requiredSignatures - signatures

  const Icon = status === 'waiting' ? ArrowsCounterClockwise : CheckCircle

  return (
    <div className="flex items-center justify-start gap-3" {...props}>
      <div
        className={clsx(
          'w-min mb-3 flex items-center justify-center p-2 rounded-full',
          {
            'bg-yellow-600': status === 'waiting',
            'bg-greee-500': status === 'ready'
          }
        )}
      >
        <Icon className="w-5 h-5 text-zinc-50" />
      </div>

      <div className="flex flex-col items-stretch justify-start">
        <Heading asChild className="text-lg font-medium">
          <h3>
            Transaction waiting approves ({signatures}/{requiredSignatures})
          </h3>
        </Heading>

        <Text className="text-sm text-zinc-600 dark:text-zinc-500">
          {pendingSignatures} pending approval to execute
        </Text>
      </div>
    </div>
  )
}

TransactionLayoutApproveStatus.displayName = 'TransactionLayout.ApproveStatus'

interface TransactionLayoutOwnerStatusProps
  extends HTMLAttributes<HTMLDivElement> {
  status: OwnerApproveStatus
  address: string
}

function TransactionLayoutOwnerStatus({
  status,
  address,
  ...props
}: TransactionLayoutOwnerStatusProps) {
  const Icon = status === 'approved' ? CheckCircle : XCircle

  return (
    <div className="flex items-center justify-start gap-1 mt-5" {...props}>
      <Icon
        className={clsx('w-6 h-6', {
          'text-green-600': status === 'approved',
          'text-red-600': status === 'rejected'
        })}
        weight="fill"
      />

      <Text className="text-sm text-zinc-600 dark:text-zinc-400">
        {address}
      </Text>
    </div>
  )
}

TransactionLayoutOwnerStatus.displayName = 'TransactionLayout.OwnerStatus'

interface TransactionLayoutActionsProps
  extends HTMLAttributes<HTMLDivElement> {}

function TransactionLayoutActions({ ...props }: TransactionLayoutActionsProps) {
  return (
    <div
      className="w-full flex justify-start items-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-900 border-t-1 border-zinc-200 dark:border-zinc-700"
      {...props}
    >
      <Button className="w-max" variant="green">
        Approve transaction
      </Button>

      <Button className="w-max" variant="red">
        Reject transaction
      </Button>
    </div>
  )
}

TransactionLayoutActions.displayName = 'TransactionLayout.Actions'

export const TransactionLayout = {
  Root: TransactionLayoutRoot,
  SendHeader: TransactionLayoutSendHeader,
  Infos: TransactionLayoutInfos,
  SendToInfos: TransactionLayoutSendToInfos,
  ApproveStatus: TransactionLayoutApproveStatus,
  OwnerStatus: TransactionLayoutOwnerStatus,
  Actions: TransactionLayoutActions
}