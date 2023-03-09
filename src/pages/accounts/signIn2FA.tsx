import Head from 'next/head'
import Image from 'next/image'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'
import { useSignIn2FA } from '@hooks/accounts/useSignIn2FA'

export default function SignIn2FA() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register,
    formattedEmail
  } = useSignIn2FA()
  const { handleLanguageSwitch, t } = useI18n()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>{t.signIn2FA.headTitle}</title>
        <meta name="description" content={t.signIn2FA.headDescription} />
      </Head>

      <header className="flex flex-col items-center">
        <InWalletTextLogo className="w-72 h-14" />

        <Heading className="mt-4 text-xl text-gray-600 dark:text-gray-500">
          {t.signIn2FA.title}
        </Heading>

        <Text
          asChild
          className=" max-w-lg mt-5 text-center text-md text-gray-800 dark:text-gray-400"
        >
          <p>
            {t.signIn2FA.descriptionSub01} {formattedEmail}. <br />
            {t.signIn2FA.descriptionSub02}
          </p>
        </Text>
      </header>

      <main className="w-full max-w-lg mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root htmlFor="code" error={errors.code?.message}>
            <TextInput.Label>{t.signIn2FA.code}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                {...register('code')}
                required
                type="number"
                id="code"
                placeholder={t.signIn2FA.codePlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="flex gap-2">
            <div
              className="relative w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden cursor-pointer transition-all hover:brightness-90"
              onClick={() => handleLanguageSwitch('pt')}
            >
              <Image
                src="/languages/br.svg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div
              className="relative w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden cursor-pointer transition-all hover:brightness-90"
              onClick={() => handleLanguageSwitch('en')}
            >
              <Image
                src="/languages/us.svg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} className="mt-2">
            {t.signIn.login}
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <button
          // onClick={() => resendConfirmCode(String(email))}
          className="text-gray-800 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-300"
        >
          {t.signIn2FA.sendAgain}
        </button>
      </footer>
    </div>
  )
}
