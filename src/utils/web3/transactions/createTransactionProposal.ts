import { providers, utils } from 'ethers'

function hashString(data: string) {
  const stringToBytes = utils.toUtf8Bytes(data)
  return utils.keccak256(stringToBytes)
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

  const signatureStructEncoded = new utils.AbiCoder().encode(
    ['bytes32', 'address', 'address', 'uint64', 'uint256', 'bytes32'],
    [signatureStructHash, from, to, transactioNonce, value, data]
  )

  console.log({ signatureStructHash, from, to, transactioNonce, value, data })

  const hashedEncodedStruct = utils.keccak256(signatureStructEncoded)

  return { hashedEncodedStruct }
}

interface SignHashProps {
  signer: providers.JsonRpcSigner
  domain: {
    chainId: number
    verifyingContract: string
  }
  hashedEncodedStruct: string
}

async function signHash({
  domain: { chainId, verifyingContract },
  signer,
  hashedEncodedStruct
}: SignHashProps) {
  const domain = {
    name: hashString('Smart Safe Signature Manager'),
    version: hashString('1.0.0'),
    chainId,
    verifyingContract
  }

  const typeHash = hashString(
    'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
  )

  const domainSeparator = utils.keccak256(
    new utils.AbiCoder().encode(
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

  const typedDataHash = utils.keccak256(
    utils.solidityPack(
      ['string', 'bytes32', 'bytes32'],
      ['\x19\x01', domainSeparator, hashedEncodedStruct]
    )
  )

  const signedTypedDataHash = await signer.signMessage(
    utils.arrayify(typedDataHash)
  )

  return { typedDataHash, signedTypedDataHash }
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
