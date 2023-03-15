import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './AuthContext'

import { queryClient } from '@lib/reactQuery'
import { wagmiClient } from '@lib/wagmi'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            enableColorScheme
          >
            {children}
          </ThemeProvider>
        </AuthProvider>

        <ToastContainer position="top-right" theme="colored" />
      </WagmiConfig>
    </QueryClientProvider>
  )
}
