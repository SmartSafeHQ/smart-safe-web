import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { AddOwnerModal } from './AddOwnerModal'
import { Text } from '@components/Text'
import { ChangeThresholdModal } from './ChangeThresholdModal'

import { useSafeManagement } from '@hooks/settings/useSafeManagement'

export function SafeManagement() {
  const {
    safe,
    ownersCount,
    safeThreshold,
    ownersData,
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
      <div className="flex gap-4 flex-col p-4 rounded-md shadow-md lg:gap-28 lg:flex-row">
        <Heading className="w-full max-w-[12.5rem] font-medium">
          Manage owners
        </Heading>

        <div className="flex flex-col gap-6 flex-1">
          <Text
            asChild
            className="text-sm font-normal text-zinc-600 dark:text-zinc-400"
          >
            <strong>Add or remove owners from this safe</strong>
          </Text>

          <div className="flex flex-col">
            <Text asChild className="mb-4 text-sm font-semibold">
              <strong>Wallet</strong>
            </Text>

            <div className="flex gap-2 flex-col">
              <div>
                {ownersData.map(({ address, formattedAddress, name }) => (
                  <div
                    key={address}
                    className="flex flex-col gap-1 p-2 border-t-1 border-zinc-300 dark:border-zinc-700"
                  >
                    <Heading>{name}</Heading>

                    <Text className="block text-zinc-600 dark:text-zinc-400 lg:hidden">
                      {formattedAddress}
                    </Text>

                    <Text className="hidden text-zinc-600 dark:text-zinc-400 lg:block">
                      {address}
                    </Text>
                  </div>
                ))}
              </div>

              <Button
                className="w-max"
                onClick={() => setAddOwnerOpen(true)}
                disabled={!isCurrentConnectWalletAnOwner}
              >
                + Add owner
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-col p-4 rounded-md shadow-md lg:gap-28 lg:flex-row">
        <Heading className="w-full max-w-[12.5rem] font-medium">
          Required <br /> confirmations
        </Heading>

        <div className="flex flex-col gap-6 flex-1">
          <Text
            asChild
            className="text-sm font-normal text-zinc-600 dark:text-zinc-400"
          >
            <strong>Transaction requires the confirmation of:</strong>
          </Text>

          <div className="flex flex-col items-stretch gap-4">
            <Text asChild>
              <p>
                <Text className="font-bold">{safeThreshold}</Text> out of{' '}
                <Text className="font-bold">{ownersCount}</Text> owners.
              </p>
            </Text>

            <Button
              className="w-max"
              disabled={!isCurrentConnectWalletAnOwner}
              onClick={() => setIsChangeThresholdOpen(true)}
            >
              Change
            </Button>
          </div>
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
          owners={ownersData}
          threshold={safeThreshold ?? 1}
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
