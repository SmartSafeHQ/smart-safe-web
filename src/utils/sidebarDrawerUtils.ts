import {
  ArrowsClockwise,
  CurrencyDollar,
  Gear,
  House,
  PaperPlaneTilt,
  ShoppingCartSimple,
  Wallet
} from 'phosphor-react'

export const SIDEBAR_NAV_LINKS = [
  {
    href: '/dashboard/home',
    icon: House,
    title: 'home',
    isDisabled: false
  },
  {
    href: '/dashboard/receive',
    icon: Wallet,
    title: 'receive',
    isDisabled: false
  },
  {
    href: '/dashboard/send',
    icon: PaperPlaneTilt,
    title: 'send',
    isDisabled: false
  },
  {
    href: '/dashboard/swap',
    icon: ArrowsClockwise,
    title: 'swap',
    isDisabled: true
  },
  {
    href: '/dashboard/buy',
    icon: CurrencyDollar,
    title: 'buy',
    isDisabled: true
  },
  {
    href: '/dashboard/marketplace',
    icon: ShoppingCartSimple,
    title: 'marketplace',
    isDisabled: true
  },
  {
    href: '/dashboard/settings',
    icon: Gear,
    title: 'settings',
    isDisabled: true
  }
]
