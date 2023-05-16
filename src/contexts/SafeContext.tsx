import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  fetchAddressSafes,
  FetchAddressSafesOutput
} from '@hooks/safes/retrieve/queries/useAddressSafes'
import { formatWalletAddress } from '@utils/web3'
import { ChainSettings } from '@utils/web3/chains/supportedChains'
import { queryClient } from '@lib/reactQuery'

type SafeProviderProps = PropsWithChildren<Record<string, unknown>>

interface Safe {
  id: string
  name: string
  address: string
  formattedAddress: string
  ownerId: string
  ownerName: string
  chain: ChainSettings
}

interface SafeContextData {
  formattedOwnerAddress: string | null
  safe: Safe | null
}

const SafeContext = createContext({} as SafeContextData)

export function SafeProvider({ children }: SafeProviderProps) {
  const { query, replace, push } = useRouter()
  const [{ wallet }] = useConnectWallet()
  const [, setChain] = useSetChain()

  const [formattedOwnerAddress, setFormattedOwnerAddress] = useState<
    string | null
  >(null)
  const [safe, setSafe] = useState<Safe | null>(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (!wallet || wallet?.accounts.length === 0) return

    const formattedOwnerAddress = formatWalletAddress({
      walletAddress: wallet.accounts[0].address
    })

    setFormattedOwnerAddress(formattedOwnerAddress)
  }, [wallet?.accounts])

  // Workaround, lib doesnt support a wallet "isLoading" state, so need to check it with js timer
  // open issue on the @web3-onboard lib to support it!!
  useEffect(() => {
    if (wallet) return

    if (!wallet && counter > 0) {
      replace('/', '/')
      return
    }

    const timeout = setTimeout(() => {
      setCounter(counter + 1)
      return () => clearTimeout(timeout)
    }, 1000)
  }, [counter])

  useEffect(() => {
    const safeAddress = query.safeAddress

    if (!safeAddress) return

    if (!wallet) {
      setSafe(null)
      return
    }

    queryClient
      .ensureQueryData<FetchAddressSafesOutput[]>({
        queryKey: ['addressSafes', wallet.accounts[0].address],
        queryFn: () =>
          fetchAddressSafes({ address: wallet.accounts[0].address })
      })
      .then(async response => {
        const checkSafeExists = response.find(
          safe => safe.safeAddress === safeAddress
        )

        if (!checkSafeExists) {
          push('/')
          setSafe(null)
          return
        }

        const isWalletOnSafeChain =
          wallet.chains[0].id === checkSafeExists.chain.chainId

        if (!isWalletOnSafeChain) {
          const isChangedApproved = await setChain({
            chainId: checkSafeExists.chain.chainId
          })

          if (!isChangedApproved) {
            push('/').then(() =>
              toast.error(
                `Please connect to ${checkSafeExists.chain.networkName} to manage ${checkSafeExists.safeName} safe`
              )
            )
            setSafe(null)

            return
          }
        }

        setSafe({
          id: checkSafeExists.safeId,
          name: checkSafeExists.safeName,
          address: checkSafeExists.safeAddress,
          formattedAddress: checkSafeExists.safeFormattedAddress,
          ownerId: checkSafeExists.ownerId,
          ownerName: checkSafeExists.ownerName,
          chain: checkSafeExists.chain
        })
      })
      .catch(error => {
        console.log(error)

        push('/').then(() =>
          toast.error(
            'An unknown error occurred retrieving your safe information. Please try again.'
          )
        )

        setSafe(null)
      })
  }, [query.safeAddress, wallet])

  return (
    <SafeContext.Provider
      value={{
        formattedOwnerAddress,
        safe
      }}
    >
      {children}
    </SafeContext.Provider>
  )
}

export const useSafe = () => useContext(SafeContext)
