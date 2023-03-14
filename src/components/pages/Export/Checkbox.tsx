import Image from 'next/image'

import type { ChangeEvent } from 'react'

type Props = {
  label: string
  htmlFor: string
  isChecked: boolean
  className?: string
  iconUrl?: string
  onChange: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox({
  htmlFor,
  label,
  onChange,
  className,
  iconUrl,
  isChecked = false
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex gap-2 items-center uppercase font-medium ${className}`}
    >
      <div
        className={`flex transition-colors gap-2 items-center p-2 rounded-md border-1 cursor-pointer ${
          isChecked
            ? 'border-brand-foregroundAccent1 bg-brand-foregroundAccent2/10'
            : 'border-slate-300 bg-slate-200 dark:bg-slate-200/10 dark:border-slate-600/10'
        }`}
      >
        <input
          id={htmlFor}
          name="export"
          type="checkbox"
          onChange={onChange}
          checked={isChecked}
          className="appearance-none"
        />

        {iconUrl && <Image src={iconUrl} alt="" width={30} height={30} />}

        {label}
      </div>
    </label>
  )
}
