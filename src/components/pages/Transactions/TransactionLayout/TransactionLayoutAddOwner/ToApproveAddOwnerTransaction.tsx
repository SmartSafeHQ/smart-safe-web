import { TransactionLayout } from '..'
import { TransactionLayoutAddOwner } from '.'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'
import { ChangeOwnersTxProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'
import { useGetOwnersCount } from '@hooks/transactions/queries/useGetOwnersCount'

interface ToApproveAddOwnerTransactionProps {
  transaction: ChangeOwnersTxProps
}

export function ToApproveAddOwnerTransaction({
  transaction
}: ToApproveAddOwnerTransactionProps) {
  const {
    safe,
    transactionsQueue,
    isLoadingApprove,
    handleApproveTransaction,
    isLoadingReject,
    handleRejectTransaction
  } = useTransactionsQueue()
  const { data: ownersCount } = useGetOwnersCount(safe?.address, !!safe)

  return (
    <>
      <TransactionLayoutAddOwner.Header
        txNonce={transaction.nonce}
        currentOwnersCount={ownersCount}
        newOwnersCount={(ownersCount ?? 0) + 1}
        createdAt={transaction.createdAt}
        className="min-h-[4rem] py-4 px-6"
      >
        <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
          Approves {transaction.signatures.length}/{safe?.threshold}
        </Text>
      </TransactionLayoutAddOwner.Header>

      {safe && (
        <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
          <div className="w-full flex flex-col items-stretch justify-start">
            <TransactionLayout.OwnersStatus
              signatures={transaction.signatures}
              threshold={safe.threshold}
              baseExplorerLink={`${safe.chain.explorerUrl}/address`}
            />

            <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3 md:max-w-sm">
              <TransactionLayoutAddOwner.Infos
                ownerAddress={transaction.ownerAddress}
                explorerLink={`${safe.chain.explorerUrl}/address/${transaction.ownerAddress}`}
                ownerFormattedAddress={transaction.formattedAddress}
              />

              <TransactionLayout.TxInfos
                txHash={transaction.hash}
                createdAt={transaction.createdAt}
              />
            </div>
          </div>

          <TransactionLayout.Actions
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
