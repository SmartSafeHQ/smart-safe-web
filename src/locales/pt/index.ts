import { signIn } from './accounts/signIn'
import { signIn2FA } from './accounts/signIn2FA'
import { header } from './components/header'
import { defaultErrors } from './errors'
import { web3E } from './errors/web3E'
import { authE } from './errors/authE'
import { sidebar } from './components/sidebar'
import { pagination } from './components/pagination'
import { home } from './home'
import { receive } from './receive'
import { send } from './send'
import { payment } from './payment'
import { stableCoinAct } from './buySellStableCoin'
import { buyStableCoin } from './buySellStableCoin/buyStableCoin'
import { sellStableCoin } from './buySellStableCoin/sellStableCoin'
import { cashback } from './cashback'
import { security } from './settings/security'
import { saContacts } from './smartAccount/saContacts'
import { saGlobal } from './smartAccount'
import { wc } from './accounts/wc'
import { qrCodeReader } from './components/qrCodeReader'
import { privacy } from './privacy'

export const pt = {
  signIn,
  signIn2FA,
  header,
  sidebar,
  errors: { web3E, authE, ...defaultErrors },
  pagination,
  home,
  receive,
  send,
  stableCoinAct,
  buyStableCoin,
  sellStableCoin,
  cashback,
  settings: { security },
  saContacts,
  saGlobal,
  wc,
  qrCodeReader,
  payment,
  privacy
}
