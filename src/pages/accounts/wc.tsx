import Head from 'next/head'
import { Link, QrCode } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'
import { LoginModal } from '@components/pages/Accounts/LoginModal'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { QrCodeReader } from '@components/QrCodeReader'

import { useWcLogin } from '@hooks/accounts/useWcLogin'

export default function WalletconnectLogin() {
  const {
    setIsSignInModalOpen,
    isQrScanOpen,
    setIsQrScanOpen,
    isSignInModalOpen,
    formState: { errors, isSubmitting },
    handleSubmit,
    handleScan,
    onSubmit,
    register
  } = useWcLogin()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3">
      <DialogModal.Root open={isSignInModalOpen} modal={false}>
        <Head>
          <title>Wc login</title>
          <meta name="description" content="Wc login tokenverse" />
        </Head>

        <header className="flex flex-col items-center">
          <TokenverseTextLogo className="w-72 h-6" />

          <Heading className="mt-4 text-xl text-gray-600 dark:text-gray-500">
            Login with wallet connect
          </Heading>
        </header>

        <main className="w-full max-w-lg mt-8 flex flex-col items-center gap-6">
          <div className="w-full max-h-[20rem] p-8 flex flex-col items-center justify-center gap-4 rounded-md bg-gray-800 border-1 border-black">
            {isQrScanOpen ? (
              <QrCodeReader
                constraints={{ width: 420, height: 240 }}
                onResult={handleScan}
              />
            ) : (
              <>
                <QrCode className="w-48 h-48 text-gray-300" />

                <Button onClick={() => setIsQrScanOpen(true)}>
                  Scan QR code
                </Button>
              </>
            )}
          </div>

          <div className="w-full flex items-center gap-2">
            <hr className="w-full h-[1px] border-gray-600" />

            <Text className="w-72 text-gray-500 font-medium">
              or type the uri
            </Text>

            <hr className="w-full h-[1px] border-gray-600" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex items-start gap-2"
          >
            <TextInput.Root
              htmlFor="uri"
              className="w-full"
              error={errors.uri?.message}
            >
              <TextInput.Content>
                <TextInput.Icon>
                  <Link />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('uri')}
                  required
                  id="uri"
                  placeholder="Type the uri"
                />
              </TextInput.Content>
            </TextInput.Root>

            <Button
              type="submit"
              className="h-full max-w-[8rem]"
              isLoading={isSubmitting}
            >
              Connect
            </Button>
          </form>
        </main>

        <LoginModal setIsOpen={setIsSignInModalOpen} />
      </DialogModal.Root>
    </div>
  )
}
