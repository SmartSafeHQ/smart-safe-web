import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'
import { providers, utils, Wallet } from 'ethers'

import { COINS_ATTRIBUTES } from '@utils/global/coins/config'
import { EIP155_SIGNING_METHODS } from '.'

export async function approveEIP155Request(
  walletPrivateKey: string,
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id } = requestEvent
  const { chainId, request } = params

  const wallet = new Wallet(walletPrivateKey)

  switch (request.method) {
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
    case EIP155_SIGNING_METHODS.ETH_SIGN: {
      const message = request.params.find((p: string) => !utils.isAddress(p))

      const utf8String = utils.toUtf8String(message)

      const signedMessage = await wallet.signMessage(utf8String)

      return formatJsonRpcResult(id, signedMessage)
    }

    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4: {
      let data = request.params.find((p: string) => !utils.isAddress(p))

      if (typeof data === 'string') {
        data = JSON.parse(data)
      }

      const { domain, types, message } = data

      delete types.EIP712Domain

      const signedData = await wallet._signTypedData(domain, types, message)

      return formatJsonRpcResult(id, signedData)
    }

    case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION: {
      const chain = COINS_ATTRIBUTES.find(
        coin => coin.chainId === Number(chainId)
      )

      const provider = new providers.JsonRpcProvider(chain?.rpcUrl)

      const sendTransaction = request.params[0]

      const connectedWallet = wallet.connect(provider)

      const { hash } = await connectedWallet.sendTransaction(sendTransaction)

      return formatJsonRpcResult(id, hash)
    }

    case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION: {
      const signTransaction = request.params[0]

      const signature = await wallet.signTransaction(signTransaction)

      return formatJsonRpcResult(id, signature)
    }

    default: {
      throw new Error(getSdkError('INVALID_METHOD').message)
    }
  }
}

export function rejectEIP155Request(
  request: SignClientTypes.EventArguments['session_request']
) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message)
}
