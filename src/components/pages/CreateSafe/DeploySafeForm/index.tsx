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
    remove,
    addNewOwner,
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
          addNewOwner={addNewOwner}
          remove={remove}
        />

        <div className="flex flex-col justify-start items-stretch gap-4">
          <div className="flex flex-col justify-start items-stretch">
            <Text
              asChild
              className="text-lg leading-9 font-semibold text-zinc-800 dark:text-zinc-100"
            >
              <strong>
                Transaction confirmation (
                {watch('requiredSignaturesCount', '1')} of {ownersFields.length}
                )
              </strong>
            </Text>

            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Owners confirmations needed to run a transaction
            </Text>
          </div>

          <Controller
            name="requiredSignaturesCount"
            control={control}
            defaultValue="1"
            render={({ field: { value, onChange, ref, ...props } }) => (
              <SelectInput.Root
                {...props}
                onValueChange={onChange}
                value={value}
                ref={ref}
                className="w-full flex flex-1"
              >
                <SelectInput.Trigger className="w-full h-10 px-3 text-left overflow-hidden rounded-md bg-white dark:bg-black capitalize border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

                <SelectInput.Content className="w-full border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                  <SelectInput.Group className="w-full">
                    {ownersFields.map((owner, index) => (
                      <SelectInput.Item
                        key={`${owner.name}-${index}`}
                        value={String(index + 1)}
                        className="w-full h-9 px-2 text-left overflow-hidden rounded-md capitalize pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                      >
                        <div className="flex items-center gap-3">
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
