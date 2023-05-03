import { Fragment } from 'react'
import Head from 'next/head'
import clsx from 'clsx'
import { Inter } from '@next/font/google'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { AppProvider } from '@contexts/index'
import { AppPropsWithLayout } from '@utils/types'

import { DashboardLayout } from '@components/pages/Layouts/DashboardLayout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

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

      <div
        className={clsx(
          inter.variable,
          'min-w-screen min-h-screen flex flex-col font-sans'
        )}
      >
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </div>
    </AppProvider>
  )
}
