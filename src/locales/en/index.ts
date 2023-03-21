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
import { cashback } from './cashback'
import { security } from './settings/security'
import { wc } from './accounts/wc'
import { qrCodeReader } from './components/qrCodeReader'
import { privacy } from './privacy'

export const en = {
  signIn,
  signIn2FA,
  header,
  sidebar,
  errors: { web3E, authE, ...defaultErrors },
  pagination,
  home,
  receive,
  send,
  cashback,
  settings: { security },
  wc,
  qrCodeReader,
  payment,
  privacy
}
