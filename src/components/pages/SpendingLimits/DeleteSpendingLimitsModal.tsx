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
        address: 'address',
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
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex flex-col items-stretch gap-5 mb-6">
            <DialogModal.Title className="text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">
              Delete authorization
            </DialogModal.Title>

            <DialogModal.Description className="text-zinc-600 dark:text-zinc-300">
              SmartSafe will delete the spending limit
            </DialogModal.Description>
          </header>

          <div className="w-full flex flex-col items-stretch justify-start gap-4 mb-8">
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

          <div className="w-full flex items-center justify-center gap-4">
            <DialogModal.Trigger>
              <Button className="w-full capitalize bg-transparent text-zinc-800 dark:text-zinc-50 border-2 border-zinc-500 hover:bg-zinc-300 dark:hover:bg-zinc-500">
                cancel
              </Button>
            </DialogModal.Trigger>

            <Button
              onClick={handleConfirmDelete}
              isLoading={isLoading}
              variant="red"
              className="w-full"
            >
              Delete Authorization
            </Button>
          </div>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
