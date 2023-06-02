import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ChainlinkAutomationTable } from '@components/pages/ChainlinkAutomation/ChainlinkAutomationTable'
import { Text } from '@components/Text'

import { useSpendingLimitsHook } from '@hooks/spendingLimits/useSpendingLimitsHook'

export function ChainlinkAutomationList() {
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
                  <ChainlinkAutomationTable.Th className="pl-2 py-3 ">
                    Wallet
                  </ChainlinkAutomationTable.Th>

                  <ChainlinkAutomationTable.Th className="py-3 ">
                    Spending limit allowed
                  </ChainlinkAutomationTable.Th>

                  <ChainlinkAutomationTable.Th className="py-3 ">
                    From
                  </ChainlinkAutomationTable.Th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {spendingLimits.map((spendingLimits, i) => (
                  <ChainlinkAutomationTable.Tr
                    key={`${i}-${spendingLimits.wallet}`}
                    chainlinkAutomation={spendingLimits}
                    handleDeleteChainlinkAutomation={handleDeleteSpendingLimits}
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
