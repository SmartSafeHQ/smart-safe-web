import Head from 'next/head'

import { ExportPrivateKeys } from '@components/pages/Seetings/ExportPrivateKeys'

const Settings = () => {
  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>InWallet | Settings</title>
        <meta name="description" content="InWallet settings page" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <ExportPrivateKeys />
      </div>
    </div>
  )
}

export default Settings
