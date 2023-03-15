import Image from 'next/image'
import { Check } from 'phosphor-react'

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
        className={`flex relative transition-colors gap-2 items-center p-2 rounded-md border-1 cursor-pointer ${
          isChecked
            ? 'border-brand-foregroundAccent1 bg-brand-foregroundAccent2/10'
            : 'border-slate-300 bg-slate-100 dark:bg-slate-200/10 dark:border-slate-600/10'
        }`}
      >
        <input
          id={htmlFor}
          name="export"
          type="checkbox"
          onChange={onChange}
          checked={isChecked}
          className={`appearance-none relative w-[20px] h-[20px] border-1 rounded-full ${
            isChecked
              ? 'border-brand-foregroundAccent1'
              : 'bg-slate-100/20 border-slate-800'
          }`}
        />

        {isChecked && (
          <Check
            size={16}
            className="absolute top-[12px] left-[10px] text-brand-foregroundAccent1 "
          />
        )}

        {iconUrl && <Image src={iconUrl} alt="" width={30} height={30} />}

        {label}
      </div>
    </label>
  )
}
