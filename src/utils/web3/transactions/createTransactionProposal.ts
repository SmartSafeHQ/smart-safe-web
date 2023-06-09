import { ethers, type JsonRpcSigner } from 'ethers'

import { RegisterUpkeep__factory as RegisterUpkeep } from '@utils/web3/typings/factories/RegisterUpkeep__factory'
import { SMART_SAFE_UPKEEP_ADRESSES } from '@utils/web3/chains/adresses'

interface TransactionProps {
  chainId: number
  from: string
  to: string
  transactionNonce: number
  value: string
  data: string
}

function hashString(data: string) {
  const stringToBytes = ethers.toUtf8Bytes(data)
  return ethers.keccak256(stringToBytes)
}

function getHashOfSignatureStruct({
  from,
  to,
  transactionNonce,
  value,
  data
}: TransactionProps) {
  const signatureStructHash = hashString(
    'Signature(address,address,uint64,uint256,bytes)'
  )

  const signatureStructEncoded = new ethers.AbiCoder().encode(
    ['bytes32', 'address', 'address', 'uint64', 'uint256', 'bytes32'],
    [signatureStructHash, from, to, transactionNonce, value, data]
  )

  const hashedEncodedStruct = ethers.keccak256(signatureStructEncoded)

  return { hashedEncodedStruct }
}

interface GetHashMessageProps {
  chainId: number
  contractAddress: string
  hashedEncodedStruct: string
}

function getHashMessage({
  chainId,
  contractAddress,
  hashedEncodedStruct
}: GetHashMessageProps) {
  const domainName = hashString('Smart Safe Signature Manager')
  const domainVersion = hashString('1.0.0')

  const typeHash = hashString(
    'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
  )

  const domainSeparator = ethers.keccak256(
    new ethers.AbiCoder().encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [typeHash, domainName, domainVersion, chainId, contractAddress]
    )
  )

  const typedDataHash = ethers.keccak256(
    ethers.solidityPacked(
      ['string', 'bytes32', 'bytes32'],
      ['\x19\x01', domainSeparator, hashedEncodedStruct]
    )
  )

  return typedDataHash
}

interface CreateTransactionMessageProps {
  transaction: TransactionProps
}

export function createTransactionMessage({
  transaction
}: CreateTransactionMessageProps) {
  const { hashedEncodedStruct } = getHashOfSignatureStruct(transaction)

  const typedDataHash = getHashMessage({
    chainId: transaction.chainId,
    contractAddress: transaction.from,
    hashedEncodedStruct
  })

  return ethers.getBytes(typedDataHash)
}

interface CreateTransactionProposalProps {
  transaction: TransactionProps
  signer: JsonRpcSigner
}

export async function createTransactionProposal({
  transaction,
  signer
}: CreateTransactionProposalProps) {
  const { hashedEncodedStruct } = getHashOfSignatureStruct(transaction)

  const typedDataHash = getHashMessage({
    chainId: transaction.chainId,
    contractAddress: transaction.from,
    hashedEncodedStruct
  })

  const signedTypedDataHash = await signer.signMessage(
    ethers.getBytes(typedDataHash)
  )

  return { signedTypedDataHash, typedDataHash }
}

interface RegisterScheduleTxUpKeepProps {
  signer: JsonRpcSigner
  safeAddress: string
  ownerAddress: string
  txNonce: number
  networkName: string
}

export async function registerScheduleTxUpKeep(
  input: RegisterScheduleTxUpKeepProps
) {
  const smartSafeUpKeepAddress = SMART_SAFE_UPKEEP_ADRESSES.get(
    input.networkName
  )

  if (!smartSafeUpKeepAddress) throw new Error('Chain not supported')

  const upKeepContract = RegisterUpkeep.connect(
    smartSafeUpKeepAddress,
    input.signer
  )

  const checkData = new ethers.AbiCoder().encode(['uint64'], [input.txNonce])

  console.log('txNonce =>', input.txNonce)
  console.log('name =>', `${input.txNonce}-schedule-tx`)
  console.log('encryptedEmail =>', '0x')
  console.log('upkeepContract =>', input.safeAddress)
  console.log('gasLimit =>', '500000')
  console.log('adminAddress =>', input.ownerAddress)
  console.log('checkData =>', checkData)
  console.log('offchainConfig =>', '0x')
  console.log('amount =>', '1000000000000000000')

  const registerUpKeep = await upKeepContract.getFunction(
    'registerAndPredictID'
  )({
    name: `${input.txNonce}-schedule-tx`,
    encryptedEmail: '0x',
    upkeepContract: input.safeAddress,
    gasLimit: '500000',
    adminAddress: input.ownerAddress,
    checkData,
    offchainConfig: '0x',
    amount: '1000000000000000000'
  })

  return registerUpKeep
}
