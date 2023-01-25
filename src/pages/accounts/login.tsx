import Head from 'next/head'
import Link from 'next/link'
import { Envelope, Lock } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'

import { useLogin } from '@hooks/accounts/useLogin'

export default function Login() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register
  } = useLogin()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>Login | Tokenverse</title>
        <meta name="description" content="Login to Tokenverse" />
      </Head>

      <header className="flex flex-col items-center">
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="mt-4 text-xl text-gray-500">
          Login and start using!
        </Heading>
      </header>

      <main className="w-full max-w-lg mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root
            htmlFor="email"
            labelText="E-mail address"
            error={errors.email?.message}
          >
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>

            <TextInput.Input
              {...register('email')}
              required
              type="email"
              id="email"
              placeholder="Enter your email"
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
              placeholder="************"
            />
          </TextInput.Root>

          <Text
            asChild
            className="text-md text-cyan-400 font-semibold hover:text-cyan-300"
          >
            <Link href="/accounts/forgot-password">Forgot my password</Link>
          </Text>

          <Button type="submit" isLoading={isSubmitting} className="mt-1">
            Login
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text
          asChild
          className="text-lg text-gray-400 underline hover:dark:text-gray-300"
        >
          <Link href="/accounts/signup">
            Don’t have an account? Create Now!
          </Link>
        </Text>
      </footer>
    </div>
  )
}
