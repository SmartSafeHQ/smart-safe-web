import { toast } from 'react-toastify'
import { useConnectWallet } from '@web3-onboard/react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteContact } from '@hooks/contacts/mutations/useDeleteContact'
import { useContactsHook } from '@hooks/contacts/useContactsHook'

export function DeleteContactModal() {
  const [{ wallet }] = useConnectWallet()
  const { selectedContact, isDeleteContactOpen, setIsDeleteContactOpen } =
    useContactsHook()
  const { mutateAsync, isLoading } = useDeleteContact()

  async function handleConfirmDelete() {
    if (!selectedContact || !wallet) return

    try {
      await mutateAsync({
        contactId: selectedContact.id,
        ownerAddress: wallet.accounts[0].address
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
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Are you sure?
          </DialogModal.Title>

          <DialogModal.Description className="text-lg text-center">
            SmartSafe will delete the contact
            <Text asChild className="ml-1">
              <strong>{selectedContact?.name}</strong>
            </Text>
          </DialogModal.Description>
        </DialogModal.Header>

        <div className="w-full flex items-center justify-center gap-4 py-8 px-4 sm:px-8">
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

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
