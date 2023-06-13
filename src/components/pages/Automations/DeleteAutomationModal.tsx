import Image from 'next/image'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteAutomationMutation } from '@hooks/automations/mutations/useDeleteAutomationMutation'
import { useAutomationsHook } from '@hooks/automations/useAutomationsHook'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export function DeleteAutomationModal() {
  const {
    selectedAutomation,
    isDeleteAutomationOpen,
    setIsDeleteAutomationOpen
  } = useAutomationsHook()

  const { mutateAsync, isLoading } = useDeleteAutomationMutation()

  async function handleConfirmDelete() {
    if (!selectedAutomation) return

    try {
      await mutateAsync({
        safeAddress: 'address',
        customerWalletPrivateKey: 'privateKey'
      })

      setIsDeleteAutomationOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  if (!selectedAutomation) return <></>

  return (
    <DialogModal.Root
      open={isDeleteAutomationOpen}
      onOpenChange={setIsDeleteAutomationOpen}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Delete automation
          </DialogModal.Title>

          <DialogModal.Description>
            SmartSafe will delete the payment automation
          </DialogModal.Description>
        </DialogModal.Header>

        <div className="w-full flex flex-col items-stretch justify-start gap-4 mb-8 py-8 px-4 sm:px-8">
          <div className="flex flex-col items-stretch justify-start gap-1">
            <Text asChild className="text-start">
              <strong>{selectedAutomation.recipientName}</strong>
            </Text>

            <Text className="w-min text-sm capitalize text-zinc-500 dark:text-zinc-300">
              {selectedAutomation.wallet.formattedAddress}
            </Text>
          </div>

          <div className="w-full flex items-start justify-between gap-2 ">
            <div className="flex items-center gap-2">
              <Heading asChild className="capitalize">
                <h3>Amount</h3>
              </Heading>

              <Image
                src={selectedAutomation.token.icon}
                alt={`${selectedAutomation.token.symbol} token icon`}
                width={20}
                height={20}
                className="mr-1"
              />
            </div>

            <Text className="text-sm">
              {selectedAutomation.amount} {selectedAutomation.token.symbol}
            </Text>
          </div>

          <div className="w-full flex items-start justify-between gap-1">
            <Heading asChild>
              <h3>Time trigger</h3>
            </Heading>

            <Text className="text-sm">{selectedAutomation.triggerTitle}</Text>
          </div>
        </div>

        <DialogModal.Footer>
          <DialogModal.Close>
            <Button className="w-max" variant="ghost">
              Cancel
            </Button>
          </DialogModal.Close>

          <Button
            onClick={handleConfirmDelete}
            isLoading={isLoading}
            variant="red"
            className="w-max"
            disabled
          >
            Delete Automation
          </Button>
        </DialogModal.Footer>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
