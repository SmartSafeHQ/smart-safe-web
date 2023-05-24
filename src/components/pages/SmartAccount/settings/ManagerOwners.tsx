import { Button } from '@/components/Button'
import { Heading } from '@components/Heading'

import { useSafe } from '@contexts/SafeContext'
import { useGetOwners } from '@hooks/smartAccount/queries/useGetOwners'
import { useGetThreshold } from '@hooks/smartAccount/queries/useGetThreshold'

export function ManageOwner() {
  const { safe } = useSafe()
  const { data: safeThreshold } = useGetThreshold({
    safeAddress: safe?.address || ''
  })
  const { data: safeOwners } = useGetOwners({
    safeAddress: safe?.address || ''
  })

  return (
    <div className="flex flex-col my-4 gap-4">
      <div className="flex flex-col gap-4">
        <Heading className="text-2xl">Manage Smart Safe owners</Heading>

        <p>Add, remove and replace or rename existing owners.</p>

        {safeOwners?.map(owner => (
          <div key={owner}>
            <p>{owner}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Heading className="text-2xl">Required confirmations</Heading>

        <p>
          Any transaction requires the confirmations of: {safeThreshold} out of{' '}
          {safeOwners?.length}
        </p>
      </div>

      <Button className="w-min">Change</Button>
    </div>
  )
}
