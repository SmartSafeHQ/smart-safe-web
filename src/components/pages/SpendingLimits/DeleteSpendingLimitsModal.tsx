import Image from 'next/image'
import dayjs from 'dayjs'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteSpendingLimitsMutation } from '@hooks/spendingLimits/mutations/useDeleteSpendingLimitsMutation'
import { useSpendingLimitsHook } from '@hooks/spendingLimits/useSpendingLimitsHook'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export function DeleteSpendingLimitsModal() {
  const {
    selectedSpendingLimits,
    isDeleteSpendingLimitsOpen,
    setIsDeleteSpendingLimitsOpen
  } = useSpendingLimitsHook()

  const { mutateAsync, isLoading } = useDeleteSpendingLimitsMutation()

  async function handleConfirmDelete() {
    if (!selectedSpendingLimits) return

    try {
      await mutateAsync({
        safeAddress: 'address',
        customerWalletPrivateKey: 'privateKey',
        withdrawalIndex: selectedSpendingLimits.index
      })

      setIsDeleteSpendingLimitsOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  if (!selectedSpendingLimits) return <></>

  return (
    <DialogModal.Root
      open={isDeleteSpendingLimitsOpen}
      onOpenChange={setIsDeleteSpendingLimitsOpen}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Delete authorization
          </DialogModal.Title>

          <DialogModal.Description>
            SmartSafe will delete the spending limit
          </DialogModal.Description>
        </DialogModal.Header>

        <div className="w-full flex flex-col items-stretch justify-start gap-4 mb-8 py-8 px-4 sm:px-8">
          <div className="flex flex-col items-stretch justify-start gap-1">
            <Text asChild className="text-start">
              <strong>{selectedSpendingLimits.recipientName}</strong>
            </Text>

            <Text className="w-min text-sm capitalize text-zinc-500 dark:text-zinc-300">
              {selectedSpendingLimits.wallet.formattedAddress}
            </Text>
          </div>

          <div className="w-full flex items-start justify-between gap-2 ">
            <div className="flex items-center gap-2">
              <Heading asChild className="capitalize">
                <h3>Amount</h3>
              </Heading>

              <Image
                src={selectedSpendingLimits.coin.avatar}
                alt={`${selectedSpendingLimits.coin.symbol} coin icon`}
                width={20}
                height={20}
                className="mr-1"
              />
            </div>

            <Text className="text-sm">
              {selectedSpendingLimits.coinAmount}{' '}
              {selectedSpendingLimits.coin.symbol}
            </Text>
          </div>

          <div className="w-full flex items-start justify-between gap-1">
            <Heading asChild>
              <h3>From date</h3>
            </Heading>

            <Text className="text-sm">
              {dayjs(selectedSpendingLimits.dateFrom).format('DD/MM/YYYY')}
            </Text>
          </div>
        </div>

        <DialogModal.Footer>
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
            Delete Authorization
          </Button>
        </DialogModal.Footer>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
