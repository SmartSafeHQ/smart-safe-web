import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import axios from 'axios'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

const CHAIN_NAMES_MAINNET = new Map<string, string>([
  ['ETH', 'eth-mainnet'],
  ['MATIC', 'matic-mainnet'],
  ['BNB', 'bsc-mainnet']
])

const CHAIN_NAMES_TESTNET = new Map<string, string>([
  ['ETH', 'eth-sepolia'],
  ['MATIC', 'matic-mumbai'],
  ['BNB', 'bsc-testnet']
])

interface FetchSafeTokensInput {
  safeAddress?: string
  symbol?: string
}

export interface FetchSafeTokensOutput {
  address: string
  symbol: string
  icon: string
  balance: number
}

interface GetTokenPricesResponse {
  data: {
    items: {
      contract_address: string
      contract_ticker_symbol: string
      contract_decimals: number
      logo_url: string
      balance: string
    }[]
  }
}

export async function fetchSafeTokens(
  input: FetchSafeTokensInput
): Promise<FetchSafeTokensOutput[]> {
  if (!input.safeAddress || !input.symbol) {
    throw new Error('safe address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.symbol === input.symbol
  )

  const chainsNameList =
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? CHAIN_NAMES_MAINNET
      : CHAIN_NAMES_TESTNET

  const chainName = chainsNameList.get(input.symbol.toUpperCase())

  if (!chainName || !safeChain) throw new Error('Chain not supported')

  const reqUrl = `https://api.covalenthq.com/v1/${chainName}/address/${input.safeAddress}/balances_v2/?quote-currency=usd&no-spam=true`
  const logoUrl =
    'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color'

  const response = await axios.get<GetTokenPricesResponse>(reqUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKENS_BALANCES_API_KEY}`
    }
  })

  const formattedTokens = response.data.data.items.map(token => ({
    address: token.contract_address,
    symbol: token.contract_ticker_symbol,
    icon: `${logoUrl}/${token.contract_ticker_symbol.toLowerCase()}.svg`,
    balance: +ethers.formatUnits(token.balance, token.contract_decimals)
  }))

  return formattedTokens
}

export function useSafeTokens(
  safeAddress?: string,
  symbol?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokens', safeAddress],
    queryFn: () => fetchSafeTokens({ safeAddress, symbol }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
