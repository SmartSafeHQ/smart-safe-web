import { ethers } from 'ethers'
import { User, Wallet } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useCreateContactMutation } from '@hooks/smartAccount/mutations/useCreateContactMutation'
import {
  CONTACT_NAME_REGEX,
  useSAContactsHook
} from '@hooks/smartAccount/useSAContactsHook'
import { getAxiosErrorMessageWithToast } from '@utils/global'

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'name required')
    .regex(
      CONTACT_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  address: z.string().refine(address => {
    const isAddressValid = ethers.utils.isAddress(address)

    return isAddressValid
  }, 'Invalid contact address')
})

export type FieldValues = z.infer<typeof validationSchema>

export function CreateContactModal() {
  const { customer, isCreateContactOpen, setIsCreateContactOpen } =
    useSAContactsHook()
  const { mutateAsync } = useCreateContactMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!customer) return

    try {
      await mutateAsync({ ...data, customerId: customer.id })

      reset()
      setIsCreateContactOpen(false)
    } catch (error) {
      console.log(error)

      getAxiosErrorMessageWithToast(error)
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
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
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
