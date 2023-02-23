import { X } from 'phosphor-react'

import type { ReactNode, Dispatch, SetStateAction } from 'react'

type ControlProps = {
  label: string
  icon: ReactNode
  onClick: (..._args: unknown[]) => unknown
}

function Control({ icon, label, onClick }: ControlProps) {
  return (
    <div className="flex flex-col gap-1 cursor-pointer">
      <div
        onClick={onClick}
        className="flex flex-col items-center gap-0 rounded-full border-gray-400 border-1 p-1 transition-all hover:scale-105 hover:border-gray-500"
      >
        {icon}
      </div>

      <p>{label}</p>
    </div>
  )
}

type CameraControlsProps = {
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
}

export function CameraControls({ setIsScannerOpen }: CameraControlsProps) {
  return (
    <div className="flex gap-6">
      <Control
        label="Close"
        icon={<X size={32} color="rgb(6 182 212)" />}
        onClick={() => setIsScannerOpen(false)}
      />
    </div>
  )
}
