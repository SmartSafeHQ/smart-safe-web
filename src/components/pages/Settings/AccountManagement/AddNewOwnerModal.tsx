import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'

import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { Button } from '@/components/Button'

import type { Dispatch, SetStateAction } from 'react'
import type { AddNewOwner } from '@/hooks/smartAccount/settings/useAddNewOwnerHook'

interface Props {
  isOpen: boolean
  isLoading: boolean
  ownersCount: number
  safeAddress: string
  safeThreshold: number
  transactionNonce: number
  owners: { name: string; address: string }[]
  onOpenChange: Dispatch<SetStateAction<boolean>>
  addNewOwner: (input: AddNewOwner) => Promise<void>
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

export function AddNewOwnerModal({
  isOpen,
  owners,
  isLoading,
  ownersCount,
  safeAddress,
  addNewOwner,
  onOpenChange,
  safeThreshold,
  transactionNonce
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({ resolver: zodResolver(validationSchema) })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const isRepeatedOwnerAddress = owners.find(
        ({ address }) => address === data.ownerAddress
      )

      if (isRepeatedOwnerAddress) {
        return
      }

      await addNewOwner({
        transactionNonce,
        safeAddress,
        ownerAddress: data.ownerAddress,
        newThreshold: data.threshold
      })
    } catch (error) {
      console.log(error)
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
              <DialogModal.Title className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50">
                Add new owner
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
                <Controller
                  name="threshold"
                  control={control}
                  render={({ field: { value, onChange, ref, ...props } }) => (
                    <SelectInput.Root
                      className="w-[100px]"
                      {...props}
                      ref={ref}
                      value={String(value)}
                      onValueChange={onChange}
                      defaultValue={String(safeThreshold)}
                    >
                      <SelectInput.Trigger className="min-h-[3rem] bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

                      <SelectInput.Content className="border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                        <SelectInput.Group>
                          {Array.from({ length: ownersCount }, (_, i) => i).map(
                            (count, index) => (
                              <SelectInput.Item
                                key={index}
                                value={String(index)}
                                className="w-full h-9 px-2 text-left overflow-hidden rounded-md capitalize pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                              >
                                {count}
                              </SelectInput.Item>
                            )
                          )}
                        </SelectInput.Group>
                      </SelectInput.Content>
                    </SelectInput.Root>
                  )}
                />

                <p>out of {ownersCount} owner(s).</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-8">
            <Button
              disabled={isLoading}
              className="bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-800 min-w-[100px]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={isLoading}
              className="min-w-[100px]"
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
