import { useQuery } from '@tanstack/react-query'

import { tokenverseApi } from '@lib/axios'

interface FetchAccount2faSettingsInput {
  id: number
}

export interface FetchAccount2faSettingsResponse {
  send2faEnabled: boolean
  exportKeys2faEnabled: boolean
}

export async function fetchAccount2faSettings({
  id
}: FetchAccount2faSettingsInput): Promise<FetchAccount2faSettingsResponse> {
  const apiResponse = await tokenverseApi.get<FetchAccount2faSettingsResponse>(
    `/widget/settings/security/${id}`
  )

  return apiResponse.data
}

export function useAccount2faSettings(id: number) {
  return useQuery({
    queryKey: ['account2faSettings', id],
    queryFn: () => fetchAccount2faSettings({ id }),
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}
