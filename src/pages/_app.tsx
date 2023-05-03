import { Fragment } from 'react'
import Head from 'next/head'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { AppProvider } from '@contexts/index'
import { AppPropsWithLayout } from '@/utils/types'

import { DashboardLayout } from '@components/pages/Layouts/DashboardLayout'
import { WalletHeader } from '@components/WalletHeader'

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

      <div className="min-w-screen min-h-screen flex flex-col">
        <LayoutComponent>
          <WalletHeader />

          <Component {...pageProps} />
        </LayoutComponent>
      </div>
    </AppProvider>
  )
}
