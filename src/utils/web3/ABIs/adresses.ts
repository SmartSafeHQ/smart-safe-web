const TESTNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES = new Map<string, string>([
  ['MATIC', '0x1e4AFCc2acFb13F6F27A95fF278D21b40761705C'],
  ['BNB', '0x65077544Ec50bD8eA33930118fDaE1dfEc2B1D4e'],
  ['OKT', '0x6c32DbEA66aeB9dB4108C85438dD28FF1101622d'],
  ['ETH', '0xd32F5CEEa3B7F7d32c811eE42885D8e0aAD92063']
])

const MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES = new Map<string, string>([
  ['MATIC', '0x7d2d4b099219Df80668Bd67E518Ca40064ccd11C'],
  ['BNB', '0x6901ebB998104D3C6520DB808b6b31663ba8A420'],
  ['ETH', '0x7b55E6656e54848ad6CE298b4Aaa27Ae7696a624']
])

const SMART_SAFE_CHAINS_ENV_ADRESSES = new Map([
  ['production', MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES],
  ['development', TESTNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES]
])

export const SMART_SAFE_FACTORY_CHAINS_ADRESSES =
  SMART_SAFE_CHAINS_ENV_ADRESSES.get(
    process.env.NEXT_PUBLIC_ENV ?? 'production'
  ) ?? MAINNET_SMART_SAFE_CHAINS_FACTORY_ADRESSES
