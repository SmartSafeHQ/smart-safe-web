import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { WithdrawalTable } from '@components/pages/SmartAccount/withdrawalAuth/WithdrawalTable'
import { Text } from '@components/Text'

import { useSAWithdrawalAuthHook } from '@hooks/smartAccount/useSAWithdrawalAuthHook'

export function WithdrawalList() {
  const { t, withdrawals, isLoading, error, handleDeleteWithdrawal } =
    useSAWithdrawalAuthHook()

  return (
    <ScrollArea className="w-full max-w-full">
      {error ? (
        <ErrorState
          title={t.saWithdrawalAuth.authListError}
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-10"
        />
      ) : isLoading ? (
        <LoadingState
          title={t.saWithdrawalAuth.loadingAuth}
          className="mt-10"
        />
      ) : withdrawals && withdrawals.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-1 pt-8 text-center">
          <Text asChild className="text-lg font-medium">
            <strong>{t.saWithdrawalAuth.noItemsTitle}</strong>
          </Text>
        </div>
      ) : (
        withdrawals && (
          <>
            <table className="w-full">
              <thead className="bg-gray-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-gray-800">
                <tr className="uppercase text-gray-500 dark:text-gray-400">
                  <WithdrawalTable.Th className="pl-2 py-3 ">
                    {t.saWithdrawalAuth.recipient}
                  </WithdrawalTable.Th>

                  <WithdrawalTable.Th className="py-3 ">
                    {t.saWithdrawalAuth.withdrawalAllowed}
                  </WithdrawalTable.Th>

                  <WithdrawalTable.Th className="py-3 ">
                    {t.saWithdrawalAuth.from}
                  </WithdrawalTable.Th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {withdrawals.map((withdrawal, i) => (
                  <WithdrawalTable.Tr
                    key={`${i}-${withdrawal.wallet}`}
                    withdrawal={withdrawal}
                    handleDeleteWithdrawal={handleDeleteWithdrawal}
                  />
                ))}
              </tbody>
            </table>
          </>
        )
      )}
    </ScrollArea>
  )
}
