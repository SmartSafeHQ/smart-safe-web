import { useState, useEffect, useCallback } from 'react'

import { useProvider } from './useProvider'

import type { Signer } from 'ethers'
import type { Provider } from '@ethersproject/providers'

export type TypechainBaseContractFactory<T> = {
  connect(_address: string, _signerOrProvider: Signer | Provider): T
}

type Props = {
  contractAddress: string
  contractName: string
  networkRpcUrl: string
}

export function useContract<T>({
  contractAddress,
  contractName,
  networkRpcUrl
}: Props) {
  const [contract, setContract] = useState<T>()

  const { provider } = useProvider({ networkRpcUrl })

  const initializeContract = useCallback(async () => {
    if (!provider) {
      return
    }

    try {
      const importedContractFactory = await import(
        `@utils/web3/typings/factories/${contractName}__factory.ts`
      )
      const contractFactory = importedContractFactory[
        `${contractName}__factory`
      ] as TypechainBaseContractFactory<T>
      const contract = contractFactory.connect(contractAddress, provider)

      setContract(contract)
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
