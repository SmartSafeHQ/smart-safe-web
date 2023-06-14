import { Controller } from 'react-hook-form'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { ContactsTextInput } from '@components/Inputs/ContactsTextInput'

import { useAutomationsHook } from '@hooks/automations/useAutomationsHook'
import { AUTOMATION_TRIGGERS } from '@utils/web3/transactions/transactionQueue'
import { ContactProps } from '@contexts/ContactsContext'

export function TimeBasedAutomationForm() {
  const {
    contacts,
    control,
    safeTokensData,
    register,
    contactSearch,
    handleSubmit,
    errors,
    setValue,
    isSubmitting,
    onSubmitCreateAutomation
  } = useAutomationsHook()

  return (
    <form
      onSubmit={handleSubmit(onSubmitCreateAutomation)}
      className="w-full flex flex-1 flex-col justify-center items-stretch"
    >
      <div className="w-full flex flex-col justify-center items-stretch gap-6 py-6 px-4 sm:px-8">
        <ContactsTextInput.Root
          search={contactSearch}
          contactsList={contacts ?? []}
          handleSelectContact={(contact: ContactProps) =>
            setValue('to', contact.contactAddress)
          }
        >
          <ContactsTextInput.Input
            {...register('to')}
            required
            id="to"
            error={errors.to?.message}
            placeholder="Enter wallet address or contact name"
          />
        </ContactsTextInput.Root>

        {!!safeTokensData && (
          <Controller
            name="tokenSymbol"
            control={control}
            defaultValue={safeTokensData[0].symbol}
            render={({ field: { onChange, value, ref, ...props } }) => (
              <SelectInput.Root
                {...props}
                onValueChange={onChange}
                value={value}
                ref={ref}
                labelText="Token"
              >
                <SelectInput.Trigger className="h-12" />

                <SelectInput.Content>
                  <SelectInput.Group>
                    {safeTokensData.map(token => (
                      <SelectInput.Item
                        key={token.symbol}
                        value={token.symbol}
                        className="h-12"
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
              min="0"
              step={0.000001}
              placeholder="Enter the amount of tokens"
            />
          </TextInput.Content>
        </TextInput.Root>

        <Controller
          name="trigger"
          control={control}
          defaultValue="1"
          render={({ field: { onChange, value, ref, ...props } }) => (
            <SelectInput.Root
              {...props}
              onValueChange={onChange}
              value={String(value)}
              ref={ref}
              labelText="Time trigger"
            >
              <SelectInput.Trigger className="h-12" />

              <SelectInput.Content>
                <SelectInput.Group>
                  {[...AUTOMATION_TRIGGERS.keys()].map(trigger => (
                    <SelectInput.Item
                      key={trigger}
                      value={String(trigger)}
                      className="h-12"
                    >
                      <div>
                        <Text>
                          {AUTOMATION_TRIGGERS.get(trigger)?.description}
                        </Text>
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
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Create automation
        </Button>
      </DialogModal.Footer>
    </form>
  )
}
