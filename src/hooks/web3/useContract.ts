import type { Signer } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import type { Provider } from '@ethersproject/providers'

import { useProvider } from './useProvider'

type BaseContractFactory<T> = {
  connect(_address: string, _signerOrProvider: Signer | Provider): T
}

type Props = {
  contractAddress: string
  contractName: string
  networkRpcUrl: string
}

export function useContract<T extends BaseContractFactory<T>>({
  contractAddress,
  contractName,
  networkRpcUrl
}: Props) {
  const [contract, setContract] = useState<T>()

  const { provider } = useProvider({ networkRpcUrl })

  const initializeContract = useCallback(async () => {
    try {
      const importModule = await import(
        `@utils/web3/typings/factories/${contractName}__factory.ts`
      )
      const contract = importModule[`${contractName}__factory`] as T

      setContract(contract.connect(contractAddress, provider as Provider) as T)
    } catch (err) {
      console.log(err)
    }
  }, [contractAddress, contractName, provider])

  useEffect(() => {
    if (provider) {
      initializeContract()
    }
  }, [provider, initializeContract])

  return { contract }
}
