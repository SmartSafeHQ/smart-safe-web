import { toast } from 'react-toastify'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteContact } from '@hooks/contacts/mutations/useDeleteContact'
import { useContactsHook } from '@hooks/contacts/useContactsHook'

export function DeleteContactModal() {
  const { selectedContact, isDeleteContactOpen, setIsDeleteContactOpen } =
    useContactsHook()
  const { mutateAsync, isLoading } = useDeleteContact()

  async function handleConfirmDelete() {
    if (!selectedContact) return

    try {
      await mutateAsync({
        contactId: selectedContact.contactId
      })

      setIsDeleteContactOpen(false)
    } catch (error) {
      console.log(error)

      const errorMessage = (error as Error)?.message

      toast.error(errorMessage)
    }
  }

  return (
    <DialogModal.Root
      open={isDeleteContactOpen}
      onOpenChange={setIsDeleteContactOpen}
    >
      <DialogModal.Content className="md:max-w-[32rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-5 mb-6">
            <DialogModal.Title className="text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">
              delete contact
            </DialogModal.Title>

            <DialogModal.Description className="text-lg text-center">
              SmartSafe will delete the contact
              <Text asChild className="ml-1">
                <strong>{selectedContact?.contactName}</strong>
              </Text>
            </DialogModal.Description>
          </header>

          <div className="w-full flex items-center justify-center gap-4 mt-1">
            <DialogModal.Close>
              <Button className="w-full" variant="ghost">
                Cancel
              </Button>
            </DialogModal.Close>

            <Button
              onClick={handleConfirmDelete}
              isLoading={isLoading}
              variant="red"
              className="w-full"
            >
              Delete contact
            </Button>
          </div>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
