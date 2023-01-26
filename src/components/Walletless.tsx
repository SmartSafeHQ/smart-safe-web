// import { useEffect, useState } from 'react'

// import { Walletless as RicardoWalletless } from '@ricardo-passos-test/tokenverse-sdk'

// const test = new RicardoWalletless({
//   apiKey: 'pk_test',
//   network: { chainId: 8001, rpcUrl: 'https://rpc-mumbai.maticvigil.com/' }
// })

// test.getProvider.request

// export function Walletless() {
//   const [walletless, setWalletless] = useState<any>()

//   useEffect(() => {
//     window.addEventListener('message', event => {
//       console.log(event)
//     })

//     const Walletless = import(
//       '@ricardo-passos-test/tokenverse-sdk/dist/index'
//     ).then(r => {
//       const walletless = new r.Walletless({
//         apiKey: 'pk_test',
//         network: { chainId: 8001, rpcUrl: 'https://rpc-mumbai.maticvigil.com/' }
//       })

//       setWalletless(walletless)

//       walletless?.getProvider.overlay.show()

//       console.log(
//         window.document.querySelector<HTMLIFrameElement>('.walletless-iframe').
//       )

//       return r
//     })
//   }, [window.document.querySelector<HTMLIFrameElement>('.walletless-iframe')])

//   return <p>aaa</p>
// }

export const test = ''
