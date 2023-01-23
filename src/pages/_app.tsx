import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import { AppProvider } from '@contexts/index'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-w-screen min-h-screen flex flex-col">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}
