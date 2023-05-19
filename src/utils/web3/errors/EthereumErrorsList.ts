import type { ErrorCode } from 'ethers'

interface EthereumErrorProps {
  code: string
  message: string
}

export const ethereumErrorsList = new Map<ErrorCode, EthereumErrorProps>([
  [
    'INVALID_ARGUMENT',
    {
      code: 'INVALID_ARGUMENT',
      message: 'Invalid argument. Check your request and try again.'
    }
  ],
  [
    'INSUFFICIENT_FUNDS',
    {
      code: 'INSUFFICIENT_FUNDS',
      message: 'Insufficient balance to complete the transaction.'
    }
  ],
  [
    'MISSING_ARGUMENT',
    {
      code: 'MISSING_ARGUMENT',
      message:
        'Invalid arguments, missing arguments. Check your request and try again.'
    }
  ],
  [
    'UNEXPECTED_ARGUMENT',
    {
      code: 'UNEXPECTED_ARGUMENT',
      message: 'Invalid arguments. Check your request and try again.'
    }
  ],
  [
    'CALL_EXCEPTION',
    {
      code: 'CALL_EXCEPTION',
      message: 'Call exception error. Please try again later.'
    }
  ],
  [
    'NONCE_EXPIRED',
    {
      code: 'NONCE_EXPIRED',
      message:
        'The transaction nonce has expired. Please try again with a new transaction.'
    }
  ],
  [
    'REPLACEMENT_UNDERPRICED',
    {
      code: 'REPLACEMENT_UNDERPRICED',
      message:
        'Transaction replacement underpriced. Please try again with a higher gas price.'
    }
  ],
  [
    'TRANSACTION_REPLACED',
    {
      code: 'TRANSACTION_REPLACED',
      message: 'Transaction has been replaced. Please try again later.'
    }
  ],
  [
    'ACTION_REJECTED',
    {
      code: 'ACTION_REJECTED',
      message:
        'Transaction has been rejected. Please confirm the transaction to proceed.'
    }
  ],
  [
    'UNKNOWN_ERROR',
    {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred. Please try again later.'
    }
  ],
  [
    'NOT_IMPLEMENTED',
    {
      code: 'NOT_IMPLEMENTED',
      message: 'Error. Function not implemented.'
    }
  ],
  [
    'UNSUPPORTED_OPERATION',
    {
      code: 'UNSUPPORTED_OPERATION',
      message: 'Error. Operation not supported.'
    }
  ],
  [
    'NETWORK_ERROR',
    {
      code: 'NETWORK_ERROR',
      message: 'Network configuration error. Check your data and try again.'
    }
  ],
  [
    'SERVER_ERROR',
    {
      code: 'SERVER_ERROR',
      message: 'Unexpected internal error. Please try again later.'
    }
  ],
  [
    'TIMEOUT',
    {
      code: 'TIMEOUT',
      message: 'Time has expired. Please try again later.'
    }
  ],
  [
    'BUFFER_OVERRUN',
    {
      code: 'BUFFER_OVERRUN',
      message: 'Buffer error. Please try again later.'
    }
  ],
  [
    'NUMERIC_FAULT',
    {
      code: 'NUMERIC_FAULT',
      message: 'Operation aborted. Please try again later.'
    }
  ],
  [
    'MISSING_ARGUMENT',
    {
      code: 'MISSING_ARGUMENT',
      message: 'Operator not found error. Please try again later.'
    }
  ]
])
