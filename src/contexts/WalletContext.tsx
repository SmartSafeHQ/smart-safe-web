import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { formatWalletAddress } from '@utils/web3'

type WalletProviderProps = PropsWithChildren<Record<string, unknown>>

interface WalletContextData {
  formattedAddress: string | null
}

const WalletContext = createContext({} as WalletContextData)

export function WalletProvider({ children }: WalletProviderProps) {
  const [{ wallet }] = useConnectWallet()
  const [formattedAddress, setFormattedAddress] = useState<string | null>(null)

  useEffect(() => {
    if (!wallet || wallet?.accounts.length === 0) return

    const formattedAddress = formatWalletAddress({
      walletAddress: wallet.accounts[0].address
    })

    setFormattedAddress(formattedAddress)
  }, [wallet?.accounts])

  return (
    <WalletContext.Provider
      value={{
        formattedAddress
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
