import { useQuery } from '@tanstack/react-query'
import { Contract, providers, utils } from 'ethers'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'

import { fetchSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'

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

  const provider = new providers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  const contract = new Contract(input.smartAccountAddress, '{}', provider)

  const totalAuthorizations = await contract.functions.totalAuthorizations()

  const formattedAuthorizationsCount = +totalAuthorizations.toString()

  const authorizations: SelectedWithdrawalProps[] = []

  for (let i = 0; i < formattedAuthorizationsCount; i++) {
    const authorization = await contract.functions.authorizations(i)

    const withdrawalCoin = CHAINS_ATTRIBUTES.find(
      coin => coin.rpcUrl === authorization.tokenAddress
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
        avatar: withdrawalCoin?.icon,
        address: withdrawalCoin?.scanUrl
      },
      wallet: {
        address: authorization.userAddress,
        formattedAddress: formatWalletAddress({
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
