import { Controller, FormProvider } from 'react-hook-form'

import { OwnersConfig } from '@components/pages/CreateSafe/DeploySafeForm/OwnersConfig'
import { NetworkFeeEst } from '@components/pages/CreateSafe/DeploySafeForm/NetworkFeeEst'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

import { useDeploySafeHook } from '@hooks/createSafe/useDeploySafeHook'

export function DeploySafeForm() {
  const {
    wallet,
    safeInfos,
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    ownersFields,
    register,
    removeOwner,
    addOwner,
    watch,
    control,
    isSubmitting
  } = useDeploySafeHook()

  if (!wallet || !safeInfos) return null

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-stretch justify-start gap-4 relative"
      >
        <TextInput.Root htmlFor="name" error={errors.name?.message}>
          <TextInput.Label>Safe name</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('name')}
              required
              id="name"
              defaultValue={safeInfos.name}
              placeholder="Enter your safe name"
            />
          </TextInput.Content>
        </TextInput.Root>

        <OwnersConfig
          ownersFields={ownersFields}
          addOwner={addOwner}
          removeOwner={removeOwner}
        />

        <div className="flex flex-col justify-start items-stretch gap-4">
          <div className="flex flex-col justify-start items-stretch">
            <Text
              asChild
              className="text-lg leading-9 font-semibold text-zinc-800 dark:text-zinc-100"
            >
              <strong>
                Transaction confirmation ({watch('threshold', '1')} of{' '}
                {ownersFields.length})
              </strong>
            </Text>

            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Owners confirmations needed to run a transaction
            </Text>
          </div>

          <Controller
            name="threshold"
            control={control}
            defaultValue="1"
            render={({ field: { value, onChange, ref, ...props } }) => (
              <SelectInput.Root
                {...props}
                onValueChange={onChange}
                value={value}
                ref={ref}
              >
                <SelectInput.Trigger className="h-10" />

                <SelectInput.Content>
                  <SelectInput.Group>
                    {ownersFields.map((owner, index) => (
                      <SelectInput.Item
                        key={`${owner.name}-${index}`}
                        value={String(index + 1)}
                        className="h-9"
                      >
                        <div>
                          <Text>{index + 1}</Text>
                        </div>
                      </SelectInput.Item>
                    ))}
                  </SelectInput.Group>
                </SelectInput.Content>
              </SelectInput.Root>
            )}
          />

          <NetworkFeeEst />
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Create safe
        </Button>
      </form>
    </FormProvider>
  )
}
