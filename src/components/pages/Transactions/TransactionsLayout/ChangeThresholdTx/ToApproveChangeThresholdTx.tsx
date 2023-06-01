import { Transaction } from '..'
import { ChangeThresholdTx } from '.'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'
import { ThresholdTxProps } from '@hooks/safe/queries/useSafeTxQueue/interfaces'

interface ToApproveChangeThresholdTxProps {
  transaction: ThresholdTxProps
}

export function ToApproveChangeThresholdTx({
  transaction
}: ToApproveChangeThresholdTxProps) {
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
      <ChangeThresholdTx.Header
        txNonce={transaction.nonce}
        currentThreshold={safe?.threshold}
        newThreshold={transaction.newThreshold}
        createdAt={transaction.createdAt}
        className="min-h-[4rem] py-4 px-6"
      >
        <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
          Approves {transaction.signatures.length}/{safe?.threshold}
        </Text>
      </ChangeThresholdTx.Header>

      {safe && (
        <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
          <div className="w-full flex flex-col items-stretch justify-start">
            <Transaction.OwnersStatus
              signatures={transaction.signatures}
              threshold={safe.threshold}
              baseExplorerLink={`${safe.chain.explorerUrl}/address`}
            />

            <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3 md:max-w-sm">
              <ChangeThresholdTx.Infos
                currentThreshold={safe?.threshold}
                newThreshold={transaction.newThreshold}
              />

              <Transaction.TxInfos
                txHash={transaction.hash}
                createdAt={transaction.createdAt}
              />
            </div>
          </div>

          <Transaction.Actions
            isLoadingApprove={isLoadingApprove}
            isLoadingReject={isLoadingReject}
            signatures={transactionsQueue?.toApprove?.signatures ?? []}
            handleApproveTransaction={handleApproveTransaction}
            handleRejectTransaction={handleRejectTransaction}
          />
        </div>
      )}
    </>
  )
}
