import Head from 'next/head'
import { Link, QrCode } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'
import { SessionApproval } from '@components/pages/Accounts/SessionApproval'
import { SignMessage } from '@components/pages/Accounts/SignMessage'
import { LoginModal } from '@components/pages/Accounts/LoginModal'
import { QrCodeReader } from '@components/QrCodeReader'

import { useWcLogin } from '@hooks/accounts/useWcLogin'

export default function WalletconnectLogin() {
  const {
    t,
    customer,
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
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="mt-4 text-xl text-gray-600 dark:text-gray-500">
          {t.wc.heading}
        </Heading>
      </header>

      <main className="w-full max-w-lg mt-8 flex flex-col items-center gap-6">
        <div className="w-full max-h-[20rem] py-6 px-8 flex flex-col items-center justify-center gap-5 rounded-md bg-gray-200 dark:bg-gray-800 border-1">
          {isQrScanOpen ? (
            <QrCodeReader
              constraints={{ width: 420, height: 240 }}
              onResult={handleScan}
            />
          ) : (
            <>
              <QrCode className="w-48 h-48 text-gray-600 dark:text-gray-300" />

              <Button onClick={() => setIsQrScanOpen(true)}>
                {t.wc.scanQRCode}
              </Button>
            </>
          )}
        </div>

        <div className="w-full flex items-center gap-2">
          <hr className="w-full h-[1px] border-gray-600" />

          <Text className="w-72 text-gray-500 font-medium">
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

      <SessionApproval
        customerName={customer?.name}
        customerWallet={customer?.wallet.address}
        appName={'Magic Eden'}
        description={'nft, solana, marketplace, crypto'}
        avatar={'https://opensea.io/static/images/favicon/180x180.png'}
        url={'https://magiceden.io'}
        isOpen={false}
        setIsOpen={() => {
          console.log('set')
        }}
      />

      <SignMessage
        customerName={customer?.name}
        appName={'Magic Eden'}
        message={
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate quas, facilis molestias amet architecto fugiat repudiandae quos placeat pariatur consequatur incidunt temporibus debitis recusandae ipsa!'
        }
        avatar={'https://opensea.io/static/images/favicon/180x180.png'}
        url={'https://magiceden.io'}
        blockchain="ethereum"
        isOpen={false}
        setIsOpen={() => {
          console.log('set')
        }}
      />
    </div>
  )
}
