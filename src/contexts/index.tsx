import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import { Web3OnboardContextProvider } from '@contexts/Web3OnboardContext'
import { WalletProvider } from '@contexts/WalletContext'

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
        <Web3OnboardContextProvider>
          <WalletProvider>{children}</WalletProvider>
        </Web3OnboardContextProvider>
      </ThemeProvider>

      <ToastContainer position="top-right" theme="colored" />
    </QueryClientProvider>
  )
}
