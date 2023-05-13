import Link from 'next/link'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'
import { ArrowSquareOut, CaretDown, Plus, Trash } from '@phosphor-icons/react'

import { TextInput } from '@components/Inputs/TextInput'
import { Collapsible } from '@components/Collapsible'
import { Text } from '@components/Text'

import { FieldValues } from '@hooks/safes/create/useDeploySafeHook'

type OwnersConfigProps = {
  ownersFields: FieldArrayWithId<FieldValues, 'owners', 'id'>[]
  removeOwner: (index: number | number[]) => void
  addNewOwner: () => Promise<void>
}

const MULTI_SIGN_OWNERS_LINK =
  'https://ethereum.org/en/roadmap/account-abstraction/'

export function OwnersConfig({
  ownersFields,
  addNewOwner,
  removeOwner
}: OwnersConfigProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext<FieldValues>()

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
          {ownersFields.map((owner, index) => {
            const fieldNameError = errors?.owners && errors.owners[index]?.name
            const fieldAddressError =
              errors?.owners && errors.owners[index]?.address

            return (
              <div
                key={owner.id}
                className="w-full flex items-stretch justify-start gap-5"
              >
                <TextInput.Root
                  htmlFor="name"
                  className="flex flex-1"
                  error={fieldNameError?.message}
                >
                  <TextInput.Label>Owner name</TextInput.Label>

                  <TextInput.Content>
                    <TextInput.Input
                      {...register(`owners.${index}.name`)}
                      required
                      id="name"
                      placeholder="Example name"
                    />
                  </TextInput.Content>
                </TextInput.Root>

                <div className="flex flex-1 items-stretch justify-start gap-3 pr-7 relative">
                  <TextInput.Root
                    htmlFor="ownerWallet"
                    className="flex flex-1"
                    error={fieldAddressError?.message}
                  >
                    <TextInput.Label>Owner address</TextInput.Label>

                    <TextInput.Content>
                      <TextInput.Input
                        {...register(`owners.${index}.address`)}
                        required
                        id="ownerWallet"
                        placeholder="Enter owner wallet address"
                      />
                    </TextInput.Content>
                  </TextInput.Root>

                  {index > 0 && (
                    <button
                      onClick={() => removeOwner(index)}
                      className="absolute top-[2.4rem] right-0 text-zinc-600 dark:text-zinc-400 transition-colors hover:!text-red-500"
                    >
                      <Trash className="w-5 h-5  " />
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {errors.owners?.message && (
            <Text className="text-sm text-red-500">
              {errors.owners.message}
            </Text>
          )}
        </div>

        <div className="w-full flex items-stretch justify-start pt-4">
          <button
            type="button"
            onClick={addNewOwner}
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
