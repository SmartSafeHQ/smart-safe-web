import { signIn } from './accounts/signIn'
import { signIn2FA } from './accounts/signIn2FA'
import { header } from './components/header'
import { web3Errors } from './errors/web3Errors'
import { sidebar } from './components/sidebar'
import { pagination } from './components/pagination'
import { home } from './home'
import { receive } from './receive'
import { send } from './send'
import { payment } from './payment'
import { cashback } from './cashback'
import { wc } from './accounts/wc'
import { qrCodeReader } from './components/qrCodeReader'
import { privacy } from './privacy'

export const pt = {
  signIn,
  signIn2FA,
  header,
  sidebar,
  errors: web3Errors,
  pagination,
  home,
  receive,
  send,
  cashback,
  wc,
  qrCodeReader,
  payment,
  privacy
}
