import { ethers, type JsonRpcSigner } from 'ethers'

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
