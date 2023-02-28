import { SVGAttributes } from 'react'

type R3LogoProps = SVGAttributes<HTMLOrSVGElement>

export function R3Logo(props: R3LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="470"
      height="356"
      fill="none"
      viewBox="0 0 470 356"
      {...props}
    >
      <g clipPath="url(#clip0_373_2)">
        <path
          fill="#E52328"
          d="M470 206.366a29.88 29.88 0 01-4.986 16.647 29.929 29.929 0 01-13.408 11.067 29.96 29.96 0 01-32.662-6.405 29.878 29.878 0 01-6.543-32.604 29.915 29.915 0 0111.023-13.44 29.96 29.96 0 0116.643-5.048 29.91 29.91 0 0121.136 8.703 29.85 29.85 0 018.797 21.08z"
        ></path>
        <path
          fill="#F3F4F6"
          d="M291.656 118.363l40.623-58.797V0H202.84l-41.18 59.559h97.689l-50.295 72.766 29.934 51.585a60.359 60.359 0 0172.759 9.747 60.232 60.232 0 0117.073 34.765 60.2 60.2 0 01-7.629 37.965 60.298 60.298 0 01-29.181 25.488 60.373 60.373 0 01-38.681 2.484 60.324 60.324 0 01-32.207-21.546 60.219 60.219 0 01-12.431-36.678h-59.916a120.383 120.383 0 0018.5 64.745 120.547 120.547 0 0050.39 44.715 120.699 120.699 0 0066.538 10.716 120.65 120.65 0 0061.902-26.63 120.469 120.469 0 0037.929-55.658 120.357 120.357 0 002.108-67.298 120.46 120.46 0 00-34.372-57.918 120.632 120.632 0 00-60.114-30.444zM120.438 0a120.4 120.4 0 00-60.386 16.12V0H0v236.128h60.052V119.709h.05a60.1 60.1 0 0117.736-42.47 60.217 60.217 0 0142.6-17.502l20.119-.185L181.73-.014 120.438 0z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_373_2">
          <path fill="#fff" d="M0 0H470V356H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
