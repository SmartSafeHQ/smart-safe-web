import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

import { SelectedSpendingLimitsProps } from '@contexts/smart-account/SpendingLimitsAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'

import { listContacts } from '@hooks/addressBook/queries/useListContacts'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'

interface FetchSmartAccountSpendingLimitsAuthsInput {
  smartAccountAddress: string
  customerId: number
}

export async function fetchSmartAccountSpendingLimitsAuths(
  input: FetchSmartAccountSpendingLimitsAuthsInput
): Promise<SelectedSpendingLimitsProps[]> {
  const contacts = await queryClient.ensureQueryData<ContactProps[] | null>({
    queryKey: ['listContacts'],
    queryFn: () => listContacts({ creatorId: String(input.customerId) })
  })

  const provider = new ethers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  const contract = new ethers.Contract(
    input.smartAccountAddress,
    '{}',
    provider
  )

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

export function useSpendingLimitsAuths(
  id = 0,
  smartAccountAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['smartAccountSpendingLimitsAuths', smartAccountAddress],
    queryFn: () =>
      fetchSmartAccountSpendingLimitsAuths({
        customerId: id,
        smartAccountAddress
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}