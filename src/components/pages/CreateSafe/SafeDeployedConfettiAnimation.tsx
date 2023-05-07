import { HTMLAttributes, useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import clsx from 'clsx'

import animationData from '../../../../public/animations/confetti-animation.json'

type SafeDeployedConfettiAnimationProps = HTMLAttributes<HTMLDivElement>

export function SafeDeployedConfettiAnimation({
  className,
  ...props
}: SafeDeployedConfettiAnimationProps) {
  const container = useRef(null)

  useEffect(() => {
    if (!container.current) return

    const anim = lottie.loadAnimation({
      container: container.current,
      name: 'safe successfully created on smart safe confetti animation',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })

    return () => anim.destroy()
  }, [])

  return (
    <div
      ref={container}
      className={clsx('w-full h-full', className)}
      {...props}
    />
  )
}
