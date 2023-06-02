import type { Dispatch, SetStateAction } from 'react'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useConnectWallet } from '@web3-onboard/react'
import { Info } from '@phosphor-icons/react'

import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useChangeThreshold } from '@hooks/safe/mutation/useChangeThreshold'

interface ChangeThresholdModalProps {
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
}: ChangeThresholdModalProps) {
  const [newThreshold, setNewThreshold] = useState('1')
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)
  const [{ wallet }] = useConnectWallet()

  const {
    mutateAsync: changeThresholdMutation,
    isLoading: changeThresholdMutationIsLoading
  } = useChangeThreshold()

  async function handleChangeThreshold() {
    if (!wallet) return

    try {
      setIsWaitingTransaction(true)
      const transaction = await changeThresholdMutation({
        provider: wallet.provider,
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
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Change threshold
          </DialogModal.Title>

          <DialogModal.Description>
            You&apos;ll be asked to sign a message and confirm the transaction.
          </DialogModal.Description>
        </DialogModal.Header>

        <div className="w-full h-full flex flex-col justify-start">
          <div className="w-full flex flex-col items-stretch gap-4 py-8 px-4 sm:px-8">
            <Text asChild>
              <p>Any transaction will require the confirmation of:</p>
            </Text>

            <div className="flex flex-1 gap-6 items-center justify-start">
              <SelectInput.Root
                value={newThreshold}
                defaultValue={String(safeThreshold)}
                onValueChange={value => setNewThreshold(value)}
                className="w-full max-w-[5rem]"
              >
                <SelectInput.Trigger className="h-10" />

                <SelectInput.Content>
                  <SelectInput.Group>
                    {Array.from({ length: ownersCount }, (_, i) => i + 1).map(
                      count => (
                        <SelectInput.Item
                          key={count}
                          value={String(count)}
                          className="h-8"
                        >
                          <div className="w-full flex items-streach justify-start">
                            {count}
                          </div>
                        </SelectInput.Item>
                      )
                    )}
                  </SelectInput.Group>
                </SelectInput.Content>
              </SelectInput.Root>

              <Text>out of {ownersCount} owner(s)</Text>
            </div>

            <div className="flex items-center justify-start gap-2 mt-4">
              <Info className="w-5 h-5" />

              <Text asChild>
                <p>
                  Current policy is{' '}
                  <Text className="font-bold">{safeThreshold}</Text> out of{' '}
                  <Text className="font-bold">{ownersCount}</Text>.
                </p>
              </Text>
            </div>
          </div>

          <DialogModal.Footer>
            <DialogModal.Close>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogModal.Close>

            <Button
              onClick={handleChangeThreshold}
              isLoading={isWaitingTransaction}
              className="min-w-[6.5rem]"
            >
              Change threshold
            </Button>
          </DialogModal.Footer>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
