import { useEffect } from 'react'
import { User } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSafe } from '@contexts/SafeContext'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Text } from '@components/Text'

import { useEditContact } from '@hooks/contacts/mutations/useEditContact'
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
    )
})

export type FieldValues = z.infer<typeof validationSchema>

export function UpdateContactModal() {
  const { selectedContact, isUpdateContactOpen, setIsUpdateContactOpen } =
    useContactsHook()
  const { mutateAsync } = useEditContact()
  const { safe } = useSafe()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: selectedContact?.contactName
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!selectedContact) return

    try {
      await mutateAsync({
        creatorId: safe?.ownerId!,
        contactId: selectedContact.contactId,
        newData: {
          contactName: data.name
        }
      })

      reset()
      setIsUpdateContactOpen(false)
    } catch (error) {
      console.log(error)

      const errorMessage = (error as Error)?.message

      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    if (!selectedContact) return

    setValue('name', selectedContact.contactName)
  }, [selectedContact])

  return (
    <DialogModal.Root
      open={isUpdateContactOpen}
      onOpenChange={setIsUpdateContactOpen}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-zinc-800 dark:text-zinc-50">
              Update contact
            </DialogModal.Title>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-stretch w-full"
          >
            <Text className="capitalize text-zinc-600 dark:text-zinc-300">
              Contact address: {selectedContact?.formattedAddress}
            </Text>

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

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Update contact
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}