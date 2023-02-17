import { signIn } from './accounts/signIn'
import { header } from './header'
import { web3Errors } from './errors/web3Errors'
import { sidebar } from './sidebar'
import { pagination } from './pagination'
import { home } from './home'
import { receive } from './receive'
import { send } from './send'

export const en = {
  signIn,
  header,
  sidebar,
  errors: web3Errors,
  pagination,
  home,
  receive,
  send
}
