import Head from 'next/head'
import Link from 'next/link'
import { Envelope } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'

import { useForgotPassword } from '@hooks/accounts/useForgotPassword'

export default function ForgotPassword() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register
  } = useForgotPassword()

  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>Recovery password | Tokenverse</title>
        <meta name="description" content="Recovery password Tokenverse" />
      </Head>

      <header className="flex flex-col items-center">
        <TokenverseTextLogo className="w-72 h-6" />

        <Heading className="text-xl mt-4 text-gray-500">
          Recovery password
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

          <Button type="submit" isLoading={isSubmitting} className="mt-1">
            Recovery
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text
          asChild
          className="text-lg text-gray-400 underline hover:dark:text-gray-300"
        >
          <Link href="/accounts/login">Back</Link>
        </Text>
      </footer>
    </div>
  )
}
