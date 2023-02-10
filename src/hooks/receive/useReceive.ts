export const useReceive = () => {
  function handleShareQrCode() {
    console.log('share')
  }

  return {
    handleShareQrCode
  }
}
