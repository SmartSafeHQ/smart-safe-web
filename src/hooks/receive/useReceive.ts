import { toast } from 'react-toastify'

import { useAuth } from '@contexts/AuthContext'

export const useReceive = () => {
  const { customer } = useAuth()

  async function handleCopyWalletAddress() {
    await navigator.clipboard.writeText(customer?.wallet.address ?? '')

    toast.info('Address copied to clipboard', {
      position: 'bottom-center',
      hideProgressBar: true,
      autoClose: 2000
    })
  }

  function handleShareQrCode() {
    console.log('share')
  }

  return {
    handleCopyWalletAddress,
    handleShareQrCode
  }
}
