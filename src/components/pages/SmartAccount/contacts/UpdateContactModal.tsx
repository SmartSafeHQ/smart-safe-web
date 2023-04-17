import { useEffect } from 'react'
import { User } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Text } from '@components/Text'

import { useUpdateContactMutation } from '@hooks/smartAccount/mutations/useUpdateContactMutation'
import {
  CONTACT_NAME_REGEX,
  useSAContactsHook
} from '@hooks/smartAccount/useSAContactsHook'

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
  const {
    t,
    customer,
    selectedContact,
    isUpdateContactOpen,
    setIsUpdateContactOpen
  } = useSAContactsHook()
  const { mutateAsync } = useUpdateContactMutation()

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
    if (!customer || !selectedContact) return

    try {
      await mutateAsync({
        contactId: selectedContact.id,
        customerId: customer.id,
        name: data.name
      })

      reset()
      setIsUpdateContactOpen(false)
    } catch (error) {
      console.log(error)

      toast.error(`${(error as Error).message}`)
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
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.saContacts.updateContactTitle}
            </DialogModal.Title>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-stretch w-full"
          >
            <Text className="capitalize text-gray-600 dark:text-gray-300">
              {t.saContacts.wallet}: {selectedContact?.wallet.formattedAddress}
            </Text>

            <TextInput.Root
              htmlFor="name"
              variant="secondary"
              error={errors.name?.message}
            >
              <TextInput.Label>{t.saContacts.nameLabel}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <User />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('name')}
                  required
                  id="name"
                  placeholder={t.saContacts.namePlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              {t.saContacts.updateContactButton}
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
