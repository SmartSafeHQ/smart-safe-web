import { JsonRpcProvider, formatUnits } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import { fetchContacts } from '@hooks/contacts/queries/useContactsQuery'
import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'
import { queryClient } from '@lib/reactQuery'
import { formatWalletAddress } from '@utils/web3'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { RegisterUpkeep__factory as RegisterUpkeep } from '@utils/web3/typings/factories/RegisterUpkeep__factory'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { AUTOMATION_TRIGGERS } from '@utils/web3/transactions/transactionQueue'
import { SMART_SAFE_UPKEEP_ADRESSES } from '@utils/web3/chains/adresses'
import { TransactionManager } from '@utils/web3/typings/SmartSafe'

interface FetchSpendingLimitsInput {
  safeAddress?: string
  chainId?: string
  creatorId?: string
}

export async function fetchSpendingLimits(
  input: FetchSpendingLimitsInput
): Promise<SelectedSpendingLimitsProps[]> {
  if (!input.safeAddress || !input.chainId || !input.creatorId) {
    throw new Error('safe address and chain required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const smartSafeUpKeepAddress = SMART_SAFE_UPKEEP_ADRESSES.get(
    safeChain.symbol
  )

  if (!smartSafeUpKeepAddress) throw new Error('Chain not supported')

  const contacts = await queryClient.ensureQueryData({
    queryKey: ['contacts', input.creatorId],
    queryFn: () => fetchContacts({ creatorId: input.creatorId })
  })

  const provider = new JsonRpcProvider(safeChain.rpcUrl)
  const contract = SmartSafe.connect(input.safeAddress, provider)
  const upkeepContract = RegisterUpkeep.connect(
    smartSafeUpKeepAddress,
    provider
  )

  const scheduledTxResponse = await contract.getFunction('getTransactions')(
    0,
    2
  )
  const scheduledTx: TransactionManager.TransactionStructOutput[] = []

  scheduledTxResponse.forEach(transaction => scheduledTx.push(transaction))

  const scheduledTxPromise = scheduledTx.map(async transaction => {
    const to = transaction[1]
    const nonce = Number(transaction[2])
    const trigger = Number(transaction[7])
    const value = transaction[3]

    const scheduledTransaction = AUTOMATION_TRIGGERS.get(trigger)

    if (!scheduledTransaction) {
      throw new Error('transaction schedule type not supported')
    }

    const response = await upkeepContract.getFunction('upKeepsPerSmartSafe')(
      input.safeAddress ?? '',
      nonce
    )

    const recipentContact = contacts.find(
      contact => contact.contactAddress === transaction.to
    )

    return {
      id: String(response),
      nonce,
      amount: Number(formatUnits(value, 'ether')),
      triggerTitle: scheduledTransaction.title,
      token: {
        symbol: safeChain.symbol,
        icon: safeChain.icon
      },
      wallet: {
        address: to,
        formattedAddress: formatWalletAddress({
          walletAddress: to
        })
      },
      recipientName: recipentContact?.contactName
    }
  })

  const formattedScheduledTx = await Promise.all(scheduledTxPromise)

  return formattedScheduledTx
}

export function useSpendingLimitsQuery(
  safeAddress?: string,
  chainId?: string,
  creatorId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['scheduledAutomations', safeAddress],
    queryFn: () =>
      fetchSpendingLimits({
        safeAddress,
        chainId,
        creatorId
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
