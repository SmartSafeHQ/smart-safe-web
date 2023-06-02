import type { Dispatch, SetStateAction } from 'react'
import type { ContractTransactionResponse } from 'ethers'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type { AddOwnerFunctionInput } from '@hooks/safe/mutation/useAddOwner'

import { z } from 'zod'
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

import { useCreateContact } from '@hooks/contacts/mutations/useCreateContact'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafe } from '@contexts/SafeContext'

interface AddOwnerModalProps {
  isOpen: boolean
  isLoading: boolean
  ownersCount: number
  threshold: number
  transactionNonce: number
  currentSafeOwnerId: string
  owners: { name: string; address: string }[]
  onOpenChange: Dispatch<SetStateAction<boolean>>
  addOwnerMutation: UseMutateAsyncFunction<
    ContractTransactionResponse,
    unknown,
    AddOwnerFunctionInput,
    unknown
  >
}

export const CONTACT_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/
export const ADDRESS_REGEX = /^(0x)[0-9a-fA-F]{40}$/

const validationSchema = z.object({
  ownerName: z
    .string()
    .min(3, 'name required')
    .regex(
      CONTACT_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  ownerAddress: z.string().regex(ADDRESS_REGEX, 'Invalid address.'),
  threshold: z.number().min(1)
})

type FieldValues = z.infer<typeof validationSchema>

export function AddOwnerModal({
  isOpen,
  owners,
  isLoading,
  threshold,
  ownersCount,
  onOpenChange,
  transactionNonce,
  currentSafeOwnerId,
  addOwnerMutation
}: AddOwnerModalProps) {
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)
  const [{ wallet }] = useConnectWallet()
  const { safe } = useSafe()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })
  const { mutateAsync: createContactMutation } = useCreateContact()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!safe || !wallet) return

    try {
      const isRepeatedOwnerAddress = owners.find(
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
        creatorId: currentSafeOwnerId
      })

      toast.success('Proposal created! View it on transactions tab.')
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    } finally {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <DialogModal.Root
      open={isOpen}
      onOpenChange={isOpen => {
        if (isLoading) return

        onOpenChange(isOpen)
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

            <div className="flex flex-1 gap-6 items-center justify-start">
              <SelectInput.Root
                {...register('threshold', { valueAsNumber: true })}
                className="w-full max-w-[5rem]"
                defaultValue={String(threshold)}
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
