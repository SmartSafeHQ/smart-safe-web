import { SVGAttributes } from 'react'

type GooglePlayProps = SVGAttributes<HTMLOrSVGElement>

export function GooglePlay(props: GooglePlayProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
    >
      <path d="M37.289 28.973l7.139-7.313L15.401 6.325a2.953 2.953 0 00-2.131-.253l24.019 22.901zM11.084 8.284a3.074 3.074 0 00-.084.694v46.044c0 .272.036.531.101.777L34.012 32.33 11.084 8.284zm26.164 27.439L13.355 57.949a2.957 2.957 0 002.046-.274l28.447-15.029-6.6-6.923zm21.731-6.376l-9.489-5.013-8.638 8.036 8.003 7.631 10.124-5.349c2.132-1.126 2.132-4.178 0-5.305z"></path>
    </svg>
  )
}
