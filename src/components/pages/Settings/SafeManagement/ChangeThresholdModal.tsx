import { useState } from 'react'
import { toast } from 'react-toastify'
import { useConnectWallet } from '@web3-onboard/react'
import { Info } from '@phosphor-icons/react'

import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafeManagementHook } from '@hooks/settings/useSafeManagement'

export function ChangeThresholdModal() {
  const [newThreshold, setNewThreshold] = useState('1')
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)
  const [{ wallet }] = useConnectWallet()

  const {
    safe,
    safeOwners,
    safeThreshold,
    transactionNonce,
    isChangeThresholdOpen,
    setIsChangeThresholdOpen,
    changeThresholdMutation
  } = useSafeManagementHook()

  async function handleChangeThreshold() {
    if (!wallet || !safe || transactionNonce === undefined) return

    try {
      setIsWaitingTransaction(true)

      const transaction = await changeThresholdMutation({
        provider: wallet.provider,
        safeAddress: safe.address,
        transactionNonce,
        newThreshold: Number(newThreshold)
      })

      await transaction.wait()

      setIsChangeThresholdOpen(false)

      toast.success(
        'Transaction proposal successfully created! View it on the transactions tab'
      )
    } catch (err) {
      getWe3ErrorMessageWithToast(err)
    } finally {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <DialogModal.Root
      open={isChangeThresholdOpen}
      onOpenChange={isOpen => {
        if (isWaitingTransaction) return

        setIsChangeThresholdOpen(isOpen)
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
              {safeOwners && (
                <SelectInput.Root
                  value={newThreshold}
                  onValueChange={value => setNewThreshold(value)}
                  className="w-full max-w-[5rem]"
                >
                  <SelectInput.Trigger className="h-10" />

                  <SelectInput.Content>
                    <SelectInput.Group>
                      {Array.from(
                        { length: safeOwners.length },
                        (_, i) => i + 1
                      )
                        .filter(count => count !== safeThreshold)
                        .map(count => (
                          <SelectInput.Item
                            key={count}
                            value={String(count)}
                            className="h-8"
                          >
                            <div className="w-full flex items-streach justify-start">
                              {count}
                            </div>
                          </SelectInput.Item>
                        ))}
                    </SelectInput.Group>
                  </SelectInput.Content>
                </SelectInput.Root>
              )}

              <Text>out of {safeOwners?.length} owner(s)</Text>
            </div>

            <div className="flex items-center justify-start gap-2 mt-4">
              <Info className="w-5 h-5" />

              <Text asChild>
                <p>
                  Current policy is{' '}
                  <Text className="font-bold">{safeThreshold}</Text> out of{' '}
                  <Text className="font-bold">{safeOwners?.length}</Text>
                </p>
              </Text>
            </div>
          </div>

          <DialogModal.Footer>
            <DialogModal.Close>
              <Button
                type="button"
                variant="ghost"
                disabled={isWaitingTransaction}
              >
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
