import {
  ArrowSquareOut,
  Copy,
  PlusCircle,
  UsersThree
} from '@phosphor-icons/react'
import { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { handleCopyToClipboard } from '@utils/clipboard'

interface TransactionLayoutAddOwnerHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  txNonce: number
  currentOwnersCount?: number
  newOwnersCount: number
  createdAt?: Date
}

function TransactionLayoutAddOwnerHeader({
  txNonce,
  createdAt,
  currentOwnersCount,
  newOwnersCount,
  children,
  className,
  ...props
}: TransactionLayoutAddOwnerHeaderProps) {
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
          <PlusCircle className="w-4 h-4 text-green-500" />
          <Text>Add Owner</Text>
        </div>

        <div className="flex items-center gap-2">
          <UsersThree className="w-5 h-5 text-zinc-500" />

          <Skeleton isLoading={!currentOwnersCount} className="w-20 h-6">
            {currentOwnersCount && (
              <Text className="lowercase">
                {currentOwnersCount} to {newOwnersCount}
              </Text>
            )}
          </Skeleton>
        </div>

        {createdAt && (
          <Text className="w-min">{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
        )}
      </div>

      {children}
    </div>
  )
}

interface TransactionLayoutAddOwnerInfosProps
  extends HTMLAttributes<HTMLDivElement> {
  ownerAddress: string
  explorerLink: string
  ownerFormattedAddress: string
}

function TransactionLayoutAddOwnerInfos({
  ownerAddress,
  ownerFormattedAddress,
  explorerLink,
  ...props
}: TransactionLayoutAddOwnerInfosProps) {
  return (
    <div className="w-full flex flex-col gap-2" {...props}>
      <Heading className="text-xl font-medium">Add owner:</Heading>

      <div className="flex items-center justify-start gap-2">
        <div className="flex items-stretch justify-start gap-2">
          <Text>{ownerFormattedAddress}</Text>

          <div className="flex items-center justify-start gap-2">
            <button
              onClick={() => handleCopyToClipboard(ownerAddress)}
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

export const TransactionLayoutAddOwner = {
  Header: TransactionLayoutAddOwnerHeader,
  Infos: TransactionLayoutAddOwnerInfos
}
