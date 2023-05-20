import { TransactionLayout } from '@components/pages/Transactions/TransactionLayout'
import { Collapsible } from '@components/Collapsible'
import { Text } from '@components/Text'

import {
  OwnerApproveStatus,
  TransactionType
} from '@hooks/transactions/useTransactionsQueue'

interface ToApproveTransactionProps {
  nonce: number
  type: TransactionType
  amount: number
  createdAt: Date
  signatures: { status: OwnerApproveStatus; address: string }[]
  toAddress: string
  toFormattedAddress: string
  txHash: string
  token: {
    symbol: string
    icon: string
  }
}

export function ToApproveTransaction({
  nonce,
  type,
  amount,
  createdAt,
  signatures,
  toAddress,
  toFormattedAddress,
  txHash,
  token
}: ToApproveTransactionProps) {
  return (
    <TransactionLayout.Root asChild>
      <main>
        <TransactionLayout.SendHeader
          txNonce={nonce}
          type={type}
          createdAt={createdAt}
          token={{
            amount,
            icon: token.icon,
            symbol: token.symbol
          }}
        >
          <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
            Approves {signatures.length}/3
          </Text>
        </TransactionLayout.SendHeader>

        <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
          <div className="w-full flex flex-col items-stretch justify-start">
            <Collapsible.Root
              defaultOpen={false}
              className="w-full flex flex-col px-6 py-3 border-b-1 border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex flex-col items-stretch justify-between gap-3 w-full text-left overflow-hidden sm:flex-row">
                <TransactionLayout.ApproveStatus
                  status="waiting"
                  signatures={signatures.length}
                  requiredSignatures={3}
                />

                <Collapsible.Trigger className="h-min text-xs text-start text-cyan-500 transition-colors hover:text-cyan-600">
                  Show all owners
                </Collapsible.Trigger>
              </div>

              <Collapsible.Content className="w-full flex flex-col items-start justify-start">
                {signatures.map(owner => (
                  <TransactionLayout.OwnerStatus
                    key={owner.address}
                    status={owner.status}
                    address={owner.address}
                  />
                ))}
              </Collapsible.Content>
            </Collapsible.Root>

            <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3 md:max-w-sm">
              <TransactionLayout.SendToInfos
                tokenSymbol={token.symbol}
                address={toAddress}
                explorerLink={'http'}
                formattedAddress={toFormattedAddress}
                amount={amount}
              />

              <TransactionLayout.Infos txHash={txHash} createdAt={createdAt} />
            </div>
          </div>

          <TransactionLayout.Actions />
        </div>
      </main>
    </TransactionLayout.Root>
  )
}
