import { useState } from 'react'
import { toast } from 'react-toastify'

import { DialogModal } from '@components/Dialogs/DialogModal'

import { Button } from '@/components/Button'

import { getWe3ErrorMessageWithToast } from '@/utils/web3/errors'
import { useChangeThreshold } from '@/hooks/transactions/mutation/useChangeThreshold'

import type { Dispatch, SetStateAction } from 'react'

interface Props {
  isOpen: boolean
  safeAddress: string
  ownersCount: number
  safeThreshold: number
  transactionNonce: number
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

export function ChangeThresholdModal({
  isOpen,
  safeAddress,
  ownersCount,
  onOpenChange,
  safeThreshold,
  transactionNonce
}: Props) {
  const [newThreshold, setNewThreshold] = useState('1')
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)

  const {
    mutateAsync: changeThresholdMutation,
    isLoading: changeThresholdMutationIsLoading
  } = useChangeThreshold()

  async function handleChangeThreshold() {
    try {
      setIsWaitingTransaction(true)
      const transaction = await changeThresholdMutation({
        safeAddress,
        transactionNonce,
        newThreshold: Number(newThreshold)
      })

      await transaction.wait()

      setIsWaitingTransaction(false)
      toast.success('Proposal created! View it on transactions tab.')
    } catch (err) {
      setIsWaitingTransaction(false)
      getWe3ErrorMessageWithToast(err)
    }
  }

  return (
    <DialogModal.Root
      open={isOpen}
      onOpenChange={isOpen => {
        if (changeThresholdMutationIsLoading) return

        onOpenChange(isOpen)
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="flex flex-col">
          <div className="w-full flex flex-col justify-center border-b-2 dark:border-zinc-800">
            <header className="w-full flex flex-col gap-3 py-8 px-8">
              <DialogModal.Title className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50">
                Change threshold
              </DialogModal.Title>
            </header>
          </div>

          <div className="p-8 flex flex-col gap-4 border-b-2 dark:border-zinc-800">
            <p>Any transaction will require the confirmation of: </p>

            <div className="flex gap-4 items-center">
              <select
                value={newThreshold}
                onChange={({ target: { value } }) => setNewThreshold(value)}
                className="p-4 rounded-md bg-transparent border-1 dark:border-zinc-800"
              >
                {Array.from({ length: ownersCount }, (_, i) => i + 1).map(
                  count => (
                    <option
                      key={count}
                      value={count}
                      disabled={safeThreshold === count}
                      className="dark:bg-zinc-800 dark:text-white"
                    >
                      {count}
                    </option>
                  )
                )}
              </select>

              <p>out of {ownersCount} owner(s).</p>
            </div>

            <p>
              Current policy is{' '}
              <span className="font-bold">{safeThreshold}</span> out of{' '}
              <span className="font-bold">{ownersCount}</span>.
            </p>

            <p className="p-4 dark:border-zinc-700 border-1 rounded-md bg-zinc-200 dark:bg-zinc-800/[.6] text-center">
              You&apos;ll be asked to sign a message and then confirm the
              transaction.
            </p>
          </div>

          <div className="flex justify-between p-8">
            <Button
              onClick={() => onOpenChange(false)}
              disabled={isWaitingTransaction}
              className="bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-800 min-w-[100px]"
            >
              Cancel
            </Button>

            <Button
              className="min-w-[100px]"
              onClick={handleChangeThreshold}
              isLoading={isWaitingTransaction}
            >
              Submit
            </Button>
          </div>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
