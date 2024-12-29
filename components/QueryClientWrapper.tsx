'use client'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/queryClient'

export default function QueryClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

