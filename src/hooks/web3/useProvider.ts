import { useEffect, useState } from 'react'
import { providers } from 'ethers'

type Props = {
  networkRpcUrl: string
}

export function useProvider({ networkRpcUrl }: Props) {
  const [provider, setProvider] = useState<providers.JsonRpcProvider>()

  useEffect(() => {
    const provider = new providers.JsonRpcProvider(networkRpcUrl)

    setProvider(provider)
  }, [networkRpcUrl])

  return { provider }
}
