import { useConnectWallet } from '@web3-onboard/react'

import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { AssetsTable } from '@components/pages/Assets/AssetsTable'

import { useSafeTokens } from '@hooks/assets/queries/useSafeTokens'
import { useSafe } from '@/contexts/SafeContext'

export function AssetsList() {
  const [{ wallet }] = useConnectWallet()
  const { safe } = useSafe()
  const {
    data: assets,
    error,
    isLoading
  } = useSafeTokens(
    wallet?.accounts[0].address,
    safe?.chain.chainId,
    !!wallet?.accounts[0] && !!safe
  )

  return (
    <ScrollArea className="w-full max-w-full px-2">
      {error ? (
        <ErrorState
          title="Unable to load your assets, please try again"
          description={
            (error as Error)?.message ??
            'An unknown error occurred. Please try again later.'
          }
        />
      ) : isLoading ? (
        <LoadingState title="Loading your assets" />
      ) : (
        assets && (
          <>
            <table className="w-full">
              <thead className="bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-300 dark:border-zinc-700">
                <tr className="uppercase text-zinc-500 dark:text-zinc-400">
                  <AssetsTable.Th className="w-2/4 pl-2 py-3">
                    asset
                  </AssetsTable.Th>

                  <AssetsTable.Th className="py-3">balance</AssetsTable.Th>

                  <AssetsTable.Th className="py-3">value</AssetsTable.Th>
                </tr>
              </thead>

              <tbody>
                {assets.map(asset => (
                  <AssetsTable.Tr
                    key={asset.tokenSymbol}
                    tokenSymbol={asset.tokenSymbol}
                    tokenIcon={asset.tokenIcon}
                    balance={asset.balance}
                    valueInUsd={asset.valueInUsd}
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
