import { ethers } from 'ethers'
import { User, Wallet } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { useSafe } from '@contexts/SafeContext'

import { useCreateContact } from '@hooks/contacts/mutations/useCreateContact'
import {
  CONTACT_NAME_REGEX,
  useContactsHook
} from '@hooks/contacts/useContactsHook'

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'name required')
    .regex(
      CONTACT_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  address: z.string().refine(address => {
    const isAddressValid = ethers.isAddress(address)

    return isAddressValid
  }, 'Invalid contact address')
})

export type FieldValues = z.infer<typeof validationSchema>

export function CreateContactModal() {
  const { isCreateContactOpen, setIsCreateContactOpen } = useContactsHook()
  const { mutateAsync: createContactMutation } = useCreateContact()
  const { safe } = useSafe()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      await createContactMutation({
        contactAddress: data.address,
        contactName: data.name,
        creatorId: safe?.ownerId!
      })

      reset()
      setIsCreateContactOpen(false)
    } catch (error) {
      console.log(error)

      const errorMessage = (error as Error)?.message

      toast.error(errorMessage)
    }
  }

  return (
    <DialogModal.Root
      open={isCreateContactOpen}
      onOpenChange={isOpen => {
        setIsCreateContactOpen(isOpen)
        reset()
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-zinc-800 dark:text-zinc-50">
              Create contact
            </DialogModal.Title>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-stretch w-full"
          >
            <TextInput.Root
              htmlFor="name"
              variant="secondary"
              error={errors.name?.message}
            >
              <TextInput.Label>Name</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <User />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('name')}
                  required
                  id="name"
                  placeholder="Enter the contact name"
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root
              htmlFor="address"
              variant="secondary"
              error={errors.address?.message}
            >
              <TextInput.Label>Wallet address</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Wallet />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('address')}
                  required
                  id="address"
                  placeholder="Enter the wallet address"
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Create contact
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
