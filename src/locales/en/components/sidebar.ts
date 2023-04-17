import {
  CurrencyDollar,
  Gear,
  House,
  PaperPlaneTilt,
  ShoppingCartSimple,
  Wallet,
  Money,
  Brain,
  DiamondsFour
} from 'phosphor-react'

export const sidebar = {
  navigation: 'Navigation',
  contact: 'contact',
  termsOfService: 'Terms of service',
  navLinks: [
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
      href: '/dashboard/smart-cash',
      icon: DiamondsFour,
      title: 'smart cash',
      isDisabled: true
    },
    {
      href: '/dashboard/cashback',
      icon: ShoppingCartSimple,
      title: 'cashback',
      isDisabled: false
    },
    {
      href: '/dashboard/smart-account/contacts',
      icon: Brain,
      title: 'smart account',
      isDisabled: false
    },
    {
      href: '/dashboard/payment',
      icon: Money,
      title: 'payment',
      isDisabled: true
    },
    {
      href: '/dashboard/buy-and-sell',
      icon: CurrencyDollar,
      title: 'buy/sell',
      isDisabled: false
    },
    {
      href: '/dashboard/settings',
      icon: Gear,
      title: 'settings',
      isDisabled: false
    }
  ]
}
