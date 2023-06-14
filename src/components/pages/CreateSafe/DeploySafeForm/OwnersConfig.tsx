import Link from 'next/link'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'
import { ArrowSquareOut, CaretDown, Plus } from '@phosphor-icons/react'

import { OwnerItem } from './OwnerItem'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { Collapsible } from '@components/Collapsible'
import { Text } from '@components/Text'
import { useSafe } from '@contexts/SafeContext'

import { FieldValues } from '@hooks/createSafe/deploySafeValidationSchema'

type OwnersConfigProps = {
  ownersFields: FieldArrayWithId<FieldValues, 'owners', 'id'>[]
  removeOwner: (index: number | number[]) => void
  addOwner: () => Promise<void>
}

const MULTI_SIGN_OWNERS_LINK =
  'https://ethereum.org/en/roadmap/account-abstraction/'

export function OwnersConfig({
  ownersFields,
  addOwner,
  removeOwner
}: OwnersConfigProps) {
  const { safe } = useSafe()
  const {
    formState: { errors }
  } = useFormContext<FieldValues>()
  const { data: contacts } = useContactsQuery(safe?.ownerId, !!safe)

  return (
    <Collapsible.Root
      defaultOpen={true}
      className="w-full p-3 rounded-md border-1 border-zinc-200 dark:border-zinc-700 ring-zinc-800 dark:ring-zinc-400 focus-within:ring-1"
    >
      <Collapsible.Trigger className="relative flex items-center justify-start gap-2 select-none outline-none text-base font-medium text-zinc-800 dark:text-zinc-400 cursor-pointer">
        <CaretDown className="w-4 h-4" />

        <Text asChild className="text-sm font-normal">
          <strong>Owner wallets to confirm a transaction</strong>
        </Text>
      </Collapsible.Trigger>

      <Collapsible.Content className="w-full flex flex-col items-stretch justify-start">
        <div className="flex flex-col items-stretch justify-start gap-4 pt-6">
          {ownersFields.map((owner, index) => (
            <div
              key={owner.id}
              className="w-full flex items-stretch justify-start gap-5"
            >
              <OwnerItem
                index={index}
                removeOwner={removeOwner}
                contacts={contacts ?? []}
              />
            </div>
          ))}

          {errors.owners?.message && (
            <Text className="text-sm text-red-500">
              {errors.owners.message}
            </Text>
          )}
        </div>

        <div className="w-full flex items-stretch justify-start pt-4">
          <button
            type="button"
            onClick={addOwner}
            className="flex items-center gap-2 py-2 px-3 text-sm text-cyan-500 rounded-md bg-transparent transition-colors hover:bg-cyan-300 hover:bg-opacity-20"
          >
            <Plus className="w-4 h-4" />
            Add owner
          </button>
        </div>

        <footer className="w-full mt-auto flex items-center justify-end">
          <Text
            asChild
            className="flex items-center gap-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
          >
            <Link href={MULTI_SIGN_OWNERS_LINK} target="_blank">
              Learn more about multi sign owners
              <ArrowSquareOut className="w-4 h-4 text-cyan-500" />
            </Link>
          </Text>
        </footer>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
