import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import {
  ScheduledTxProps,
  TransacitonTypes
} from '@hooks/transactions/queries/useSafeTxQueue/interfaces'
import { fetchContacts } from '@hooks/contacts/queries/useContactsQuery'
import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'
import { queryClient } from '@lib/reactQuery'
import { formatWalletAddress } from '@utils/web3'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { fetchSafeTxQueue } from '@hooks/transactions/queries/useSafeTxQueue'
import { RegisterUpkeep__factory as RegisterUpkeep } from '@utils/web3/typings/factories/RegisterUpkeep__factory'

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

  const provider = new ethers.JsonRpcProvider(safeChain.rpcUrl)
  const contract = RegisterUpkeep.connect(input.safeAddress, provider)

  const txQueue = await queryClient.fetchQuery({
    queryKey: ['safeTxQueue', input.safeAddress],
    queryFn: () =>
      fetchSafeTxQueue({
        safeAddress: input.safeAddress,
        chainId: input.chainId
      })
  })

  const contacts = await queryClient.ensureQueryData({
    queryKey: ['contacts', input.creatorId],
    queryFn: () => fetchContacts({ creatorId: input.creatorId })
  })

  const scheduledTx = [txQueue.toApprove, ...txQueue.pending].filter(
    (tx: TransacitonTypes | undefined): tx is ScheduledTxProps =>
      tx?.type === 'SCHEDULED'
  )

  const ScheduledTxPromise = scheduledTx.map(async transaction => {
    const response = await contract.getFunction('upKeepsPerSmartSafe')(
      input.safeAddress ?? '',
      transaction.nonce
    )

    console.log(response)

    const recipentContact = contacts.find(
      contact => contact.contactAddress === transaction.to
    )

    return {
      id: 'id-' + transaction.nonce,
      amount: transaction.amount,
      triggerTitle: transaction.triggerTitle,
      token: transaction.token,
      wallet: {
        address: transaction.to,
        formattedAddress: formatWalletAddress({
          walletAddress: transaction.to
        })
      },
      recipientName: recipentContact?.contactName
    }
  })

  const formattedScheduledTx = Promise.all(ScheduledTxPromise)

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

// const mock = {
//   amount: 0.00001,
//   createdAt: new Date(
//     'Fri Jun 09 2023 09:50:48 GMT-0300 (Brasilia Standard Time)'
//   ),
//   data: '0x',
//   formattedAddress: '0x701d...3d71',
//   hash: '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
//   nonce: 0,
//   signatures: {
//     list: [
//       {
//         address: '0x701dFD1CB16664CdF1e47988a3fAf979F48e3d71',
//         formattedAddress: '0x701d...3d71',
//         status: 'approved'
//       }
//     ],
//     approvesCount: 1
//   },
//   to: '0x701dFD1CB16664CdF1e47988a3fAf979F48e3d71',
//   token: { symbol: 'MATIC', icon: '/networks/polygon-logo.svg' },
//   triggerTitle: 'every minute',
//   triggerType: 'time',
//   type: 'SCHEDULED'
// }
