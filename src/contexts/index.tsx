import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'

import { queryClient } from '@lib/reactQuery'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>

      <ToastContainer position="top-right" theme="colored" />
    </QueryClientProvider>
  )
}
