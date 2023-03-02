import { AwsLogo } from '@components/Logos/AwsLogo'
import { MoonPayLogo } from '@components/Logos/MoonPayLogo'
import { R3Logo } from '@components/Logos/R3Logo'
import { TransakLogo } from '@components/Logos/TransakLogo'
import { WalletConnectLogo } from '@components/Logos/WalletConnectLogo'

export const landing = {
  headTitle: 'InWallet',
  headDescription: 'InWallet landing page',
  heroTitle: 'Onde cripto acha finanças',
  heroDescription:
    'Diga adeus para gerenciar várias carteiras e olá para a sua melhor experiência cripto.',
  signIn: 'Entrar',
  getStarted: 'Começar',
  heroImageAlt: 'Dois celulares mostrando uma prévia do aplicativo inWallet',
  webMockupImageAlt:
    'Um computador mostrando uma prévia do aplicativo web inWallet',
  carrouselInfos: [
    {
      id: '01',
      title: 'Simplicidade e segurança.',
      description:
        'Assuma o controle de suas criptomoedas, com nossa carteira multi-chain não custodial.'
    },
    {
      id: '02',
      title: 'Libere seu potencial cripto.',
      description:
        'Maximize seus ganhos com criptomoedas, com nossa carteira multi-chain e serviços financeiros integrados.'
    },
    {
      id: '03',
      title: 'Sua solução cripto tudo-em-um.',
      description:
        'Experimente o futuro das finanças, com nossa revolucionária tecnologia de carteira.'
    }
  ],
  cardMockupTitle: 'Sua única carteira para gerenciamento cripto cross-chain.',
  cardMockupImageAlt: 'Um cartão com ilustração da marca Tokenverse',
  cellPhoneMockupImageAlt:
    'Um celular mostrando uma prévia do aplicativo inWallet',
  networksSupportTitle:
    'Descubra o poder do multi-chain e eleve sua experiência cripto a novos patamares',
  wCSupportSubTitle: 'Disponível em todos os dApps que suportam WalletConnect',
  currentlyOn: 'Atualmente em:',
  partners: 'Parceiros',
  carrouselPartners: [
    {
      id: 'aws',
      name: 'aws',
      Image: AwsLogo
    },
    {
      id: 'r3',
      name: 'r3',
      Image: R3Logo
    },
    {
      id: 'transak',
      name: 'transak',
      Image: TransakLogo
    },
    {
      id: 'moonPay',
      name: 'moonPay',
      Image: MoonPayLogo
    },
    {
      id: 'walletConnect',
      name: 'wallet connect',
      Image: WalletConnectLogo
    }
  ],
  footerCtaTitle01: 'Acesse o aplicativo ou',
  footerCtaTitle02: 'acesse na web',
  footerCtaSubTitle01: 'Gerencie todos os seus ativos',
  footerCtaSubTitle02: 'em um só lugar.',
  footerSubGetStarted: 'Comece agora com seu super aplicativo de carteira'
}
