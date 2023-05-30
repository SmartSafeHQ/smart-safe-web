import Head from 'next/head'
import { type ReactElement, useEffect } from 'react'
import { ethers } from 'ethers'

import { CreateSafeHeader } from '@components/pages/CreateSafe/CreateSafeHeader'
import { CreateSafeWelcomeContent } from '@components/pages/CreateSafe/CreateSafeWelcomeContent'

import { CreateSafeProvider } from '@contexts/create-safe/CreateSafeContext'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

const CreateSafeWelcome = () => {
  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(
      '0xb2D63C58445908a90dFdB7c43dfb7889EbA081dC',
      SMART_SAFE_ABI,
      provider
    )
    console.log(contract.filters)
  }, [])

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
