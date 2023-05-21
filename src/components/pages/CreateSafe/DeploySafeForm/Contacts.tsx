import clsx from 'clsx'
import { useState } from 'react'
import { Trash } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'

import { Text } from '@components/Text'
import { TextInput } from '@/components/Inputs/TextInput'

import type { FieldValues } from '@hooks/safes/create/useDeploySafeHook'

interface Props {
  index: number
  removeOwner: (index: number | number[]) => void
  contactsList: { contactName: string; contactAddress: string }[] | undefined
}

export function Contacts({ index, removeOwner, contactsList }: Props) {
  const [isContactsListOpen, setIsContactsListOpen] = useState(false)

  const {
    setValue,
    register,
    watch,
    formState: { errors }
  } = useFormContext<FieldValues>()

  const contactSearchName = watch(`owners.${index}.name`)

  const fieldNameError = errors?.owners && errors.owners[index]?.name
  const fieldAddressError = errors?.owners && errors.owners[index]?.address

  return (
    <div className="flex flex-wrap w-full gap-3">
      <div className="flex w-full flex-col flex-1 items-stretch justify-start gap-3 relative">
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
              onFocus={() => setIsContactsListOpen(true)}
              onBlur={() => {
                window.setTimeout(() => setIsContactsListOpen(false), 100)
              }}
            />
          </TextInput.Content>
        </TextInput.Root>

        {contactsList && (
          <div
            className={clsx(
              'py-2 border-1 rounded-lg border-zinc-200 dark:border-zinc-700',
              isContactsListOpen ? 'flex flex-col flex-1' : 'hidden'
            )}
          >
            {contactsList
              .filter(({ contactName }) =>
                contactName
                  .toLowerCase()
                  .startsWith(contactSearchName.toLowerCase())
              )
              .map(({ contactAddress, contactName }) => (
                <div
                  key={contactAddress}
                  className="flex flex-col p-2 gap-1 cursor-pointer hover:bg-slate-200/[.20] overflow-hidden"
                  onClick={() => {
                    setValue(`owners.${index}.name`, contactName)
                    setValue(`owners.${index}.address`, contactAddress)
                  }}
                >
                  <Text>{contactName}</Text>
                  <Text>{contactAddress}</Text>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 items-stretch justify-start gap-3 relative">
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
}
