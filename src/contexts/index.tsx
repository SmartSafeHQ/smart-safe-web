import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
