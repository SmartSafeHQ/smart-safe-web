import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { Web3OnboardProvider } from '@web3-onboard/react'

import { WalletProvider } from '@contexts/WalletContext'

import { queryClient } from '@lib/reactQuery'
import web3Onboard from '@utils/web3/web3Onboard'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          enableColorScheme
        >
          <WalletProvider>{children}</WalletProvider>
        </ThemeProvider>
      </Web3OnboardProvider>

      <ToastContainer position="top-right" theme="colored" />
    </QueryClientProvider>
  )
}
