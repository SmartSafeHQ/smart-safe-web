import { useQuery } from '@tanstack/react-query'
import { Contract, providers, utils } from 'ethers'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'

import { formatWalletAddress } from '@utils/web3Utils'
import ACCOUNT_ABSTRACTION_ABI from '@utils/web3/ABIs/AccountAbstraction.json'
import { fetchSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { queryClient } from '@lib/reactQuery'

interface FetchSmartAccountWithdrawalAuthsInput {
  smartAccountAddress: string
  customerId: number
}

export async function fetchSmartAccountWithdrawalAuths(
  input: FetchSmartAccountWithdrawalAuthsInput
): Promise<SelectedWithdrawalProps[]> {
  const contacts = await queryClient.ensureQueryData<ContactProps[]>({
    queryKey: ['smartAccountContacts', input.customerId],
    queryFn: () => fetchSmartAccountContacts({ customerId: input.customerId })
  })

  const provider = new providers.JsonRpcProvider(STABLE_COINS[0].rpcUrl)
  const contract = new Contract(
    input.smartAccountAddress,
    ACCOUNT_ABSTRACTION_ABI,
    provider
  )

  const totalAuthorizations = await contract.functions.totalAuthorizations()

  const formattedAuthorizationsCount = +totalAuthorizations.toString()

  const authorizations: SelectedWithdrawalProps[] = []

  for (let i = 0; i < formattedAuthorizationsCount; i++) {
    const authorization = await contract.functions.authorizations(i)

    const withdrawalCoin = STABLE_COINS.find(
      coin => coin.contractAddress === authorization.tokenAddress
    )

    if (!withdrawalCoin) continue

    const findContactForRecipient = contacts.find(
      contact => contact.wallet.address === authorization.userAddress
    )

    const formattedAmount = +utils.formatEther(
      authorization.tokenAmount.toString()
    )

    const formattedDate = new Date(authorization.startDate * 1000)

    authorizations.push({
      index: authorization.authorizationIndex,
      recipientName: findContactForRecipient?.name,
      coinAmount: formattedAmount,
      dateFrom: formattedDate,
      coin: {
        symbol: withdrawalCoin?.symbol,
        avatar: withdrawalCoin?.avatar,
        address: withdrawalCoin?.contractAddress
      },
      wallet: {
        address: authorization.userAddress,
        formattedAddress: formatWalletAddress({
          network: 'evm',
          walletAddress: authorization.userAddress
        })
      }
    })
  }

  return authorizations
}

export function useWithdrawalAuths(
  id = 0,
  smartAccountAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['smartAccountWithdrawalAuths', smartAccountAddress],
    queryFn: () =>
      fetchSmartAccountWithdrawalAuths({ customerId: id, smartAccountAddress }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
