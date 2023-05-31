import { Fragment } from 'react'
import Head from 'next/head'
import clsx from 'clsx'
import { Inter } from '@next/font/google'
import { Amplify } from 'aws-amplify'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { DashboardLayout } from '@components/pages/Layouts/DashboardLayout'

import { AppProvider } from '@contexts/index'
import { AppPropsWithLayout } from '@utils/types'
import { amplifyConfig } from '@lib/amplify'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
})

Amplify.configure(amplifyConfig)

export default function App({
  Component,
  pageProps,
  ...appProps
}: AppPropsWithLayout) {
  const isDashboardLayoutNeeded =
    appProps.router.pathname.startsWith('/dashboard')

  const LayoutComponent = isDashboardLayoutNeeded ? DashboardLayout : Fragment

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className={clsx(
          inter.variable,
          'min-w-screen min-h-screen flex flex-col font-sans'
        )}
      >
        <LayoutComponent>
          {getLayout(<Component {...pageProps} />)}
        </LayoutComponent>
      </div>
    </AppProvider>
  )
}
