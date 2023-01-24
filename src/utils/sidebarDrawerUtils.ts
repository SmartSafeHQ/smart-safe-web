import {
  ArrowsClockwise,
  Gear,
  House,
  RocketLaunch,
  ShoppingCartSimple
} from 'phosphor-react'

export const SIDEBAR_NAV_LINKS = [
  {
    href: '/dashboard/home',
    icon: House,
    title: 'home',
    isDisabled: false
  },
  {
    href: '/dashboard/swap',
    icon: ArrowsClockwise,
    title: 'swap',
    isDisabled: true
  },
  {
    href: '/dashboard/marketplace',
    icon: ShoppingCartSimple,
    title: 'marketplace',
    isDisabled: true
  },
  {
    href: '/dashboard/stake',
    icon: RocketLaunch,
    title: 'stake',
    isDisabled: true
  },
  {
    href: '/dashboard/settings',
    icon: Gear,
    title: 'settings',
    isDisabled: true
  }
]
