import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { AddOwnerModal } from './AddOwnerModal'
import { Text } from '@components/Text'
import { ChangeThresholdModal } from './ChangeThresholdModal'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { ErrorState } from '@components/FetchingStates/ErrorState'

import { useSafeManagementHook } from '@hooks/settings/useSafeManagement'

export function SafeManagement() {
  const {
    ownersCount,
    safeThreshold,
    ownersData,
    safeOwnersError,
    setIsChangeThresholdOpen,
    setIsAddOwnerOpen
  } = useSafeManagementHook()

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

          <div className="max-w-lg flex flex-1 flex-col items-stretch gap-2">
            {safeOwnersError ? (
              <ErrorState title="Unable to load safe owners, please try again" />
            ) : (
              <div className="flex flex-col gap-2">
                <Text asChild className="mb-2 text-sm font-semibold">
                  <strong>Wallet</strong>
                </Text>

                <Skeleton
                  isLoading={!ownersData}
                  totalOfLines={3}
                  className="w-full h-36"
                >
                  {ownersData &&
                    ownersData.map(({ address, formattedAddress, name }) => (
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
                </Skeleton>

                <Button
                  className="w-max mt-2"
                  onClick={() => setIsAddOwnerOpen(true)}
                  disabled={!ownersData}
                >
                  + Add owner
                </Button>
              </div>
            )}
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

          {safeOwnersError ? (
            <Text
              asChild
              className="text-sm font-medium text-zinc-800 dark:text-zinc-400"
            >
              <strong>Unable to load threshold owners, please try again</strong>
            </Text>
          ) : (
            <div className="flex flex-col items-stretch gap-4">
              <Skeleton
                isLoading={!safeThreshold || !ownersCount}
                className="w-full max-w-[8.5rem] h-6"
              >
                <Text asChild>
                  <p>
                    <Text className="font-bold">{safeThreshold}</Text> out of{' '}
                    <Text className="font-bold">{ownersCount}</Text> owners.
                  </p>
                </Text>
              </Skeleton>

              <Button
                className="w-max"
                disabled={!safeThreshold || !ownersCount}
                onClick={() => setIsChangeThresholdOpen(true)}
              >
                Change
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddOwnerModal />

      <ChangeThresholdModal />
    </div>
  )
}
