import { Controller } from 'react-hook-form'
import { Wrench } from '@phosphor-icons/react'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Tabs } from '@components/Tabs'

import {
  TIME_BASED_TRIGGERS,
  useSpendingLimitsHook
} from '@hooks/spendingLimits/useSpendingLimitsHook'

export function CreateChainlinkAutomationModal() {
  const {
    contacts,
    setSearchContacts,
    contactsIsLoading,
    control,
    searchContacts,
    safeTokensData,
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
  } = useSpendingLimitsHook()

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
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Create chainlink automation
          </DialogModal.Title>

          <DialogModal.Description className="text-lg text-center">
            Automate you safe key smart contract payment functions
          </DialogModal.Description>
        </DialogModal.Header>

        <Tabs.Root defaultValue="time-based">
          <Tabs.List
            aria-label="Create smart safe automations with chainlink"
            className="w-full min-h-[2.75rem] text-center text-sm"
          >
            <Tabs.Trigger value="time-based" className="max-w-[8rem]">
              Time based
            </Tabs.Trigger>

            <Tabs.Trigger value="custom-logic" className="max-w-[8rem]">
              Custom logic
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="time-based">
            <form
              onSubmit={handleSubmit(onSubmitCreateSpendingLimits)}
              className="w-full flex flex-col justify-center items-stretch"
            >
              <div className="w-full flex flex-col justify-center items-stretch gap-6 py-8 px-4 sm:px-8">
                <div className="flex flex-col gap-1 group">
                  <TextInput.Root
                    htmlFor="contactAddress"
                    error={errors.contactAddress?.message}
                    onClick={() =>
                      document
                        .getElementById('select-contact-id')
                        ?.classList.remove('!hidden')
                    }
                  >
                    <TextInput.Label>Wallet address</TextInput.Label>

                    <Skeleton
                      isLoading={contactsIsLoading}
                      className="w-full h-12"
                    >
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
                            placeholder="Enter wallet address"
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

                {!!safeTokensData && (
                  <Controller
                    name="coinSymbol"
                    control={control}
                    defaultValue={safeTokensData[0].symbol}
                    render={({ field: { onChange, value, ref, ...props } }) => (
                      <SelectInput.Root
                        {...props}
                        onValueChange={onChange}
                        value={value}
                        ref={ref}
                        className="w-full"
                        labelText="Token"
                      >
                        <SelectInput.Trigger className="min-h-[3rem] py-1 bg-white dark:bg-black" />

                        <SelectInput.Content className="bg-white dark:bg-black">
                          <SelectInput.Group>
                            {safeTokensData.map(token => (
                              <SelectInput.Item
                                key={token.symbol}
                                value={token.symbol}
                                className="min-h-[3rem] py-1"
                              >
                                <div className="w-full flex items-center justify-start gap-2">
                                  <Image
                                    src={token.icon}
                                    alt={`${token.symbol} coin`}
                                    width={28}
                                    height={28}
                                    className="w-7 h-7"
                                  />

                                  <Text className="text-xl font-bold dark:text-white uppercase">
                                    {token.symbol}
                                  </Text>
                                </div>
                              </SelectInput.Item>
                            ))}
                          </SelectInput.Group>
                        </SelectInput.Content>
                      </SelectInput.Root>
                    )}
                  />
                )}

                <TextInput.Root htmlFor="amount" error={errors.amount?.message}>
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

                <Controller
                  name="fromDate"
                  control={control}
                  defaultValue={TIME_BASED_TRIGGERS[0]}
                  render={({ field: { onChange, value, ref, ...props } }) => (
                    <SelectInput.Root
                      {...props}
                      onValueChange={onChange}
                      value={value}
                      ref={ref}
                      className="w-full"
                      labelText="Time trigger"
                    >
                      <SelectInput.Trigger className="min-h-[3rem] py-1 bg-white dark:bg-black" />

                      <SelectInput.Content className="bg-white dark:bg-black">
                        <SelectInput.Group>
                          {TIME_BASED_TRIGGERS.map(trigger => (
                            <SelectInput.Item
                              key={trigger.replace(/\s/g, '')}
                              value={trigger}
                              className="min-h-[3rem] py-1"
                            >
                              <div className="w-full flex items-center justify-start gap-2">
                                <Text>{trigger}</Text>
                              </div>
                            </SelectInput.Item>
                          ))}
                        </SelectInput.Group>
                      </SelectInput.Content>
                    </SelectInput.Root>
                  )}
                />
              </div>

              <DialogModal.Footer>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Create automation
                </Button>
              </DialogModal.Footer>
            </form>
          </Tabs.Content>

          <Tabs.Content value="custom-logic">
            <div className="w-full h-[25rem] flex flex-col justify-start items-stretch gap-6 py-8 px-4 sm:px-8">
              <div className="w-full flex items-center justify-start gap-2">
                <Wrench className="w-5 h-5 text-gray-500" />

                <Text className="text-gray-500">Under development</Text>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
