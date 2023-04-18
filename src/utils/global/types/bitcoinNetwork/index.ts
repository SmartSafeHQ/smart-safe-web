// these typings represents the payloads returned by this REST API: https://www.blockcypher.com/dev/#objects

type TXRef = {
  tx_hash: string
  block_height: number
  tx_input_n: number
  tx_output_n: number
  value: number
  ref_balance: number
  spent: boolean
  confirmations: number
  confirmed: string
  double_spend: boolean
}

export interface AddressEndpointResponse {
  address: string
  total_received: number
  total_sent: number
  balance: number
  unconfirmed_balance: number
  final_balance: number
  n_tx: number
  unconfirmed_n_tx: number
  final_n_tx: number
  txrefs: TXRef[]
}