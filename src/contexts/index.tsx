import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import { WalletContextProvider } from './WalletContext'

import { queryClient } from '@lib/reactQuery'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        enableColorScheme
      >
        <WalletContextProvider>{children}</WalletContextProvider>
      </ThemeProvider>

      <ToastContainer position="top-right" theme="colored" />
    </QueryClientProvider>
  )
}
