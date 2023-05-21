import Head from 'next/head'
import { type ReactElement } from 'react'
// import { ethers } from 'ethers'

import { CreateSafeHeader } from '@components/pages/CreateSafe/CreateSafeHeader'
import { CreateSafeWelcomeContent } from '@components/pages/CreateSafe/CreateSafeWelcomeContent'

import { CreateSafeProvider } from '@contexts/create-safe/CreateSafeContext'
// import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
// import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'

const CreateSafeWelcome = () => {
  // useEffect(() => {
  //   ;(async () => {
  //     const provider = new ethers.BrowserProvider((window as any).ethereum)

  //     const signer = await provider.getSigner()
  //     const contract = new ethers.Contract(
  //       '0x5b7e0f402Dd63D7603C36079Ab3b0A9dcaF339eD',
  //       SMART_SAFE_ABI,
  //       signer
  //     )

  //     console.log(contract.interface.getError('0x3c80abfc')) // invalid hash
  //     // const nonce = (
  //     //   await contract.getFunction('transactionNonce')()
  //     // ).toString()

  //     // const { signedTypedDataHash, typedDataHash } =
  //     //   await createTransactionProposal({
  //     //     domain: {
  //     //       chainId: 80001,
  //     //       verifyingContract: await contract.getAddress()
  //     //     },
  //     //     signer,
  //     //     transaction: {
  //     //       from: signer.address,
  //     //       to: await contract.getAddress(),
  //     //       transactionNonce: nonce,
  //     //       value: '0',
  //     //       data: ethers.keccak256(
  //     //         '0x00b9573b0000000000000000000000000effbeb3b863b065bd01de4928f646d6117280020000000000000000000000000000000000000000000000000000000000000002'
  //     //       )
  //     //     }
  //     //   })

  //     // try {
  //     //   await contract.getFunction('createTransactionProposal')(
  //     //     await contract.getAddress(),
  //     //     0,
  //     //     '0x00b9573b0000000000000000000000000effbeb3b863b065bd01de4928f646d6117280020000000000000000000000000000000000000000000000000000000000000002',
  //     //     await signer.getAddress(),
  //     //     typedDataHash,
  //     //     signedTypedDataHash
  //     //   )
  //     // } catch (err) {
  //     //   // console.log(err.code)
  //     //   console.log(isError(err, err.code))
  //     // }

  //     // contract.getFunction('getTransactions')(0).then(console.log)
  //   })()
  // }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe</title>
        <meta
          name="description"
          content="SmartSafe decentralized custody protocol and collective asset management platform on EVM"
        />
      </Head>

      <CreateSafeHeader />

      <CreateSafeWelcomeContent />
    </div>
  )
}

CreateSafeWelcome.getLayout = function getLayout(page: ReactElement) {
  return <CreateSafeProvider>{page}</CreateSafeProvider>
}

export default CreateSafeWelcome
