import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useCreateContact } from '@hooks/contacts/mutations/useCreateContact'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

import type { Dispatch, SetStateAction } from 'react'
import type { ContractTransactionResponse } from 'ethers'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type { AddOwnerFunctionInput } from '@hooks/safe/mutation/useAddOwner'

interface AddOwnerModalProps {
  isOpen: boolean
  isLoading: boolean
  ownersCount: number
  safeAddress: string
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
  ownerAddress: z.string().regex(ADDRESS_REGEX, 'Invali address.'),
  threshold: z.number().min(1)
})

type FieldValues = z.infer<typeof validationSchema>

export function AddOwnerModal({
  isOpen,
  owners,
  isLoading,
  ownersCount,
  safeAddress,
  onOpenChange,
  transactionNonce,
  currentSafeOwnerId,
  addOwnerMutation
}: AddOwnerModalProps) {
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false)

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
        transactionNonce,
        safeAddress,
        ownerAddress: data.ownerAddress,
        newThreshold: data.threshold
      })

      await transaction.wait()

      await createContactMutation({
        contactAddress: data.ownerAddress,
        contactName: data.ownerName,
        creatorId: currentSafeOwnerId
      })

      setIsWaitingTransaction(false)
      toast.success('Proposal created! View it on transactions tab.')
    } catch (error) {
      setIsWaitingTransaction(false)
      getWe3ErrorMessageWithToast(error)
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
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col justify-center border-b-2 dark:border-zinc-800">
            <header className="w-full flex flex-col gap-3 py-8 px-8">
              <DialogModal.Title className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-50">
                Add owner
              </DialogModal.Title>
            </header>
          </div>

          <div className="p-8 flex flex-col gap-4 border-b-2 dark:border-zinc-800">
            <p>Add a new owner to this vault.</p>

            <div className="flex flex-col gap-4 items-center">
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
                htmlFor="owner-address"
                error={errors.ownerAddress?.message}
              >
                <TextInput.Label>Owner address</TextInput.Label>

                <TextInput.Content>
                  <TextInput.Input
                    required
                    {...register('ownerAddress')}
                    id="owner-address"
                    placeholder="Owner address"
                  />
                </TextInput.Content>
              </TextInput.Root>

              <div className="flex gap-4 items-center w-full justify-start">
                <select
                  {...register('threshold', { valueAsNumber: true })}
                  className="p-4 rounded-md bg-transparent border-1 dark:border-zinc-800"
                >
                  {Array.from({ length: ownersCount + 1 }, (_, i) => i + 1).map(
                    count => (
                      <option
                        key={count}
                        value={count}
                        className="dark:bg-zinc-800 dark:text-white"
                      >
                        {count}
                      </option>
                    )
                  )}
                </select>

                <p>out of {ownersCount + 1} owner(s).</p>
              </div>
            </div>

            <p className="p-4 dark:border-zinc-700 border-1 rounded-md bg-zinc-200 dark:bg-zinc-800/[.6] text-center">
              You&apos;ll be asked to sign a message and then confirm the
              transaction.
            </p>
          </div>

          <div className="flex justify-between p-8">
            <Button
              type="button"
              disabled={isWaitingTransaction}
              onClick={() => onOpenChange(false)}
              className="bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-800 min-w-[100px]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="min-w-[100px]"
              isLoading={isWaitingTransaction}
            >
              Submit
            </Button>
          </div>
        </form>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
