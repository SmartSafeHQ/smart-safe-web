import { useQuery } from '@tanstack/react-query'

import { SelectedContactProps } from '@hooks/smart-account/useSAContacts'

interface FetchSmartAccountContactsInput {
  id: number
}

const MOCK = [
  {
    id: 1,
    name: 'Paulo reis',
    wallet: {
      address: '0x701dFD1CB16664CdF1e47988a3fAf979F48e3d71',
      formattedAddress: '0x701d...e3d7'
    }
  },
  {
    id: 2,
    name: 'Igor Almeida',
    wallet: {
      address: '0x7f79b85B062a81197196b33EB573D0B98973781A',
      formattedAddress: '0x7f79...3781'
    }
  }
]

export async function fetchSmartAccountContacts(
  _data: FetchSmartAccountContactsInput
): Promise<SelectedContactProps[]> {
  return MOCK
}

export function useSmartAccountContacts(id = 0, enabled = true) {
  return useQuery({
    queryKey: ['smartAccountContacts', id],
    queryFn: () => fetchSmartAccountContacts({ id }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
