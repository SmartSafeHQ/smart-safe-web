import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefAttributes
} from 'react'
import Link, { LinkProps } from 'next/link'
import { IconProps, IconWeight } from 'phosphor-react'
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
  let iconWeight: IconWeight = 'regular'
  const parentRoute = asPath.split('/')[3]

  if (parentRoute === props.href || parentRoute === props.as) {
    isActive = true
    iconWeight = 'fill'
  }

  return (
    <Text
      asChild
      className={clsx(
        'w-full flex items-center h-10 gap-6 px-3 mr-auto text-sm font-normal rounded-lg whitespace-nowrap hover:bg-zinc-50 hover:bg-opacity-10 md:max-lg:h-auto md:max-lg:flex-col md:max-lg:py-4 md:max-lg:gap-[0.375rem] md:max-lg:text-xs',
        {
          'bg-zinc-50 bg-opacity-10 font-medium hover:!bg-opacity-20 md:max-lg:bg-transparent':
            isActive,
          'pointer-events-none text-gray-400 dark:brightness-50': isDisabled
        }
      )}
    >
      <Link ref={ref} {...props}>
        <Icon className="w-6 h-6" weight={iconWeight} />

        <Text>{children}</Text>
      </Link>
    </Text>
  )
}

export const NavLink = forwardRef(NavLinkComponent)
