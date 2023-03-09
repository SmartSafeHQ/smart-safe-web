import dynamic from 'next/dynamic'

import { Fragment, Suspense } from 'react'
import Head from 'next/head'
import { Amplify } from 'aws-amplify'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { DashboardLayout } from '@components/pages/Layouts/DashboardLayout'

import { amplifyConfig } from '@lib/amplify'
import { AppProvider } from '@contexts/index'

import type { AppProps } from 'next/app'

Amplify.configure(amplifyConfig)

const TokenverseWidget = dynamic(
  async () => {
    const component = await import('@components/TokenverseWidget')

    return component.TokenverseWidget
  },
  { ssr: false }
)

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const isDashboardLayoutNeeded =
    appProps.router.pathname.startsWith('/dashboard')

  const LayoutComponent = isDashboardLayoutNeeded ? DashboardLayout : Fragment

  return (
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Suspense>
        <TokenverseWidget />
      </Suspense>

      <div className="min-w-screen min-h-screen flex flex-col">
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </div>
    </AppProvider>
  )
}
