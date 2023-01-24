import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefAttributes
} from 'react'
import Link, { LinkProps } from 'next/link'
import { IconProps } from 'phosphor-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Text } from '@components/Text'

interface NavLinkProps extends LinkProps {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  isDisabled?: boolean
  children: ReactNode
}

const NavLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NavLinkProps
> = ({ Icon, isDisabled = false, children, ...props }, ref) => {
  const { asPath } = useRouter()

  let isActive = false

  if (
    asPath.startsWith(String(props.href)) ||
    asPath.startsWith(String(props.as))
  ) {
    isActive = true
  }

  return (
    <Text
      asChild
      className={clsx(
        'w-full flex flex-row items-center gap-5 text-lg capitalize font-medium transition-all hover:brightness-75 md:flex-col md:gap-1 md:text-sm lg:flex-row lg:gap-5 lg:text-lg',
        {
          'text-cyan-500': isActive,
          'pointer-events-none brightness-50': isDisabled
        }
      )}
    >
      <Link ref={ref} {...props}>
        <Icon className="w-6 h-6" weight="bold" />

        <Text>{children}</Text>
      </Link>
    </Text>
  )
}

export const NavLink = forwardRef(NavLinkComponent)
