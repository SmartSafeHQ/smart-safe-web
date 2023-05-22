import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { SpendingLimitsTable } from '@components/pages/SmartAccount/spendingLimitsAuth/SpendingLimitsTable'
import { Text } from '@components/Text'

import { useSpendingLimitsAuthHook } from '@/hooks/smartAccount/useSpendingLimitsAuthHook'

export function SpendingLimitsList() {
  const { spendingLimits, isLoading, error, handleDeleteSpendingLimits } =
    useSpendingLimitsAuthHook()

  return (
    <ScrollArea className="w-full max-w-full">
      {error ? (
        <ErrorState
          title="Could not load your spending limit authorizations. Please try again."
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-10"
        />
      ) : isLoading ? (
        <LoadingState title="Loading authorizations" className="mt-10" />
      ) : spendingLimits && spendingLimits.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-1 pt-8 text-center">
          <Text asChild className="text-lg font-medium">
            <strong>No spending limit authorizations added!</strong>
          </Text>
        </div>
      ) : (
        spendingLimits && (
          <>
            <table className="w-full">
              <thead className="bg-gray-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-gray-800">
                <tr className="uppercase text-gray-500 dark:text-gray-400">
                  <SpendingLimitsTable.Th className="pl-2 py-3 ">
                    Beneficiary
                  </SpendingLimitsTable.Th>

                  <SpendingLimitsTable.Th className="py-3 ">
                    Spending limit allowed
                  </SpendingLimitsTable.Th>

                  <SpendingLimitsTable.Th className="py-3 ">
                    From
                  </SpendingLimitsTable.Th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {spendingLimits.map((spendingLimits, i) => (
                  <SpendingLimitsTable.Tr
                    key={`${i}-${spendingLimits.wallet}`}
                    spendingLimits={spendingLimits}
                    handleDeleteSpendingLimits={handleDeleteSpendingLimits}
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
