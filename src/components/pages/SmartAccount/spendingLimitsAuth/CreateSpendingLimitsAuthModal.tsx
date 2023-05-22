import { Controller } from 'react-hook-form'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSpendingLimitsAuthHook } from '@/hooks/smartAccount/useSpendingLimitsAuthHook'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

export function CreateSpendingLimitsAuthModal() {
  const {
    contacts,
    setSearchContacts,
    contactsIsLoading,
    control,
    searchContacts,
    handleInputChange,
    register,
    handleSubmit,
    errors,
    setValue,
    isSubmitting,
    reset,
    onSubmitCreateSpendingLimits,
    isCreateSpendingLimitsOpen,
    setIsCreateSpendingLimitsOpen
  } = useSpendingLimitsAuthHook()

  const isoDateNow = new Date().toISOString().slice(0, 10)

  return (
    <DialogModal.Root
      open={isCreateSpendingLimitsOpen}
      onOpenChange={isOpen => {
        setIsCreateSpendingLimitsOpen(isOpen)
        reset()
        setSearchContacts(contacts)
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-zinc-800 dark:text-zinc-50">
              Create authorization
            </DialogModal.Title>
          </header>

          <form
            onSubmit={handleSubmit(onSubmitCreateSpendingLimits)}
            className="flex flex-col gap-6 items-stretch w-full"
          >
            <div className="flex flex-col gap-1 group">
              <TextInput.Root
                htmlFor="contactAddress"
                variant="secondary"
                error={errors.contactAddress?.message}
                onClick={() =>
                  document
                    .getElementById('select-contact-id')
                    ?.classList.remove('!hidden')
                }
              >
                <TextInput.Label>Contact</TextInput.Label>

                <Skeleton isLoading={contactsIsLoading} className="w-full h-12">
                  {contacts && (
                    <TextInput.Content>
                      <TextInput.Input
                        {...register('contactAddress')}
                        required
                        id="contactAddress"
                        type="search"
                        autoComplete="off"
                        role="combobox"
                        list=""
                        autoFocus={true}
                        placeholder="Enter contact address"
                        onChange={e => handleInputChange(e.target.value)}
                      />
                    </TextInput.Content>
                  )}
                </Skeleton>
              </TextInput.Root>

              <div className="relative w-full">
                <ul
                  id="select-contact-id"
                  className="w-full hidden flex-col items-stretch absolute top-2 left-0 group-focus-within:flex bg-zinc-100 dark:bg-zinc-900 rounded"
                >
                  {searchContacts?.map(contact => (
                    <li key={contact.contactName} className="min-h-[3rem]">
                      <button
                        type="button"
                        onClick={() => {
                          setValue('contactAddress', contact.contactAddress)
                          handleInputChange(contact.contactAddress)

                          document
                            .getElementById('select-contact-id')
                            ?.classList.add('!hidden')
                        }}
                        className="w-full flex flex-col items-stretch justify-start gap-1 p-2 outline-none ring-cyan-500 rounded transition-colors hover:bg-cyan-600 focus-within:bg-cyan-600 hover:!text-zinc-50"
                      >
                        <Text asChild className="text-start">
                          <strong>{contact.contactName}</strong>
                        </Text>

                        <Text className="w-min text-sm capitalize ">
                          {contact.formattedAddress}
                        </Text>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Controller
              name="coinSymbol"
              control={control}
              defaultValue={CHAINS_ATTRIBUTES[0].symbol}
              render={({ field: { onChange, value, ref, ...props } }) => (
                <SelectInput.Root
                  {...props}
                  onValueChange={onChange}
                  value={value}
                  ref={ref}
                  className="w-full"
                  labelText="Token"
                >
                  <SelectInput.Trigger className="min-h-[3rem] py-1 bg-zinc-50 dark:bg-zinc-900" />

                  <SelectInput.Content className="bg-zinc-50 dark:bg-zinc-900">
                    <SelectInput.Group>
                      {CHAINS_ATTRIBUTES.map(coin => (
                        <SelectInput.Item
                          key={coin.symbol}
                          value={coin.symbol}
                          className="min-h-[3rem] py-1"
                        >
                          <div className="w-full flex items-center justify-start gap-2">
                            <Image
                              src={coin.icon}
                              alt={`${coin.symbol} coin`}
                              width={28}
                              height={28}
                              className="w-7 h-7"
                            />

                            <Text className="text-xl font-bold dark:text-zinc-50 uppercase">
                              {coin.symbol}
                            </Text>
                          </div>
                        </SelectInput.Item>
                      ))}
                    </SelectInput.Group>
                  </SelectInput.Content>
                </SelectInput.Root>
              )}
            />

            <TextInput.Root
              htmlFor="amount"
              variant="secondary"
              error={errors.amount?.message}
            >
              <TextInput.Label>Amount</TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  {...register('amount', {
                    valueAsNumber: true
                  })}
                  required
                  id="amount"
                  type="number"
                  min={0.01}
                  step={0.01}
                  placeholder="Enter the amount of tokens"
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root
              htmlFor="fromDate"
              variant="secondary"
              error={errors.fromDate?.message}
            >
              <TextInput.Label>Start date</TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  {...register('fromDate', {
                    valueAsDate: true
                  })}
                  required
                  id="fromDate"
                  type="date"
                  min={isoDateNow}
                  defaultValue={isoDateNow}
                  placeholder="Enter the authorization date"
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Create Authorization
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
