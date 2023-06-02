import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefAttributes
} from 'react'
import Link, { LinkProps } from 'next/link'
import { IconProps, IconWeight } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text'

import { useSafe } from '@contexts/SafeContext'

interface NavLinkProps extends LinkProps {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  children: ReactNode
  basePath: string
  activePath?: string
  isDisabled?: boolean
  partner?: string
}

const NavLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NavLinkProps
> = (
  {
    Icon,
    isDisabled = false,
    partner,
    href,
    basePath,
    activePath,
    children,
    ...props
  },
  ref
) => {
  const { asPath } = useRouter()

  const { safe } = useSafe()

  let isActive = false
  let iconWeight: IconWeight = 'regular'
  const arrayRoute = asPath.split('/')
  const parentRoute = arrayRoute.slice(3).join('/')

  if (
    parentRoute.startsWith(activePath ?? '/') ||
    asPath.split('/')[3] === activePath
  ) {
    isActive = true
    iconWeight = 'fill'
  }

  return (
    <Text
      asChild
      className={clsx(
        'w-full flex items-center h-10 gap-6 px-3 mr-auto text-sm font-normal rounded-lg whitespace-nowrap hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 md:max-lg:h-auto md:max-lg:flex-col md:max-lg:py-4 md:max-lg:gap-[0.375rem] md:max-lg:text-xs md:max-lg:text-center md:max-lg:whitespace-normal',
        {
          'bg-zinc-500/10 dark:bg-zinc-50/10 font-medium hover:bg-zinc-500/20 hover:dark:bg-zinc-50/20':
            isActive,
          'pointer-events-none text-zinc-400 dark:brightness-50':
            isDisabled || !safe?.id
        }
      )}
    >
      <Link ref={ref} href={`${basePath}/${href}`} {...props}>
        {partner ? (
          <Image
            src={partner}
            alt="partner logo icon"
            width={20}
            height={20}
            className="mr-2"
          />
        ) : (
          <Icon className="w-6 h-6" weight={iconWeight} />
        )}

        <Text>{children}</Text>
      </Link>
    </Text>
  )
}

export const NavLink = forwardRef(NavLinkComponent)
