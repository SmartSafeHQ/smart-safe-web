import Head from 'next/head'

import { useSignupActivate } from '@hooks/accounts/useSignupActivate'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'

export default function SignupActivate() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    resendConfirmCode,
    register,
    email,
    formattedEmail
  } = useSignupActivate()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>Signup Activate | Tokenverse</title>
        <meta name="description" content="Signup activation to Tokenverse" />
      </Head>

      <header className="flex flex-col items-center">
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="mt-4 text-xl text-gray-500">
          Activate your account
        </Heading>

        <Text asChild className=" max-w-lg mt-5 text-md text-gray-400">
          <p>
            We have sent a code to: {formattedEmail}. Enter it below to confirm
            your account
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

          <Button type="submit" isLoading={isSubmitting} className="mt-1">
            Activate
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={() => resendConfirmCode(String(email))}
          className="text-gray-400 hover:dark:text-gray-300"
        >
          Send code again
        </button>
      </footer>
    </div>
  )
}
