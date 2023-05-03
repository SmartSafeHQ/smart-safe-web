import Image from 'next/image'
import dayjs from 'dayjs'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useDeleteWithdrawalAuthMutation } from '@hooks/smartAccount/mutations/useDeleteWithdrawalAuthMutation'
import { useSAWithdrawalAuthHook } from '@hooks/smartAccount/useSAWithdrawalAuthHook'
import { getWe3ErrorMessageWithToast } from '@utils/web3'

export function DeleteWithdrawalAuthModal() {
  const {
    selectedWithdrawal,
    isDeleteWithdrawalOpen,
    setIsDeleteWithdrawalOpen
  } = useSAWithdrawalAuthHook()

  const { mutateAsync, isLoading } = useDeleteWithdrawalAuthMutation()

  async function handleConfirmDelete() {
    if (!selectedWithdrawal) return

    try {
      await mutateAsync({
        smartAccountAddress: 'address',
        customerWalletPrivateKey: 'privateKey',
        withdrawalIndex: selectedWithdrawal.index
      })

      setIsDeleteWithdrawalOpen(false)
    } catch (e) {
      getWe3ErrorMessageWithToast(e)
    }
  }

  if (!selectedWithdrawal) return <></>

  return (
    <DialogModal.Root
      open={isDeleteWithdrawalOpen}
      onOpenChange={setIsDeleteWithdrawalOpen}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex flex-col items-stretch gap-5 mb-6">
            <DialogModal.Title className="text-3xl font-bold capitalize text-gray-800 dark:text-gray-50">
              Delete withdrawal authorization
            </DialogModal.Title>

            <DialogModal.Description className="text-gray-600 dark:text-gray-300">
              SmartSafe will delete the withdrawal authorization
            </DialogModal.Description>
          </header>

          <div className="w-full flex flex-col items-stretch justify-start gap-4 mb-8">
            <div className="flex flex-col items-stretch justify-start gap-1">
              <Text asChild className="text-start">
                <strong>{selectedWithdrawal.recipientName}</strong>
              </Text>

              <Text className="w-min text-sm capitalize text-gray-500 dark:text-gray-300">
                {selectedWithdrawal.wallet.formattedAddress}
              </Text>
            </div>

            <div className="w-full flex items-start justify-between gap-2 ">
              <div className="flex items-center gap-2">
                <Heading asChild className="capitalize">
                  <h3>Amount</h3>
                </Heading>

                <Image
                  src={selectedWithdrawal.coin.avatar}
                  alt={`${selectedWithdrawal.coin.symbol} coin icon`}
                  width={20}
                  height={20}
                  className="mr-1"
                />
              </div>

              <Text className="text-sm">
                {selectedWithdrawal.coinAmount} {selectedWithdrawal.coin.symbol}
              </Text>
            </div>

            <div className="w-full flex items-start justify-between gap-1">
              <Heading asChild>
                <h3>From date</h3>
              </Heading>

              <Text className="text-sm">
                {dayjs(selectedWithdrawal.dateFrom).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
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
              Delete Authorization
            </Button>
          </div>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
