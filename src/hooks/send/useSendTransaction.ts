import { toast } from 'react-toastify'

import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import { CoinProps, HandleSendTransactionProps } from '@hooks/send/interfaces'
import { useCoinFeeData } from '@hooks/global/coins/queries/useCoinFeeData'

interface UseSendTransactionProps {
  coin: CoinProps
}

export const useSendTransaction = ({ coin }: UseSendTransactionProps) => {
  const { customer } = useAuth()
  const { t } = useI18n()

  const { mutateAsync, isLoading: isSendingTx } = useSendMutation()

  const { data: coinFeeData, isLoading: coinFeeIsLoading } = useCoinFeeData(
    coin.rpcUrl,
    coin.symbol,
    coin.decimals
  )

  async function handleSendTransaction({
    chainId,
    rpcUrl,
    explorerUrl,
    amount,
    to
  }: HandleSendTransactionProps) {
    if (!customer) return

    try {
      const response = await mutateAsync({
        chainId,
        rpcUrl,
        fromWalletAddress: customer.wallet.address,
        fromWalletPrivateKey: customer.wallet.privateKey,
        to,
        amount
      })

      const transactionUrl = `${explorerUrl}/tx/${response.transactionHash}`

      console.log(transactionUrl)

      toast.success(`Transaction done successfully`)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    customer,
    isSendingTx,
    coinFeeData,
    coinFeeIsLoading,
    handleSendTransaction
  }
}
