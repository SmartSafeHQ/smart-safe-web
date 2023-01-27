import { useEffect } from 'react'

import { useAuth } from '@contexts/AuthContext'

export function TokenverseWidget() {
  const { setWidgetProvider } = useAuth()

  useEffect(() => {
    import('@ricardo-passos-test/tokenverse-sdk/dist/index' as any).then(r => {
      const walletless = new r.Walletless({
        apiKey: 'pk_test',
        network: { chainId: 8001, rpcUrl: 'https://rpc-mumbai.maticvigil.com/' }
      })

      setWidgetProvider(walletless)
    })
  }, [])

  return <></>
}
