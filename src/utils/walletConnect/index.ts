import { SignClientTypes } from '@walletconnect/types'

export const EIP155_SIGNING_METHODS = {
  PERSONAL_SIGN: 'personal_sign',
  ETH_SIGN: 'eth_sign',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  ETH_SIGN_TYPED_DATA_V3: 'eth_signTypedData_v3',
  ETH_SIGN_TYPED_DATA_V4: 'eth_signTypedData_v4',
  ETH_SEND_RAW_TRANSACTION: 'eth_sendRawTransaction',
  ETH_SEND_TRANSACTION: 'eth_sendTransaction'
}

export const signClientOptions: SignClientTypes.Options = {
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  name: 'InWallet',
  metadata: {
    name: 'InWallet',
    description:
      'InWallet wallet is your place from which to embark for exciting new places and your safe harbour to return to InWallet wants to enable and empower more people to participate in blockchain technology. From crypto investing to NFT art and gaming, we want to lower entry barriers while maintaining the principle of self-ownership when transacting with digital assets.',
    url: process.env.NEXT_PUBLIC_WC_URL ?? 'localhost:3001',
    icons: [`${process.env.NEXT_PUBLIC_WC_URL}/favicon.svg`]
  }
}
