import { Controller } from 'react-hook-form'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSAWithdrawalAuthHook } from '@hooks/smartAccount/useSAWithdrawalAuthHook'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'

export function CreateWithdrawalAuthModal() {
  const {
    t,
    contacts,
    contactsIsLoading,
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmitCreateWithdrawal,
    isCreateWithdrawalOpen,
    setIsCreateWithdrawalOpen
  } = useSAWithdrawalAuthHook()

  const isoDateNow = new Date().toISOString().slice(0, 10)

  return (
    <DialogModal.Root
      open={isCreateWithdrawalOpen}
      onOpenChange={isOpen => {
        setIsCreateWithdrawalOpen(isOpen)
        reset()
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.saWithdrawalAuth.createAuthTitle}
            </DialogModal.Title>
          </header>

          <form
            onSubmit={handleSubmit(onSubmitCreateWithdrawal)}
            className="flex flex-col gap-6 items-stretch w-full"
          >
            <Controller
              name="contactAddress"
              control={control}
              render={({ field: { onChange, value, ref, ...props } }) => (
                <SelectInput.Root
                  {...props}
                  onValueChange={onChange}
                  value={value}
                  ref={ref}
                  className="w-full"
                  labelText={t.saWithdrawalAuth.contactLabel}
                >
                  <Skeleton
                    isLoading={contactsIsLoading}
                    className="w-full h-12"
                  >
                    {contacts && (
                      <>
                        <SelectInput.Trigger
                          placeholder={t.saWithdrawalAuth.contactPlaceholder}
                          className="min-h-[3rem] py-1 bg-gray-50 dark:bg-gray-900"
                        />

                        <SelectInput.Content className="bg-gray-50 dark:bg-gray-900">
                          <SelectInput.Group>
                            {contacts.map(contact => (
                              <SelectInput.Item
                                key={contact.id}
                                value={contact.wallet.address}
                                className="min-h-[3rem] py-2"
                              >
                                <div className="flex flex-col items-stretch justify-start gap-1">
                                  <Text asChild className="text-start">
                                    <strong>{contact.name}</strong>
                                  </Text>

                                  <Text className="w-min text-sm capitalize text-gray-500 dark:text-gray-300">
                                    {contact.wallet.formattedAddress}
                                  </Text>
                                </div>
                              </SelectInput.Item>
                            ))}
                          </SelectInput.Group>
                        </SelectInput.Content>
                      </>
                    )}
                  </Skeleton>
                </SelectInput.Root>
              )}
            />

            <Controller
              name="coinSymbol"
              control={control}
              defaultValue={STABLE_COINS[0].symbol}
              render={({ field: { onChange, value, ref, ...props } }) => (
                <SelectInput.Root
                  {...props}
                  onValueChange={onChange}
                  value={value}
                  ref={ref}
                  className="w-full"
                  labelText={t.saWithdrawalAuth.coinLabel}
                >
                  <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-50 dark:bg-gray-900" />

                  <SelectInput.Content className="bg-gray-50 dark:bg-gray-900">
                    <SelectInput.Group>
                      {STABLE_COINS.map(coin => (
                        <SelectInput.Item
                          key={coin.symbol}
                          value={coin.symbol}
                          className="min-h-[3rem] py-1"
                        >
                          <div className="w-full flex items-center justify-start gap-2">
                            <Image
                              src={coin.avatar}
                              alt={`${coin.symbol} coin`}
                              width={28}
                              height={28}
                              className="w-7 h-7"
                            />

                            <Text className="text-xl font-bold dark:text-gray-50 uppercase">
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
              <TextInput.Label>
                {t.saWithdrawalAuth.amountLabel}
              </TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  {...register('amount', {
                    valueAsNumber: true
                  })}
                  required
                  id="amount"
                  type="number"
                  min={0.0}
                  step={0.1}
                  placeholder={t.saWithdrawalAuth.amountPlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root
              htmlFor="fromDate"
              variant="secondary"
              error={errors.fromDate?.message}
            >
              <TextInput.Label>{t.saWithdrawalAuth.fromLabel}</TextInput.Label>

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
                  placeholder={t.saWithdrawalAuth.fromPlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              {t.saWithdrawalAuth.createAuthButton}
            </Button>
          </form>
        </div>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
