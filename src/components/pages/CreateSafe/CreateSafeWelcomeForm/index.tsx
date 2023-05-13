import { Shield, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { Controller } from 'react-hook-form'

import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TextInput } from '@components/Inputs/TextInput'
import { WalletProfileNavigation } from './WalletProfileNavigation'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { useCreateSafeHook } from '@hooks/safes/create/useCreateSafeHook'

export function CreateSafeWelcomeForm() {
  const {
    handleSubmit,
    onSubmit,
    control,
    safeInfos,
    wallet,
    setChain,
    register,
    errors,
    isSubmitting
  } = useCreateSafeHook()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center relative mt-4"
    >
      <div className="w-full flex flex-col items-center justify-center flex-wrap gap-4 relative pb-5 border-b-1 border-zinc-200 dark:border-zinc-700 sm:flex-row">
        <WalletProfileNavigation />

        <Controller
          name="chainId"
          control={control}
          defaultValue={safeInfos?.chain.chainId ?? wallet?.chains[0].id}
          render={({ field: { value, onChange, ref, ...props } }) => (
            <SelectInput.Root
              {...props}
              onValueChange={async chainId => {
                const isApproved = await setChain({ chainId })

                if (isApproved) onChange(chainId)
              }}
              value={value}
              ref={ref}
              className="w-full flex flex-1"
            >
              <SelectInput.Trigger className="w-full h-10 px-3 text-left overflow-hidden rounded-md bg-white dark:bg-black capitalize border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

              <SelectInput.Content className="w-full border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                <SelectInput.Group className="w-full">
                  {CHAINS_ATTRIBUTES.map(chain => (
                    <SelectInput.Item
                      key={chain.chainId}
                      value={chain.chainId}
                      className="w-full h-9 px-2 text-left overflow-hidden rounded-md capitalize pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: chain.hexColor
                          }}
                        />

                        <Text>{chain.networkName}</Text>
                      </div>
                    </SelectInput.Item>
                  ))}
                </SelectInput.Group>
              </SelectInput.Content>
            </SelectInput.Root>
          )}
        />
      </div>

      <div className="flex flex-col gap-3 items-stretch w-full pt-4">
        <TextInput.Root htmlFor="name" error={errors.name?.message}>
          <TextInput.Label>Safe name</TextInput.Label>

          <TextInput.Content>
            <TextInput.Icon>
              <Shield />
            </TextInput.Icon>

            <TextInput.Input
              {...register('name')}
              required
              id="name"
              defaultValue={safeInfos?.name}
              placeholder="Enter your safe name"
            />
          </TextInput.Content>
        </TextInput.Root>

        <Text
          asChild
          className="flex items-center gap-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
        >
          <Link
            href={process.env.NEXT_PUBLIC_SMART_SAFE_DISCORD_LINK ?? ''}
            target="_blank"
          >
            Join community to see updates
            <ArrowRight className="w-4 h-4 text-cyan-500" />
          </Link>
        </Text>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full mt-3 font-semibold"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
