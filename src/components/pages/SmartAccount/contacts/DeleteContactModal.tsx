import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteContactMutation } from '@hooks/smartAccount/mutations/useDeleteContactMutation'
import { useSAContactsHook } from '@hooks/smartAccount/useSAContactsHook'
import { getAxiosErrorMessageWithToast } from '@utils/global'

export function DeleteContactModal() {
  const {
    customer,
    selectedContact,
    isDeleteContactOpen,
    setIsDeleteContactOpen
  } = useSAContactsHook()
  const { mutateAsync, isLoading } = useDeleteContactMutation()

  async function handleConfirmDelete() {
    if (!customer || !selectedContact) return

    try {
      await mutateAsync({
        contactId: selectedContact.id,
        customerId: customer.id
      })

      setIsDeleteContactOpen(false)
    } catch (error) {
      console.log(error)

      getAxiosErrorMessageWithToast(error)
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
            <DialogModal.Title className="text-3xl font-bold capitalize text-gray-800 dark:text-gray-50">
              delete contact
            </DialogModal.Title>

            <DialogModal.Description className="text-lg text-center">
              Tokenverse will delete the contact
              <Text asChild className="ml-1">
                <strong>{selectedContact?.name}</strong>
              </Text>
            </DialogModal.Description>
          </header>

          <div className="w-full flex items-center justify-center gap-4 mt-1">
            <DialogModal.Trigger>
              <Button className="w-full capitalize bg-transparent text-gray-800 dark:text-gray-50 border-2 border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-500">
                cancel
              </Button>
            </DialogModal.Trigger>

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
