import Head from 'next/head'
import { Lock } from 'phosphor-react'
import Link from 'next/link'

import { useResetPassword } from '@hooks/accounts/useResetPassword'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'

export default function ResetPassword() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register,
    formattedEmail
  } = useResetPassword()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>Reset password | Tokenverse</title>
        <meta name="description" content="Reset password to Tokenverse" />
      </Head>

      <header className="flex flex-col items-center">
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="mt-4 text-xl text-gray-500">Reset password</Heading>

        <Text asChild className="max-w-lg text-md mt-5 text-gray-400">
          <p>
            We have sent a code to: {formattedEmail}. Enter it below to reset
            your password
          </p>
        </Text>
      </header>

      <main className="w-full max-w-lg mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root
            htmlFor="code"
            labelText="Verification code"
            error={errors.code?.message}
          >
            <TextInput.Input
              {...register('code')}
              required
              type="code"
              id="code"
              placeholder="Enter code"
            />
          </TextInput.Root>

          <TextInput.Root
            htmlFor="password"
            labelText="Password"
            error={errors.password?.message}
          >
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>

            <TextInput.Input
              {...register('password')}
              required
              type="password"
              id="password"
              placeholder="Enter your new password"
            />
          </TextInput.Root>

          <TextInput.Root
            htmlFor="password-confirmation"
            labelText="Password confirmation"
            error={errors.confirmPassword?.message}
          >
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>

            <TextInput.Input
              {...register('confirmPassword')}
              required
              type="password"
              id="password-confirmation"
              placeholder="Confirm your password"
            />
          </TextInput.Root>

          <Button type="submit" isLoading={isSubmitting} className="mt-1">
            Reset
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text
          asChild
          className="w-full max-w-md text-md text-center text-gray-400 underline hover:dark:text-gray-300"
        >
          <Link href="/accounts/forgot-password">
            Didnt receive the code or entered the wrong email? <br />
            report your email again please
          </Link>
        </Text>
      </footer>
    </div>
  )
}
