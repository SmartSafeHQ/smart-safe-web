import { errors as etherErrors } from 'ethers'
import { EthereumErrorProps } from '@utils/global/types'

export const web3Errors = {
  ether: new Map<etherErrors, EthereumErrorProps>([
    [
      etherErrors.UNKNOWN_ERROR,
      {
        code: etherErrors.UNKNOWN_ERROR,
        message: 'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.NOT_IMPLEMENTED,
      {
        code: etherErrors.NOT_IMPLEMENTED,
        message: 'Erro. Função não implementada.'
      }
    ],
    [
      etherErrors.UNSUPPORTED_OPERATION,
      {
        code: etherErrors.UNSUPPORTED_OPERATION,
        message: 'Erro. Operação não suportada'
      }
    ],
    [
      etherErrors.NETWORK_ERROR,
      {
        code: etherErrors.NETWORK_ERROR,
        message:
          'Erro de configuração de rede. Verifique os dados e tente novamente'
      }
    ],
    [
      etherErrors.SERVER_ERROR,
      {
        code: etherErrors.SERVER_ERROR,
        message: 'Erro interno não esperado. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.TIMEOUT,
      {
        code: etherErrors.TIMEOUT,
        message: 'Tempo expirado. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.BUFFER_OVERRUN,
      {
        code: etherErrors.BUFFER_OVERRUN,
        message: 'Erro de buffer. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.NUMERIC_FAULT,
      {
        code: etherErrors.NUMERIC_FAULT,
        message: 'Operação obortada. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.MISSING_NEW,
      {
        code: etherErrors.MISSING_NEW,
        message: 'Erro operador não encontrado. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.INVALID_ARGUMENT,
      {
        code: etherErrors.INVALID_ARGUMENT,
        message:
          'Argumento inválido. Verifique sua solicitação e tente novamente.'
      }
    ],
    [
      etherErrors.MISSING_ARGUMENT,
      {
        code: etherErrors.MISSING_ARGUMENT,
        message:
          'Argumentos inválidos, argumentos ausentes. Verifique sua solicitação e tente novamente.'
      }
    ],
    [
      etherErrors.UNEXPECTED_ARGUMENT,
      {
        code: etherErrors.UNEXPECTED_ARGUMENT,
        message:
          'Argumentos inválidos. Verifique sua solicitação e tente novamente.'
      }
    ],
    [
      etherErrors.CALL_EXCEPTION,
      {
        code: etherErrors.CALL_EXCEPTION,
        message: 'Erro de exceção na chamada. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.INSUFFICIENT_FUNDS,
      {
        code: etherErrors.INSUFFICIENT_FUNDS,
        message: 'Saldo insuficiente para completar a transação.'
      }
    ],
    [
      etherErrors.NONCE_EXPIRED,
      {
        code: etherErrors.NONCE_EXPIRED,
        message:
          'O nonce da transação expirou. Tente novamente com uma nova transação.'
      }
    ],
    [
      etherErrors.REPLACEMENT_UNDERPRICED,
      {
        code: etherErrors.REPLACEMENT_UNDERPRICED,
        message:
          'Substituição de transação com preço insuficiente. Tente novamente com um preço de gás mais alto.'
      }
    ],
    [
      etherErrors.UNPREDICTABLE_GAS_LIMIT,
      {
        code: etherErrors.UNPREDICTABLE_GAS_LIMIT,
        message:
          'Limite de gás imprevisível. Não conseguimos estimar o valor da taxa.'
      }
    ],
    [
      etherErrors.TRANSACTION_REPLACED,
      {
        code: etherErrors.TRANSACTION_REPLACED,
        message: 'Transação foi invalidada. Tente novamente mais tarde.'
      }
    ],
    [
      etherErrors.ACTION_REJECTED,
      {
        code: etherErrors.ACTION_REJECTED,
        message:
          'Transação foi rejeitada pelo usuário. Tente novamente mais tarde.'
      }
    ]
  ]),
  default: 'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
}
