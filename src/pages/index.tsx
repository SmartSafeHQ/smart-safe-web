import Head from 'next/head'

import { Heading } from '@components/Heading'

export default function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-3">
      <Head>
        <title>SmartSafe</title>
        <meta
          name="description"
          content="SmartSafe decentralized custody protocol and collective asset management platform on EVM"
        />
      </Head>

      <Heading>hello world!</Heading>
    </div>
  )
}
