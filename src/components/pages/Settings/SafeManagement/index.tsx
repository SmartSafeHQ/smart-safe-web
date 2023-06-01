import { Trash } from '@phosphor-icons/react'
import { isMobile } from 'react-device-detect'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { AddOwnerModal } from './AddOwnerModal'
import { ChangeThresholdModal } from './ChangeThresholdModal'

import { useSafeManagement } from '@hooks/settings/useSafeManagement'
import { formatWalletAddress } from '@utils/web3'

export function SafeManagement() {
  const {
    safe,
    ownersCount,
    safeThreshold,
    richOwnersData,
    transactionNonce,
    setAddOwnerOpen,
    addOwnerMutation,
    isAddOwnerModalOpen,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    addOwnerMutationIsLoading,
    isCurrentConnectWalletAnOwner
  } = useSafeManagement()

  const isChangeThresholdModalReady =
    ownersCount !== undefined &&
    safeThreshold !== undefined &&
    safe?.address !== undefined &&
    transactionNonce !== undefined

  const isAddOwnerModalReady =
    safe?.address !== undefined &&
    transactionNonce !== undefined &&
    ownersCount !== undefined

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex gap-4 lg:gap-28 flex-col lg:flex-row p-4 rounded-md shadow-md">
        <Heading className="flex-2 w-[200px] text-lg">Manage owners</Heading>

        <div className="flex flex-col gap-2 flex-1">
          <p>Add or remove owners from this safe.</p>

          <div className="flex flex-col">
            <p className="dark:text-zinc-500 text-zinc-800 px-2 font-bold py-4">
              Name
            </p>

            <div className="flex gap-2 flex-col">
              <div>
                {richOwnersData.map(({ address, name }) => (
                  <div
                    key={address}
                    className="flex flex-col hover:bg-cyan-200/[.2] hover:dark:bg-cyan-800/[.4] p-2 border-t-1 last:rounded-b-md dark:border-zinc-600"
                  >
                    <Heading>{name}</Heading>

                    <div className="flex justify-between items-center gap-4">
                      <p>
                        {isMobile
                          ? formatWalletAddress({ walletAddress: address })
                          : address}
                      </p>

                      <div className="p-1 hover:bg-slate-400/[.2] rounded-full cursor-pointer">
                        <Trash size={16} className="fill-red-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-max text-white"
                onClick={() => setAddOwnerOpen(true)}
                disabled={!isCurrentConnectWalletAnOwner}
              >
                + Add owner
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-2 flex-col lg:flex-row lg:gap-28 p-4 rounded-md shadow-md">
        <Heading className="w-[200px] text-lg">Required confirmations</Heading>

        <div className="flex flex-col gap-2 flex-1">
          <p>Any transaction requires the confirmation of:</p>

          <p>
            <span className="font-bold">{safeThreshold}</span> out of{' '}
            <span className="font-bold">{ownersCount}</span> owners.
          </p>

          <Button
            className="w-min text-white"
            disabled={!isCurrentConnectWalletAnOwner}
            onClick={() => setIsChangeThresholdOpen(true)}
          >
            Change
          </Button>
        </div>
      </div>

      {isChangeThresholdModalReady && (
        <ChangeThresholdModal
          ownersCount={ownersCount}
          safeAddress={safe.address}
          safeThreshold={safeThreshold}
          transactionNonce={transactionNonce}
          isOpen={isChangeThresholdModalOpen}
          onOpenChange={setIsChangeThresholdOpen}
        />
      )}

      {isAddOwnerModalReady && (
        <AddOwnerModal
          owners={richOwnersData}
          ownersCount={ownersCount}
          isOpen={isAddOwnerModalOpen}
          onOpenChange={setAddOwnerOpen}
          currentSafeOwnerId={safe.ownerId}
          transactionNonce={transactionNonce}
          isLoading={addOwnerMutationIsLoading}
          addOwnerMutation={addOwnerMutation}
        />
      )}
    </div>
  )
}
