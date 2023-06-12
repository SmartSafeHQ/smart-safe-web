import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { AutomationsTable } from '@components/pages/Automations/AutomationsTable'
import { Text } from '@components/Text'

import { useSpendingLimitsHook } from '@hooks/spendingLimits/useSpendingLimitsHook'

export function AutomationsList() {
  const { spendingLimits, isLoading, error, handleDeleteSpendingLimits } =
    useSpendingLimitsHook()

  return (
    <ScrollArea>
      {error ? (
        <ErrorState
          title="Could not load your automation. Please try again."
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-10"
        />
      ) : isLoading ? (
        <LoadingState title="Loading automations" className="mt-10" />
      ) : spendingLimits && spendingLimits.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-1 pt-8 text-center">
          <Text asChild className="text-lg font-medium">
            <strong>No automation added!</strong>
          </Text>
        </div>
      ) : (
        spendingLimits && (
          <>
            <table className="w-full">
              <thead className="bg-zinc-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-zinc-800">
                <tr className="uppercase text-zinc-500 dark:text-zinc-400">
                  <AutomationsTable.Th className="pl-2 py-3 ">
                    Wallet
                  </AutomationsTable.Th>

                  <AutomationsTable.Th className="py-3 ">
                    Payment amount
                  </AutomationsTable.Th>

                  <AutomationsTable.Th className="py-3 ">
                    Trigger
                  </AutomationsTable.Th>

                  <th />

                  <th />
                </tr>
              </thead>

              <tbody>
                {spendingLimits.map((spendingLimits, i) => (
                  <AutomationsTable.Tr
                    key={`${i}-${spendingLimits.wallet}`}
                    automation={spendingLimits}
                    handleDeleteAutomation={handleDeleteSpendingLimits}
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
