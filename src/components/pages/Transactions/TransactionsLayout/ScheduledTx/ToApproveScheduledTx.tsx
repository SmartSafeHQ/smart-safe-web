import { Transaction } from '..'
import { ScheduledTx } from '.'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'
import { ScheduledTxProps } from '@hooks/transactions/queries/useSafeTxQueue/interfaces'

interface ToApproveScheduledTxProps {
  transaction: ScheduledTxProps
}

export function ToApproveScheduledTx({
  transaction
}: ToApproveScheduledTxProps) {
  const {
    safe,
    transactionsQueue,
    isLoadingApprove,
    handleApproveTransaction,
    isLoadingReject,
    handleRejectTransaction
  } = useTransactionsQueue()

  return (
    <>
      <ScheduledTx.Header
        txNonce={transaction.nonce}
        triggerType={transaction.triggerType}
        triggerTitle={transaction.triggerTitle}
        amount={transaction.amount}
        createdAt={transaction.createdAt}
        token={transaction.token}
        className="min-h-[4rem] py-4 px-6"
      >
        <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
          Approves {transaction.signatures.approvesCount}/{safe?.threshold}
        </Text>
      </ScheduledTx.Header>

      {safe && (
        <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
          <Transaction.OwnersStatus
            signatures={transaction.signatures}
            threshold={safe.threshold}
            baseExplorerLink={`${safe.chain.explorerUrl}/address`}
          />

          <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3">
            <ScheduledTx.Infos
              tokenSymbol={transaction.token.symbol}
              address={transaction.to}
              explorerLink={`${safe.chain.explorerUrl}/address/${transaction.to}`}
              formattedAddress={transaction.formattedAddress}
              amount={transaction.amount}
            />

            <Transaction.TxInfos
              txHash={transaction.hash}
              createdAt={transaction.createdAt}
              className="md:max-w-xs"
            >
              <div className="w-full flex items-start justify-between gap-1">
                <Text
                  asChild
                  className="text-sm text-zinc-700 dark:text-zinc-400 font-medium capitalize"
                >
                  <strong>Trigger policy</strong>
                </Text>

                <Text className="text-sm">{transaction.triggerTitle}</Text>
              </div>
            </Transaction.TxInfos>
          </div>

          <Transaction.Actions
            isLoadingApprove={isLoadingApprove}
            isLoadingReject={isLoadingReject}
            signatures={transactionsQueue?.toApprove?.signatures.list ?? []}
            handleApproveTransaction={handleApproveTransaction}
            handleRejectTransaction={handleRejectTransaction}
          />
        </div>
      )}
    </>
  )
}
