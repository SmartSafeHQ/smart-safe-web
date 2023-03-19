import Head from 'next/head'
import { Link, QrCode } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { SessionApproval } from '@components/pages/Accounts/SessionApproval'
import { SignMessage } from '@components/pages/Accounts/SignMessage'
import { LoginModal } from '@components/pages/Accounts/LoginModal'
import { QrCodeReader } from '@components/QrCodeReader'
import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'

import { useWcLogin } from '@hooks/accounts/useWcLogin'

export default function WalletconnectLogin() {
  const {
    t,
    signClient,
    customer,
    cognitoUser,
    sessionSignData,
    setSessionSignData,
    sessionData,
    setSessionData,
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
      <Head>
        <title>{t.wc.headTitle}</title>
        <meta name="description" content={t.wc.headContent} />
      </Head>

      <header className="flex flex-col items-center">
        <InWalletTextLogo className="w-72 h-14" />

        <Heading className="mt-4 text-xl text-gray-600 dark:text-gray-500">
          {t.wc.heading}
        </Heading>
      </header>

      <main className="w-full max-w-md mt-8 flex flex-col items-center gap-6">
        <div className="w-full h-[20rem] max-w-[25rem] flex flex-col items-center justify-center gap-5 rounded-md bg-gray-200 dark:bg-gray-800">
          {isQrScanOpen === 'open' ? (
            <div className="w-full overflow-hidden flex flex-1 flex-col items-center justify-center">
              <QrCodeReader
                onResult={handleScan}
                constraints={{ video: { width: 400, height: 320 } }}
              />
            </div>
          ) : isQrScanOpen === 'loading' ? (
            <div className="w-[420px] h-[320px] flex flex-col gap-4 items-center justify-center">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-foregroundAccent1"></div>
              </div>

              <p className="text-center">{t.wc.grantAccess}</p>
            </div>
          ) : (
            <div className="p-8 w-full flex flex-1 flex-col items-center justify-between gap-4">
              <QrCode className="w-52 h-52 text-gray-600 dark:text-gray-50" />

              <Button
                className="w-1/2"
                onClick={async () => {
                  setIsQrScanOpen('loading')
                  await window.navigator.mediaDevices.getUserMedia({
                    video: { width: 420, height: 320 }
                  })
                  setIsQrScanOpen('open')
                }}
              >
                {t.wc.scanQRCode}
              </Button>
            </div>
          )}
        </div>

        <div className="w-full flex items-center gap-2">
          <hr className="w-full h-[1px] border-gray-600" />

          <Text className="text-center w-72 text-gray-500 font-medium">
            {t.wc.typeTheUri}
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
                placeholder={t.wc.typeUriPlaceHolder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <Button
            type="submit"
            className="h-full max-w-[8rem]"
            isLoading={isSubmitting}
          >
            {t.wc.connect}
          </Button>
        </form>
      </main>

      <LoginModal isOpen={isSignInModalOpen} setIsOpen={setIsSignInModalOpen} />

      <Verify2FAModal isOpen={cognitoUser && !cognitoUser.signInUserSession} />

      <SessionApproval
        sessionData={sessionData}
        signClient={signClient}
        isOpen={sessionData?.isModalOpen ?? false}
        customerName={customer?.name}
        customerWallet={customer?.wallets.evm.address}
        setSessionData={setSessionData}
      />

      <SignMessage
        customerName={customer?.name}
        appName={sessionData?.name}
        sessionSignData={sessionSignData}
        avatar={sessionData?.avatarUrl}
        url={sessionData?.url}
        isOpen={sessionSignData?.isModalOpen ?? false}
        signClient={signClient}
        setSessionSignData={setSessionSignData}
      />
    </div>
  )
}
