import { TransactionLayout } from '../'
import { TransactionLayoutSend } from '.'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'
import { SendTxProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue'

interface ToApproveSendTransactionProps {
  transaction: SendTxProps
}

export function ToApproveSendTransaction({
  transaction
}: ToApproveSendTransactionProps) {
  const {
    safe,
    isLoadingApprove,
    handleApproveTransaction,
    isLoadingReject,
    handleRejectTransaction
  } = useTransactionsQueue()

  return (
    <>
      <TransactionLayoutSend.Header
        txNonce={transaction.nonce}
        createdAt={transaction.createdAt}
        amount={transaction.amount}
        token={transaction.token}
        className="min-h-[4rem] py-4 px-6"
      >
        <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
          Approves {transaction.signatures.length}/{safe?.threshold}
        </Text>
      </TransactionLayoutSend.Header>

      {safe && (
        <div className="w-full flex flex-col items-stretch justify-start border-t-1 border-zinc-200 dark:border-zinc-700">
          <div className="w-full flex flex-col items-stretch justify-start">
            <TransactionLayout.OwnersStatus
              signatures={transaction.signatures}
              threshold={safe.threshold}
              baseExplorerLink={`${safe.chain.explorerUrl}/address`}
            />

            <div className="w-full flex flex-col px-6 items-stretch justify-start py-4 gap-3 md:max-w-sm">
              <TransactionLayoutSend.Infos
                tokenSymbol={transaction.token.symbol}
                address={transaction.to}
                explorerLink={`${safe.chain.explorerUrl}/address/${transaction.to}`}
                formattedAddress={transaction.toFormattedAddress}
                amount={transaction.amount}
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
            handleApproveTransaction={handleApproveTransaction}
            handleRejectTransaction={handleRejectTransaction}
          />
        </div>
      )}
    </>
  )
}
