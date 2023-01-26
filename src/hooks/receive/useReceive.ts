import { toast } from 'react-toastify'

export const useReceive = () => {
  async function handleCopyWalletAddress() {
    await navigator.clipboard.writeText('user?.walletPublicKey')

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
