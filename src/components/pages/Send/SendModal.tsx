import Image from 'next/image'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendSuccess } from '@components/pages/Send/SendSuccess'
import { SendFeeEst } from '@components/pages/Send/SendFeeEst'
import { SendAddresses } from '@components/pages/Send/SendAddresses'

import { useSend } from '@contexts/SendContext'
import { useSafe } from '@contexts/SafeContext'

export function SendModal() {
  const {
    selectedToken,
    transaction,
    txData,
    isSendingTx,
    isSendOpen,
    setIsSendOpen,
    resetSendMutation,
    handleSendTransaction
  } = useSend()
  const { safe } = useSafe()

  if (!transaction || !selectedToken) return <></>

  return (
    <DialogModal.Root
      open={isSendOpen}
      onOpenChange={isOpen => {
        if (isSendingTx) return

        setIsSendOpen(isOpen)

        if (!isOpen) resetSendMutation()
      }}
    >
      <DialogModal.Content className="md:max-w-[32rem]">
        <div className="w-full h-full flex flex-col justify-start">
          {!txData ? (
            <>
              <DialogModal.Header className="gap-3">
                <DialogModal.Title className="text-3xl">
                  Send ${transaction.usdAmount.toPrecision(3)}
                </DialogModal.Title>

                <div className="w-full flex items-center justify-center gap-2">
                  <DialogModal.Description className="text-center text-xl font-semibold uppercase">
                    {transaction.tokenAmount.toPrecision(1)}{' '}
                    {selectedToken.symbol}
                  </DialogModal.Description>

                  <Image
                    src={selectedToken.icon}
                    alt={`${selectedToken.symbol} icon`}
                    width={24}
                    height={24}
                  />
                </div>
              </DialogModal.Header>

              <div className="w-full flex flex-col gap-4 py-8 px-4 sm:px-8">
                <SendAddresses />

                <SendFeeEst />
              </div>

              <DialogModal.Footer className="pb-6 sm:px-8">
                <Button
                  onClick={() =>
                    handleSendTransaction({
                      ...selectedToken,
                      to: transaction.to,
                      amount: transaction.tokenAmount
                    })
                  }
                  isLoading={isSendingTx}
                  className="w-full"
                >
                  Send
                </Button>
              </DialogModal.Footer>
            </>
          ) : (
            <SendSuccess
              transactionUrl={`${safe?.chain.explorerUrl}/tx/${txData.transactionHash}`}
            />
          )}
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
