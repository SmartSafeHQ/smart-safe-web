import {
  ArrowsClockwise,
  CurrencyDollar,
  Gear,
  House,
  PaperPlaneTilt,
  ShoppingCartSimple,
  Wallet,
  Money
} from 'phosphor-react'

export const sidebar = {
  navigation: 'Navegação',
  contact: 'contato',
  termsOfService: 'Termos de serviço',
  navLinks: [
    {
      href: '/dashboard/home',
      icon: House,
      title: 'principal',
      isDisabled: false
    },
    {
      href: '/dashboard/receive',
      icon: Wallet,
      title: 'receber',
      isDisabled: false
    },
    {
      href: '/dashboard/send',
      icon: PaperPlaneTilt,
      title: 'enviar',
      isDisabled: false
    },
    {
      href: '/dashboard/payment',
      icon: Money,
      title: 'pagamento',
      isDisabled: false
    },
    {
      href: '/dashboard/swap',
      icon: ArrowsClockwise,
      title: 'converter',
      isDisabled: true
    },
    {
      href: '/dashboard/buy',
      icon: CurrencyDollar,
      title: 'comprar crypto',
      isDisabled: true
    },
    {
      href: '/dashboard/marketplace',
      icon: ShoppingCartSimple,
      title: 'cashback',
      isDisabled: true
    },
    {
      href: '/dashboard/settings',
      icon: Gear,
      title: 'configurações',
      isDisabled: true
    }
  ]
}
