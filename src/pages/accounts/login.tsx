import Head from 'next/head'
import Image from 'next/image'
import { Envelope, Lock } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { InWalletTextLogo } from '@/components/Logos/InWalletTextLogo'

import { useLogin } from '@hooks/accounts/useLogin'

import { useI18n } from '@hooks/useI18n'

export default function Login() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register,
    handleSignupWidget
  } = useLogin()
  const { handleLanguageSwitch, t } = useI18n()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>{t.signIn.headTitle}</title>
        <meta name="description" content={t.signIn.headDescription} />
      </Head>

      <header className="flex flex-col items-center">
        <InWalletTextLogo className="w-72 h-14" />

        <Heading className="mt-4 text-xl text-gray-600 dark:text-gray-500">
          {t.signIn.title}
        </Heading>
      </header>

      <main className="w-full max-w-lg mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root htmlFor="email" error={errors.email?.message}>
            <TextInput.Label>{t.signIn.email}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Icon>
                <Envelope />
              </TextInput.Icon>

              <TextInput.Input
                {...register('email')}
                required
                type="email"
                id="email"
                placeholder={t.signIn.emailPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <TextInput.Root htmlFor="password" error={errors.password?.message}>
            <TextInput.Label>{t.signIn.password}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Icon>
                <Lock />
              </TextInput.Icon>

              <TextInput.Input
                {...register('password')}
                required
                type="password"
                id="password"
                placeholder="************"
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="flex gap-2 justify-between">
            <button
              type="button"
              onClick={handleSignupWidget}
              className="text-left text-md text-cyan-500 dark:text-cyan-400 font-semibold hover:text-cyan-400 hover:dark:text-cyan-300"
            >
              {t.signIn.forgotPassword}
            </button>

            <div className="flex gap-2">
              <div
                className="relative w-[25px] h-[25px] rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105"
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
                className="relative w-[25px] h-[25px] rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105"
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
          </div>

          <Button type="submit" isLoading={isSubmitting} className="mt-1">
            {t.signIn.login}
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={handleSignupWidget}
          className="text-lg text-gray-700 dark:text-gray-300 font-medium underline transition-colors hover:text-gray-900 hover:dark:text-gray-100"
        >
          {t.signIn.createAccount}
        </button>
      </footer>
    </div>
  )
}
