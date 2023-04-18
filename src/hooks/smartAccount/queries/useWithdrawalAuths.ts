import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'
import { formatWalletAddress } from '@utils/web3Utils'
import { fetchSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { queryClient } from '@lib/reactQuery'

interface FetchSmartAccountWithdrawalAuthsInput {
  walletAddress: string
  customerId: number
}

const WITHDRAWALS_MOCK = [
  {
    index: 1,
    userAddress: '0x701dFD1CB16664CdF1e47988a3fAf979F48e3d71',
    tokenAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    tokenAmount: '100',
    startDate: 1681842255429
  },
  {
    index: 2,
    userAddress: '0xb249CEcD86215c99a78F1666e54C7c978e917758',
    tokenAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    tokenAmount: '20',
    startDate: 1681842255429
  }
]

export async function fetchSmartAccountWithdrawalAuths(
  input: FetchSmartAccountWithdrawalAuthsInput
): Promise<SelectedWithdrawalProps[]> {
  const contacts = await queryClient.ensureQueryData<ContactProps[]>({
    queryKey: ['smartAccountContacts', input.customerId],
    queryFn: () => fetchSmartAccountContacts({ customerId: input.customerId })
  })

  const formattedWithdrawals = WITHDRAWALS_MOCK.map(withdrawal => {
    const withdrawalCoin = STABLE_COINS.find(
      coin => coin.contractAddress === withdrawal.tokenAddress
    )

    if (!withdrawalCoin) throw Error('coin not found')

    const findContactForRecipient = contacts.find(
      contact => contact.wallet.address === withdrawal.userAddress
    )

    const formattedAmount = +ethers.utils
      .parseEther(withdrawal.tokenAmount)
      .toString()
    const formattedDate = new Date(withdrawal.startDate * 1000)

    return {
      index: withdrawal.index,
      recipientName: findContactForRecipient?.name,
      coinAmount: formattedAmount,
      dateFrom: formattedDate,
      coin: {
        symbol: withdrawalCoin?.symbol,
        avatar: withdrawalCoin?.avatar,
        address: withdrawalCoin?.contractAddress
      },
      wallet: {
        address: withdrawal.userAddress,
        formattedAddress: formatWalletAddress({
          network: 'evm',
          walletAddress: withdrawal.userAddress
        })
      }
    }
  })

  return formattedWithdrawals
}

export function useWithdrawalAuths(
  id = 0,
  walletAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['smartAccountWithdrawalAuths', walletAddress],
    queryFn: () =>
      fetchSmartAccountWithdrawalAuths({ customerId: id, walletAddress }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
