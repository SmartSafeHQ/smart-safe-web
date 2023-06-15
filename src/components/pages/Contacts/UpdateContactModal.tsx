import { useEffect } from 'react'
import { User } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Text } from '@components/Text'

import {
  CONTACT_NAME_REGEX,
  useContactsHook
} from '@hooks/contacts/useContactsHook'
import { useUpdateContact } from '@hooks/contacts/mutations/useUpdateContact'

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
  const { mutateAsync } = useUpdateContact()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: selectedContact?.name
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!selectedContact) return

    try {
      await mutateAsync({
        contactId: selectedContact.id,
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

    setValue('name', selectedContact.name)
  }, [selectedContact])

  return (
    <DialogModal.Root
      open={isUpdateContactOpen}
      onOpenChange={setIsUpdateContactOpen}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Update contact
          </DialogModal.Title>
        </DialogModal.Header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-stretch"
        >
          <div className="w-full flex flex-col justify-center items-stretch gap-6 py-8 px-4 sm:px-8">
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
          </div>

          <DialogModal.Footer>
            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Update contact
            </Button>
          </DialogModal.Footer>
        </form>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
