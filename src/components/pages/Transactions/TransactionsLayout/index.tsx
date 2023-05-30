import {
  ArrowSquareOut,
  Copy,
  CheckCircle,
  ArrowsCounterClockwise,
  XCircle
} from '@phosphor-icons/react'
import { HTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { useConnectWallet } from '@web3-onboard/react'
import Link from 'next/link'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { Collapsible } from '@components/Collapsible'

import { handleCopyToClipboard } from '@utils/clipboard'
import { formatWalletAddress } from '@utils/web3'
import { OwnerSignaturesProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

interface TransactionRootProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode
  asChild?: boolean
}

function TransactionRoot({
  children,
  asChild,
  className,
  ...props
}: TransactionRootProps) {
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

interface TransactionInfosProps extends HTMLAttributes<HTMLDivElement> {
  txHash: string
  createdAt: Date
}

function TransactionTxInfos({
  txHash,
  createdAt,
  ...props
}: TransactionInfosProps) {
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
          <Text className="text-sm">
            {formatWalletAddress({ walletAddress: txHash })}
          </Text>

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

interface TransactionOwnersStatusProps extends HTMLAttributes<HTMLDivElement> {
  signatures: OwnerSignaturesProps[]
  baseExplorerLink: string
  threshold: number
}

function TransactionOwnersStatus({
  signatures,
  baseExplorerLink,
  threshold,
  ...props
}: TransactionOwnersStatusProps) {
  const pendingSignatures = threshold - signatures.length

  return (
    <Collapsible.Root
      defaultOpen={false}
      className="w-full flex flex-col px-6 py-3 border-b-1 border-zinc-200 dark:border-zinc-700"
    >
      <div className="flex flex-col items-stretch justify-between gap-3 w-full text-left overflow-hidden sm:flex-row">
        <div className="flex items-center justify-start gap-3" {...props}>
          <div className="w-min mb-3 flex items-center justify-center p-2 rounded-full bg-yellow-500 dark:bg-yellow-600">
            <ArrowsCounterClockwise className="w-5 h-5 text-zinc-50" />
          </div>

          <div className="flex flex-col items-stretch justify-start">
            <Heading asChild className="text-lg font-medium">
              <h3>
                Transaction waiting approvals ({signatures.length}/{threshold})
              </h3>
            </Heading>

            <Text className="text-sm text-zinc-600 dark:text-zinc-500">
              {pendingSignatures} pending approval to execute
            </Text>
          </div>
        </div>

        <Collapsible.Trigger className="h-min text-xs text-start text-cyan-500 transition-colors hover:text-cyan-600">
          Show all owners
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className="w-full flex flex-col items-start justify-start">
        {signatures.map(signature => (
          <TransactionOwnerStatus
            key={signature.address}
            signature={signature}
            explorerLink={`${baseExplorerLink}/${signature.address}`}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

interface TransactionOwnerStatusProps {
  signature: OwnerSignaturesProps
  explorerLink: string
}

function TransactionOwnerStatus({
  signature,
  explorerLink,
  ...props
}: TransactionOwnerStatusProps) {
  const Icon = signature.status === 'approved' ? CheckCircle : XCircle

  return (
    <div className="flex items-center justify-start gap-1 mt-5" {...props}>
      <Icon
        className={clsx('w-6 h-6', {
          'text-green-600': signature.status === 'approved',
          'text-red-600': signature.status === 'rejected'
        })}
        weight="fill"
      />

      <div className="flex items-center justify-start gap-3 text-zinc-600 dark:text-zinc-400">
        <Text className="text-sm">{signature.formattedAddress}</Text>

        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => handleCopyToClipboard(signature.address)}
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
  )
}

interface TransactionActionsProps extends HTMLAttributes<HTMLDivElement> {
  isLoadingApprove: boolean
  isLoadingReject: boolean
  signatures: OwnerSignaturesProps[]
  handleApproveTransaction: () => void
  handleRejectTransaction: () => void
}

function TransactionActions({
  isLoadingApprove,
  isLoadingReject,
  signatures,
  handleApproveTransaction,
  handleRejectTransaction,
  ...props
}: TransactionActionsProps) {
  const [{ wallet }] = useConnectWallet()

  const checkOwnerAlreadySigned = signatures.find(
    signature => signature.address.toLowerCase() === wallet?.accounts[0].address
  )

  return (
    <div
      className="w-full flex justify-start items-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-900 border-t-1 border-zinc-200 dark:border-zinc-700"
      {...props}
    >
      <Button
        onClick={handleApproveTransaction}
        isLoading={isLoadingApprove}
        disabled={!!checkOwnerAlreadySigned || isLoadingReject}
        variant="green"
        className="w-full max-w-[11rem]"
      >
        Approve transaction
      </Button>

      <Button
        onClick={handleRejectTransaction}
        isLoading={isLoadingReject}
        disabled={!!checkOwnerAlreadySigned || isLoadingApprove}
        variant="red"
        className="w-full max-w-[10rem]"
      >
        Reject transaction
      </Button>
    </div>
  )
}

export const Transaction = {
  Root: TransactionRoot,
  OwnersStatus: TransactionOwnersStatus,
  TxInfos: TransactionTxInfos,
  Actions: TransactionActions
}
