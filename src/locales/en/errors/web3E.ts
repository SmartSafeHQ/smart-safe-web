import { errors as etherErrors } from 'ethers'
import { EthereumErrorProps } from '@utils/global/types'

export const web3E = {
  ether: new Map<etherErrors, EthereumErrorProps>([
    [
      etherErrors.INVALID_ARGUMENT,
      {
        code: etherErrors.INVALID_ARGUMENT,
        message: 'Invalid argument. Check your request and try again.'
      }
    ],
    [
      etherErrors.INSUFFICIENT_FUNDS,
      {
        code: etherErrors.INSUFFICIENT_FUNDS,
        message: 'Insufficient balance to complete the transaction.'
      }
    ],
    [
      etherErrors.MISSING_ARGUMENT,
      {
        code: etherErrors.MISSING_ARGUMENT,
        message:
          'Invalid arguments, missing arguments. Check your request and try again.'
      }
    ],
    [
      etherErrors.UNEXPECTED_ARGUMENT,
      {
        code: etherErrors.UNEXPECTED_ARGUMENT,
        message: 'Invalid arguments. Check your request and try again.'
      }
    ],
    [
      etherErrors.CALL_EXCEPTION,
      {
        code: etherErrors.CALL_EXCEPTION,
        message: 'Call exception error. Please try again later.'
      }
    ],
    [
      etherErrors.NONCE_EXPIRED,
      {
        code: etherErrors.NONCE_EXPIRED,
        message:
          'The transaction nonce has expired. Please try again with a new transaction.'
      }
    ],
    [
      etherErrors.REPLACEMENT_UNDERPRICED,
      {
        code: etherErrors.REPLACEMENT_UNDERPRICED,
        message:
          'Transaction replacement underpriced. Please try again with a higher gas price.'
      }
    ],
    [
      etherErrors.UNPREDICTABLE_GAS_LIMIT,
      {
        code: etherErrors.UNPREDICTABLE_GAS_LIMIT,
        message:
          'Unpredictable gas limit. We cannot estimate the value of the fee.'
      }
    ],
    [
      etherErrors.TRANSACTION_REPLACED,
      {
        code: etherErrors.TRANSACTION_REPLACED,
        message: 'Transaction has been replaced. Please try again later.'
      }
    ],
    [
      etherErrors.ACTION_REJECTED,
      {
        code: etherErrors.ACTION_REJECTED,
        message:
          'Transaction has been rejected by the user. Please try again later.'
      }
    ],
    [
      etherErrors.UNKNOWN_ERROR,
      {
        code: etherErrors.UNKNOWN_ERROR,
        message: 'An unknown error occurred. Please try again later.'
      }
    ],
    [
      etherErrors.NOT_IMPLEMENTED,
      {
        code: etherErrors.NOT_IMPLEMENTED,
        message: 'Error. Function not implemented.'
      }
    ],
    [
      etherErrors.UNSUPPORTED_OPERATION,
      {
        code: etherErrors.UNSUPPORTED_OPERATION,
        message: 'Error. Operation not supported.'
      }
    ],
    [
      etherErrors.NETWORK_ERROR,
      {
        code: etherErrors.NETWORK_ERROR,
        message: 'Network configuration error. Check your data and try again.'
      }
    ],
    [
      etherErrors.SERVER_ERROR,
      {
        code: etherErrors.SERVER_ERROR,
        message: 'Unexpected internal error. Please try again later.'
      }
    ],
    [
      etherErrors.TIMEOUT,
      {
        code: etherErrors.TIMEOUT,
        message: 'Time has expired. Please try again later.'
      }
    ],
    [
      etherErrors.BUFFER_OVERRUN,
      {
        code: etherErrors.BUFFER_OVERRUN,
        message: 'Buffer error. Please try again later.'
      }
    ],
    [
      etherErrors.NUMERIC_FAULT,
      {
        code: etherErrors.NUMERIC_FAULT,
        message: 'Operation aborted. Please try again later.'
      }
    ],
    [
      etherErrors.MISSING_NEW,
      {
        code: etherErrors.MISSING_NEW,
        message: 'Operator not found error. Please try again later.'
      }
    ]
  ])
}
