import { Fragment, ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { Amplify } from 'aws-amplify'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { DashboardLayout } from '@components/pages/Layouts/DashboardLayout'

import { amplifyConfig } from '@lib/amplify'
import { AppProvider } from '@contexts/index'
import { TokenverseWidget } from '@components/TokenverseWidget'

import type { AppProps } from 'next/app'
import { NextPage } from 'next'

Amplify.configure(amplifyConfig)

export type NextPageWithLayout<P = Record<string, string>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps,
  ...appProps
}: AppPropsWithLayout) {
  const isDashboardLayoutNeeded =
    appProps.router.pathname.startsWith('/dashboard')

  const LayoutComponent = isDashboardLayoutNeeded ? DashboardLayout : Fragment

  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <TokenverseWidget />

      <div className="min-w-screen min-h-screen flex flex-col">
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </div>
    </AppProvider>
  )
}
