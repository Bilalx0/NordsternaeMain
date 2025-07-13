'use client'

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import "@fontsource/lato"
import "@fontsource-variable/roboto-flex"
import theme from '../theme/theme'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {

    const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
    </QueryClientProvider>
  )
}