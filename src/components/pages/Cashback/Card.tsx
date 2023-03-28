import Image from 'next/image'

interface CardProps {
  companyName: string
  companyImageUrl: string
}

export function Card({ companyImageUrl, companyName }: CardProps) {
  return (
    <div className=" cursor-pointer hover:scale-105 transition-transform p-4 border rounded-md w-full sm:w-56 h-48 flex items-center justify-center relative border-gray-400 dark:border-gray-800">
      <Image
        src={companyImageUrl}
        alt={`${companyName}'s image`}
        width={100}
        height={100}
      />
    </div>
  )
}
