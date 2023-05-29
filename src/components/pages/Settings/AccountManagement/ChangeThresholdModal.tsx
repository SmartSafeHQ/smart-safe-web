import { useState } from 'react'

import { SelectInput } from '@components/Inputs/SelectInput'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { Button } from '@/components/Button'

import type { Dispatch, SetStateAction } from 'react'
import type { ChangeThrehsold } from '@/hooks/smartAccount/settings/useChangeThresholdHook'

interface Props {
  isOpen: boolean
  isLoading: boolean
  safeAddress: string
  ownersCount: number
  safeThreshold: number
  transactionNonce: number
  onOpenChange: Dispatch<SetStateAction<boolean>>
  changeThreshold: (input: ChangeThrehsold) => Promise<void>
}

export function ChangeThresholdModal({
  isOpen,
  isLoading,
  safeAddress,
  ownersCount,
  onOpenChange,
  safeThreshold,
  changeThreshold,
  transactionNonce
}: Props) {
  const [newThreshold, setNewThreshold] = useState('1')

  return (
    <DialogModal.Root
      open={isOpen}
      onOpenChange={isOpen => {
        if (isLoading) return

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
              <SelectInput.Root
                className="w-[100px]"
                onValueChange={newThreshold => setNewThreshold(newThreshold)}
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

              <p>out of {ownersCount} owner(s).</p>
            </div>

            <p>
              Current policy is{' '}
              <span className="font-bold">{safeThreshold}</span> out of{' '}
              <span className="font-bold">{ownersCount}</span>.
            </p>

            <p className="p-4 dark:border-zinc-700 border-1 rounded-md bg-zinc-800/[.6] text-center">
              You&apos;ll be asked to sign a message and then confirm the
              transaction.
            </p>
          </div>

          <div className="flex justify-between p-8">
            <Button
              disabled={isLoading}
              className="bg-transparent hover:dark:bg-zinc-800 min-w-[100px]"
            >
              Cancel
            </Button>

            <Button
              className="min-w-[100px]"
              isLoading={isLoading}
              onClick={() =>
                changeThreshold({
                  safeAddress,
                  transactionNonce,
                  newThreshold: Number(newThreshold)
                })
              }
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
