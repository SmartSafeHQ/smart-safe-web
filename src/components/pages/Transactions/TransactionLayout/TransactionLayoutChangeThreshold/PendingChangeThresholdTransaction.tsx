import { TransactionLayout } from '..'
import { TransactionLayoutChangeThreshold } from '.'
import { Text } from '@components/Text'
import { Collapsible } from '@components/Collapsible'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'
import { ThresholdTxProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

interface PendingChangeThresholdTransactionProps {
  transaction: ThresholdTxProps
}

export function PendingChangeThresholdTransaction({
  transaction
}: PendingChangeThresholdTransactionProps) {
  const { safe } = useTransactionsQueue()

  return (
    <>
      <Collapsible.Trigger>
        <TransactionLayoutChangeThreshold.Header
          txNonce={transaction.nonce}
          currentThreshold={safe?.threshold}
          newThreshold={transaction.newThreshold}
          createdAt={transaction.createdAt}
          className="min-h-[4rem] py-4 px-6"
        >
          <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
            pending
          </Text>
        </TransactionLayoutChangeThreshold.Header>
      </Collapsible.Trigger>

      <Collapsible.Content>
        {safe && (
          <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
            <div className="w-full flex flex-col items-stretch justify-start">
              <TransactionLayout.OwnersStatus
                signatures={transaction.signatures}
                threshold={safe.threshold}
                baseExplorerLink={`${safe.chain.explorerUrl}/address`}
              />

              <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3 md:max-w-sm">
                <TransactionLayoutChangeThreshold.Infos
                  currentThreshold={safe?.threshold}
                  newThreshold={transaction.newThreshold}
                />

                <TransactionLayout.TxInfos
                  txHash={transaction.hash}
                  createdAt={transaction.createdAt}
                />
              </div>
            </div>
          </div>
        )}
      </Collapsible.Content>
    </>
  )
}
