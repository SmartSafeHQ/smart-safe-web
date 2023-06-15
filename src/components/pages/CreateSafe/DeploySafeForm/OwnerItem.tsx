import { Trash } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'

import { TextInput } from '@components/Inputs/TextInput'
import { ContactsTextInput } from '@components/Inputs/ContactsTextInput'

import type { FieldValues } from '@hooks/createSafe/deploySafeValidationSchema'
import { ContactProps } from '@contexts/ContactsContext'

interface OwnerItemProps {
  index: number
  removeOwner: (index: number | number[]) => void
}

export function OwnerItem({ index, removeOwner }: OwnerItemProps) {
  const {
    setValue,
    register,
    watch,
    formState: { errors }
  } = useFormContext<FieldValues>()

  const contactSearch = watch(`owners.${index}.name`)

  const fieldNameError = errors?.owners && errors.owners[index]?.name
  const fieldAddressError = errors?.owners && errors.owners[index]?.address

  return (
    <div className="flex flex-wrap w-full gap-3">
      <div className="flex w-full flex-col flex-1 items-stretch justify-start gap-3 relative">
        <ContactsTextInput.Root
          search={contactSearch}
          handleSelectContact={(contact: ContactProps) => {
            setValue(`owners.${index}.name`, contact.name)
            setValue(`owners.${index}.address`, contact.address)
          }}
        >
          <ContactsTextInput.Input
            {...register(`owners.${index}.name`)}
            required
            id={`ownerName-${index}`}
            label="Owner name"
            error={fieldNameError?.message}
            placeholder="Example name"
          />
        </ContactsTextInput.Root>
      </div>

      <div className="flex flex-1 items-stretch justify-start gap-3 pr-7 relative">
        <TextInput.Root
          htmlFor={`ownerWallet-${index}`}
          className="flex flex-1"
          error={fieldAddressError?.message}
        >
          <TextInput.Label>Owner address</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register(`owners.${index}.address`)}
              required
              id={`ownerWallet-${index}`}
              placeholder="Enter owner wallet address"
            />
          </TextInput.Content>
        </TextInput.Root>

        {index > 0 && (
          <button
            onClick={() => removeOwner(index)}
            className="absolute top-[2.4rem] right-0 text-zinc-600 dark:text-zinc-400 transition-colors hover:!text-red-500"
          >
            <Trash className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
