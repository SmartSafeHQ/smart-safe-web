import { useEffect, useState } from 'react'
import { clusterApiUrl, Connection } from '@solana/web3.js'

import type { PublicKey } from '@solana/web3.js'

export function useSolana() {
  const [client, setClient] = useState<Connection>()

  async function getBalance(account: PublicKey) {
    try {
      const balance = await client?.getBalance(account)

      return balance || 0
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const client = new Connection(clusterApiUrl('testnet'))

    setClient(client)
  }, [])

  return { client, getBalance }
}
