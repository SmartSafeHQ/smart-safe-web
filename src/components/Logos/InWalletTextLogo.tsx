import { SVGAttributes } from 'react'

type InWalletTextLogoProps = SVGAttributes<HTMLOrSVGElement>

export function InWalletTextLogo(props: InWalletTextLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="88"
      fill="none"
      viewBox="0 0 512 88"
      {...props}
    >
      <path
        fill="#C30C13"
        d="M49.96 0c-.05-.01-11.29 2.82-25 6.27L.02 12.55l-.01 6.29L0 25.12l.18.05c.09.02 11.32 2.85 24.93 6.27 13.62 3.43 24.79 6.23 24.84 6.23.04 0 11.25-2.81 24.91-6.25 13.67-3.44 24.88-6.26 24.93-6.28l.08-.02V12.55L74.95 6.28C61.24 2.83 50 0 49.96 0zm424.11 20.96v8.92H512v-8.92h-37.93zm-317.05.06v47.33h10.61V21.02h-10.61zm22.82 0v47.33h9.87V37.52l20.28 30.83h10.89L189.3 21.02h-9.46zm31.23 0v22.86c.54 1.89 3.18 9.67 9.81 13.72V21.02h-9.81zm18.17 0l14.61 47.33h11.22l8.99-34.88 8.86 34.88h8.99l-12.37-47.33h-10.62l-9.06 35.1-9.33-35.1h-11.29zm58.76 0l-7.64 29.21c0 .27-.21 5.95 6.28 9.87l12.11-39.08H288zm29.14 0l-19.2 47.33h10.82l6.36-17.24 7.3-18.87 13.45 36.11h11.29l-18.79-47.33h-11.23zm38.05.07v47.33h29.88v-9.26l-19.27-.07v-38h-10.61zm38.34 0v47.33h29.88v-9.26l-19.27-.07v-38h-10.61zm38.4.07v47.33h35.36v-8.65l-24.81-.07V29.82h24.06v-8.66h-34.61zm60.36 12.33c-1.48.05-3.09.51-4.63 1.73h-.07v33.07h10.62V35.22s-2.66-1.85-5.92-1.73zM99.88 37.52l-.11.03c-.06.01-11.29 2.84-24.97 6.28l-24.85 6.25-24.94-6.27C11.29 40.35.05 37.53.04 37.53H.03c-.01 0-.02 2.83-.01 6.28l.01 6.28 24.91 6.27c13.7 3.45 24.96 6.27 25.02 6.27.07 0 11.32-2.82 25.01-6.27l24.88-6.26.01-6.29.02-6.29zm350.44 2.98l-1.22 8.65h15.15V40.5h-13.93zM0 62.48l.02 6.29.01 6.28 24.95 6.29 24.96 6.28 24.96-6.28 24.97-6.28V62.48l-.08.02c-.05.02-11.26 2.84-24.92 6.28-13.67 3.44-24.88 6.25-24.92 6.25-.04 0-11.26-2.81-24.93-6.25S.13 62.52.09 62.5L0 62.48z"
      ></path>
    </svg>
  )
}
