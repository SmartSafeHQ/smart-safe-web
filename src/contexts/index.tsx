import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './AuthContext'

import { queryClient } from '@lib/reactQuery'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>

      <ToastContainer position="top-right" theme="colored" />
    </QueryClientProvider>
  )
}
