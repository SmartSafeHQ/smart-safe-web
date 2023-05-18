import Image from 'next/image'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendSuccess } from '@components/pages/Send/SendSuccess'
import { SendFeeEst } from '@components/pages/Send/SendFeeEst'
import { SendAddresses } from '@components/pages/Send/SendAddresses'

import { useSend } from '@contexts/SendContext'

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

  if (!transaction || !selectedToken) return <></>

  return (
    <DialogModal.Root
      open={isSendOpen}
      onOpenChange={isOpen => {
        setIsSendOpen(isOpen)

        if (!isOpen) resetSendMutation()
      }}
    >
      <DialogModal.Content
        className="md:max-w-[32rem] border-1 border-zinc-200 dark:border-zinc-700 !bg-zinc-100 dark:!bg-zinc-900"
        onEscapeKeyDown={e => isSendingTx && e.preventDefault()}
        onInteractOutside={e => isSendingTx && e.preventDefault()}
      >
        <div className="w-full h-full flex flex-col justify-start overflow-x-hidden">
          {!txData ? (
            <>
              <header className="flex items-center flex-col gap-3 p-8 rounded-lg bg-zinc-50 dark:bg-zinc-950">
                <DialogModal.Title className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  Send ${transaction.usdAmount}
                </DialogModal.Title>

                <div className="w-full flex items-center justify-center gap-2">
                  <DialogModal.Description className="text-center text-zinc-700 dark:text-zinc-300 text-xl font-semibold uppercase">
                    {transaction.formattedTokenAmount} {selectedToken.symbol}
                  </DialogModal.Description>

                  <Image
                    src={selectedToken.icon}
                    alt={`${selectedToken.symbol} icon`}
                    width={24}
                    height={24}
                  />
                </div>
              </header>

              <div className="w-full flex flex-col gap-4 py-8 px-4 border-t-1 border-zinc-200 dark:border-zinc-700 sm:px-8">
                <SendAddresses />

                <SendFeeEst />
              </div>

              <div className="w-full px-4 pb-6 flex justify-center items-center sm:px-8">
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
              </div>
            </>
          ) : (
            <SendSuccess
              transactionUrl={`${selectedToken.explorerUrl}/tx/${txData.transactionHash}`}
            />
          )}
        </div>

        {!isSendingTx && <DialogModal.IconClose />}
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
