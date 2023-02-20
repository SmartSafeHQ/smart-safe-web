import Image from 'next/image'

type Props = {
  companyName: string
  companyImageUrl: string
}

export function Card({ companyImageUrl, companyName }: Props) {
  return (
    <div
      className="
      cursor-pointer
      hover:scale-105
      transition-transform
      p-4
      border
      rounded-md
      w-full
      sm:w-56
      h-48
      flex
      items-center
      justify-center
      border-gray-400
      dark:border-gray-800"
    >
      <Image
        src={companyImageUrl}
        alt={`${companyName}'s image`}
        width={200}
        height={200}
      />
    </div>
  )
}
