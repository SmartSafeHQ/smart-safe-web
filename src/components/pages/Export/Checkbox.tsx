import type { ChangeEvent } from 'react'

type Props = {
  label: string
  htmlFor: string
  isChecked: boolean
  onChange: (_event: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function Checkbox({
  htmlFor,
  label,
  onChange,
  className,
  isChecked = false
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex gap-2 items-center uppercase font-medium ${className}`}
    >
      <input
        id={htmlFor}
        name="export"
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
      />

      {label}
    </label>
  )
}
