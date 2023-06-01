import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'
import { ContactProps } from '@contexts/ContactsContext'

import { fetchContacts } from '@hooks/contacts/queries/useContactsQuery'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'

interface FetchSpendingLimitsInput {
  address: string
  customerId: number
}

export async function fetchSpendingLimits(
  input: FetchSpendingLimitsInput
): Promise<SelectedSpendingLimitsProps[]> {
  const contacts = await queryClient.ensureQueryData<ContactProps[] | null>({
    queryKey: ['contacts'],
    queryFn: () => fetchContacts({ creatorId: String(input.customerId) })
  })

  const provider = new ethers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  const contract = new ethers.Contract(input.address, '{}', provider)

  const totalAuthorizations = await contract.getFunction(
    'totalAuthorizations'
  )()

  const formattedAuthorizationsCount = +totalAuthorizations.toString()

  const authorizations: SelectedSpendingLimitsProps[] = []

  for (let i = 0; i < formattedAuthorizationsCount; i++) {
    const authorization = await contract.getFunction('authorizations')(i)

    const spendingLimitsToken = CHAINS_ATTRIBUTES.find(
      token => token.rpcUrl === authorization.tokenAddress
    )

    if (!spendingLimitsToken) continue

    const findContactForRecipient = contacts?.find(
      contact => contact.contactAddress === authorization.userAddress
    )

    const formattedAmount = +ethers.formatEther(
      authorization.tokenAmount.toString()
    )

    const formattedDate = new Date(authorization.startDate * 1000)

    authorizations.push({
      index: authorization.authorizationIndex,
      recipientName: findContactForRecipient?.contactName,
      coinAmount: formattedAmount,
      dateFrom: formattedDate,
      coin: {
        symbol: spendingLimitsToken?.symbol,
        avatar: spendingLimitsToken?.icon,
        address: spendingLimitsToken?.scanUrl
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

export function useSpendingLimitsQuery(
  id = 0,
  address: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['spendingLimits', address],
    queryFn: () =>
      fetchSpendingLimits({
        customerId: id,
        address
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
