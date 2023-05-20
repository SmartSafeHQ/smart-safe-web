import Head from 'next/head'
// import { useEffect } from 'react'

// import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { MainSafeInfos } from '@components/pages/Home/MainSafeInfos'
import { TransactionQueue } from '@components/pages/Home/TransactionQueue'
// import { Contract, ethers } from 'ethers'

const Home = () => {
  // useEffect(() => {
  //   // console.log(new ethers.utils.Interface(SMART_SAFE_ABI).getError('0xeea91ff8'))
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const contract = new Contract(
  //     '0x149760eAF40505f9E3106d539C55628AAd3c80ed',
  //     SMART_SAFE_ABI,
  //     provider
  //   )

  //   contract.functions.threshold().then(console.log)
  // }, [])

  return (
    <div className="min-h-screen flex flex-col items-stretch justify-start">
      <Head>
        <title>SmartSafe | Safe Home</title>
        <meta name="description" content="SmartSafe decentralized home page" />
      </Head>

      <div className="w-full flex flex-wrap items-stretch justify-start gap-4 p-2">
        <MainSafeInfos />

        <TransactionQueue />
      </div>
    </div>
  )
}

export default Home
