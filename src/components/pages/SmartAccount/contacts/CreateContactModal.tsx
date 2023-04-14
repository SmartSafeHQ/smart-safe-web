import { User, Wallet } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useCreateContactMutation } from '@hooks/smart-account/useCreateContactMutation'
import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'

interface CreateContactModalProps {
  isOpen: boolean
  setIsOpen: (_open: boolean) => void
}

const validationSchema = z.object({
  name: z.string().min(1, 'name required'),
  address: z.string().min(1, { message: 'address required' })
})

export type FieldValues = z.infer<typeof validationSchema>

export function CreateContactModal({
  isOpen,
  setIsOpen
}: CreateContactModalProps) {
  const { t } = useI18n()
  const { customer } = useAuth()
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
      setIsOpen(false)
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return (
    <DialogModal.Root
      open={isOpen}
      onOpenChange={isOpen => {
        setIsOpen(isOpen)
        reset()
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.saContacts.createContactTitle}
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

            <TextInput.Root
              htmlFor="address"
              variant="secondary"
              error={errors.address?.message}
            >
              <TextInput.Label>{t.saContacts.addressLabel}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Wallet />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('address')}
                  required
                  id="address"
                  placeholder={t.saContacts.addressPlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              {t.saContacts.createContactButton}
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
