import { ethers } from 'ethers'
import { User, Wallet } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useConnectWallet } from '@web3-onboard/react'
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
  const [{ wallet }] = useConnectWallet()
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
    if (!safe || !wallet) return

    try {
      await createContactMutation({
        address: data.address,
        name: data.name,
        ownerAddress: wallet.accounts[0].address,
        ownerId: safe.ownerId
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
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Create contact
          </DialogModal.Title>
        </DialogModal.Header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-stretch"
        >
          <div className="w-full flex flex-col justify-center items-stretch gap-6 py-8 px-4 sm:px-8">
            <TextInput.Root htmlFor="name" error={errors.name?.message}>
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

            <TextInput.Root htmlFor="address" error={errors.address?.message}>
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
          </div>

          <DialogModal.Footer>
            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Create contact
            </Button>
          </DialogModal.Footer>
        </form>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
