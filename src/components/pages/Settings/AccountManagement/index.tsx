import { Button } from '@components/Button'
import { Heading } from '@components/Heading'

import { useAccountManagementHook } from '@hooks/smartAccount/useAccountManagementHook'

export function AccountManagement() {
  const {
    safe,
    ownersCount,
    safeThreshold,
    richOwnersData,
    changeThreshold,
    transactionNonce,
    isCurrentConnectWalletAnOwner
  } = useAccountManagementHook()

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex gap-4 lg:gap-36 flex-col lg:flex-row border-1 p-2 rounded-md dark:border-zinc-600">
        <Heading className="w-[180px]">Manage owners</Heading>

        <div className="flex flex-col">
          <p>Add and remove owners from this safe.</p>

          <div className="flex flex-col gap-2">
            {richOwnersData.map(({ address, name }) => (
              <div
                key={address}
                className="flex flex-col gap-1 hover:bg-cyan-800/[.5] p-2"
              >
                <Heading>{name}</Heading>

                <p>{address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-col lg:flex-row lg:gap-36 border-1 p-2 rounded-md dark:border-zinc-600">
        <Heading className="w-[180px]">Required confirmations</Heading>

        <div className="flex flex-col gap-2">
          <p>Any transaction requires the confirmation of:</p>

          <p>
            <span className="font-bold">{safeThreshold}</span> out of{' '}
            <span className="font-bold">{ownersCount}</span> owners.
          </p>

          <Button
            className="w-min"
            disabled={!isCurrentConnectWalletAnOwner}
            onClick={() =>
              changeThreshold({
                newThreshold: 1,
                safeAddress: safe?.address || '',
                transactionNonce: transactionNonce ?? 0
              })
            }
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  )
}
