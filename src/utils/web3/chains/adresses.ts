const TESTNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES = new Map<string, string>([
  ['ETH', '0xd8013C9c545137CBFffe23c6D6ED036D4606F7aE'],
  ['MATIC', '0x3A59cAcdA24DB7a322Ccc50C7FC8a81547212cF5'],
  ['BNB', '0x4644C468c318222DDb9738DFe0A92634897D4FcC']
])

const MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES = new Map<string, string>([
  ['ETH', '0x7b55E6656e54848ad6CE298b4Aaa27Ae7696a624'],
  ['MATIC', '0x7d2d4b099219Df80668Bd67E518Ca40064ccd11C'],
  ['BNB', '0x6901ebB998104D3C6520DB808b6b31663ba8A420']
])

const SMART_SAFE_CHAINS_ENV_ADRESSES = new Map([
  ['production', MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES],
  ['development', TESTNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES]
])

export const SMART_SAFE_FACTORY_CHAINS_ADRESSES =
  SMART_SAFE_CHAINS_ENV_ADRESSES.get(
    process.env.NEXT_PUBLIC_ENV ?? 'production'
  ) ?? MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES

export const SMART_SAFE_UPKEEP_ADRESSES = new Map<string, string>([
  ['ETH', '0xd82D5a665cA147e5909d1262a97D61CeE6332065'],
  ['MATIC', '0x209119374077964969FDf95C886A28eEA593fd0E'],
  ['BNB', '0x98077BbBF5304a1792e0BeA243b12b25D338A29d']
])
