import { QRCodeCanvas } from 'qrcode.react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

export function EnableSigIn2FAModal() {
  return (
    <DialogModal.Content className="md:max-w-[36rem]">
      <header className="text-left w-full flex items-start flex-col gap-3 mb-6 pt-6 px-2">
        <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
          Register 2FA
        </DialogModal.Title>

        <DialogModal.Description className="text-gray-700 dark:text-gray-300">
          Scan the image above with the two-factor authentication app on your
          phone
        </DialogModal.Description>
      </header>

      <section className="w-full flex flex-col gap-4 items-stretch">
        <div className="w-full flex flex-col gap-4 items-center justify-center mb-4 rounded-md">
          <QRCodeCanvas value="{selectedWallet.wallet}" size={240} />
        </div>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              After scanner the barcode image, the app will display a six-digit
              code. Enter it bellow to verify the setup
            </p>
          </Text>

          <TextInput.Root
            htmlFor="code"
            // error={errors.code?.message}
            variant="secondary"
          >
            <TextInput.Label className="text-gray-800 dark:text-gray-50">
              Enter the six-digits code from the application
            </TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                // {...register('code')}
                required
                type="number"
                id="code"
                placeholder="Enter the code"
              />
            </TextInput.Content>
          </TextInput.Root>

          <Button
            type="submit"
            // isLoading={isSubmitting}
            className="mt-2"
          >
            Enable
          </Button>
        </form>
      </section>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
