import Head from 'next/head'
import Link from 'next/link'
import { User, Envelope, Lock } from 'phosphor-react'

import { useSignup } from '@hooks/accounts/useSignup'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'

export default function Signup() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register
  } = useSignup()

  return (
    <div className="min-h-screen py-3 flex flex-col items-center justify-center px-3">
      <Head>
        <title>Signup | Tokenverse</title>
        <meta name="description" content="Signup to Tokenverse" />
      </Head>

      <header className="flex flex-col items-center">
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="text-lg mt-4 text-gray-500">
          Signup to use the easy Web3
        </Heading>
      </header>

      <main className="w-full max-w-lg mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root
            htmlFor="name"
            labelText="Name"
            error={errors.name?.message}
          >
            <TextInput.Icon>
              <User className="font-bold" />
            </TextInput.Icon>

            <TextInput.Input
              {...register('name')}
              required
              id="name"
              placeholder="Enter your name"
            />
          </TextInput.Root>

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
              placeholder="Enter your password"
            />
          </TextInput.Root>

          <TextInput.Root
            htmlFor="confirm-password"
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
              id="confirm-password"
              placeholder="Confirm your password"
            />
          </TextInput.Root>

          <Button type="submit" isLoading={isSubmitting} className="mt-4">
            Signup
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text
          asChild
          className="text-lg text-gray-400 underline hover:dark:text-gray-300"
        >
          <Link href="/accounts/login">Already have an account? Login!</Link>
        </Text>
      </footer>
    </div>
  )
}
