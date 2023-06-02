import { useState } from 'react'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useConnectWallet } from '@web3-onboard/react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Text } from '@components/Text'

import {
  AddOwnerFieldValues,
  addOwnerValidationSchema,
  useSafeManagementHook
} from '@hooks/settings/useSafeManagement'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export function AddOwnerModal() {
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)
  const [{ wallet }] = useConnectWallet()
  const {
    safe,
    safeOwners,
    isAddOwnerOpen,
    setIsAddOwnerOpen,
    addOwnerMutation,
    addOwnerMutationIsLoading,
    createContactMutation,
    ownersCount,
    safeThreshold,
    transactionNonce
  } = useSafeManagementHook()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<AddOwnerFieldValues>({
    resolver: zodResolver(addOwnerValidationSchema)
  })

  const onSubmit: SubmitHandler<AddOwnerFieldValues> = async data => {
    if (!safe || !wallet || !safeOwners || !transactionNonce) return

    try {
      const isRepeatedOwnerAddress = safeOwners.find(
        ({ address }) => address === data.ownerAddress
      )

      if (isRepeatedOwnerAddress) {
        setError('ownerAddress', { message: 'Address already is an owner.' })

        return
      }

      setIsWaitingTransaction(true)

      const transaction = await addOwnerMutation({
        provider: wallet.provider,
        transactionNonce,
        safeAddress: safe.address,
        ownerAddress: data.ownerAddress,
        newThreshold: data.threshold
      })

      await transaction.wait()

      await createContactMutation({
        contactAddress: data.ownerAddress,
        contactName: data.ownerName,
        creatorId: safe.ownerId
      })

      setIsAddOwnerOpen(false)

      toast.success('Proposal created! View it on transactions tab.')
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    } finally {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <DialogModal.Root
      open={isAddOwnerOpen}
      onOpenChange={isOpen => {
        if (addOwnerMutationIsLoading) return

        setIsAddOwnerOpen(isOpen)
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">Add owner</DialogModal.Title>

          <DialogModal.Description>
            You&apos;ll be asked to sign a message and confirm the transaction.
          </DialogModal.Description>
        </DialogModal.Header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col justify-start"
        >
          <div className="flex flex-col gap-4 py-8 px-4 sm:px-8">
            <TextInput.Root
              className="w-full"
              htmlFor="owner-name"
              error={errors.ownerName?.message}
            >
              <TextInput.Label>Owner name</TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  {...register('ownerName')}
                  required
                  id="owner-name"
                  placeholder="Owner name"
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root
              className="w-full"
              htmlFor="ownerAddress"
              error={errors.ownerAddress?.message}
            >
              <TextInput.Label>Owner address</TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  required
                  {...register('ownerAddress')}
                  id="ownerAddress"
                  placeholder="Owner address"
                />
              </TextInput.Content>
            </TextInput.Root>

            {ownersCount && (
              <div className="flex flex-1 gap-6 items-center justify-start">
                <SelectInput.Root
                  {...register('threshold', { valueAsNumber: true })}
                  className="w-full max-w-[5rem]"
                  defaultValue={String(safeThreshold)}
                >
                  <SelectInput.Trigger className="h-10" />

                  <SelectInput.Content>
                    <SelectInput.Group>
                      {Array.from(
                        { length: ownersCount + 1 },
                        (_, i) => i + 1
                      ).map(count => (
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

                <Text>out of {ownersCount + 1} owner(s).</Text>
              </div>
            )}
          </div>

          <DialogModal.Footer>
            <DialogModal.Close>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogModal.Close>

            <Button
              type="submit"
              isLoading={isWaitingTransaction}
              className="min-w-[6.5rem]"
            >
              Add owner
            </Button>
          </DialogModal.Footer>
        </form>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
