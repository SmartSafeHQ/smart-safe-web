import { ethers, type JsonRpcSigner } from 'ethers'

function hashString(data: string) {
  const stringToBytes = ethers.toUtf8Bytes(data)
  return ethers.keccak256(stringToBytes)
}

function getHashOfSignatureStruct(
  from: string,
  to: string,
  transactioNonce: number,
  value: string,
  data: string
) {
  const signatureStructHash = hashString(
    'Signature(address,address,uint64,uint256,bytes)'
  )

  const signatureStructEncoded = new ethers.AbiCoder().encode(
    ['bytes32', 'address', 'address', 'uint64', 'uint256', 'bytes32'],
    [signatureStructHash, from, to, transactioNonce, value, data]
  )

  const hashedEncodedStruct = ethers.keccak256(signatureStructEncoded)

  return { hashedEncodedStruct }
}

interface GetHashMessageProps {
  domain: {
    chainId: number
    verifyingContract: string
  }
  hashedEncodedStruct: string
}

function getHashMessage({
  domain: { chainId, verifyingContract },
  hashedEncodedStruct
}: GetHashMessageProps) {
  const domain = {
    name: hashString('Smart Safe Signature Manager'),
    version: hashString('1.0.0'),
    chainId,
    verifyingContract
  }

  const typeHash = hashString(
    'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
  )

  const domainSeparator = ethers.keccak256(
    new ethers.AbiCoder().encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [
        typeHash,
        domain.name,
        domain.version,
        domain.chainId,
        domain.verifyingContract
      ]
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

interface SignHashProps {
  signer: JsonRpcSigner
  domain: {
    chainId: number
    verifyingContract: string
  }
  hashedEncodedStruct: string
}

async function signHash({
  domain,
  signer,
  hashedEncodedStruct
}: SignHashProps) {
  const typedDataHash = getHashMessage({ domain, hashedEncodedStruct })

  console.log(ethers.getBytes(typedDataHash).toString())

  const signedTypedDataHash = await signer.signMessage(
    ethers.getBytes(typedDataHash)
  )

  console.log({ typedDataHash, signedTypedDataHash })

  return { typedDataHash, signedTypedDataHash }
}

interface CreateTransactionMessageProps {
  domain: {
    chainId: number
    verifyingContract: string
  }
  transaction: {
    from: string
    to: string
    transactionNonce: number
    value: string
    data: string
  }
}

export function createTransactionMessage({
  domain,
  transaction
}: CreateTransactionMessageProps) {
  const { hashedEncodedStruct } = getHashOfSignatureStruct(
    transaction.from,
    transaction.to,
    transaction.transactionNonce,
    transaction.value,
    transaction.data
  )

  const typedDataHash = getHashMessage({
    domain,
    hashedEncodedStruct
  })

  return typedDataHash
}

interface CreateTransactionProposalProps
  extends Omit<SignHashProps, 'hashedEncodedStruct'> {
  transaction: {
    from: string
    to: string
    transactionNonce: number
    value: string
    data: string
  }
}

export async function createTransactionProposal({
  domain,
  signer,
  transaction
}: CreateTransactionProposalProps) {
  const { hashedEncodedStruct } = getHashOfSignatureStruct(
    transaction.from,
    transaction.to,
    transaction.transactionNonce,
    transaction.value,
    transaction.data
  )

  const { signedTypedDataHash, typedDataHash } = await signHash({
    domain,
    signer,
    hashedEncodedStruct
  })

  return { signedTypedDataHash, typedDataHash }
}
