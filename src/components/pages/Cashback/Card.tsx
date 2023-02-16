import Image from 'next/image'

type Props = {
  companyName: string
  companyImageUrl: string
}

export function Card({ companyImageUrl, companyName }: Props) {
  return (
    <div className="cursor-pointer hover:scale-105 hover:transition-transform">
      <Image
        src={companyImageUrl}
        alt={`${companyName}'s image`}
        width={200}
        height={200}
      />
    </div>
  )
}
