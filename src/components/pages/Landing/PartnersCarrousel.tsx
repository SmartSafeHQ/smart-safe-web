import { ReactElement, SVGAttributes } from 'react'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

interface PartnersCarrouselProps {
  partners: {
    id: string
    Image: (_props: SVGAttributes<HTMLOrSVGElement>) => ReactElement
  }[]
}

const CAROUSEL_SPEED = 2000
const CAROUSEL_DELAY = 500

export function PartnersCarrousel({ partners }: PartnersCarrouselProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      centeredSlides={true}
      spaceBetween={40}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
        horizontalClass: '!bottom-[-6px]',
        renderBullet: function (index, className) {
          return '<span class="' + className + ' !w-3 !h-3 !bg-gray-50"></span>'
        }
      }}
      autoplay={{
        delay: CAROUSEL_DELAY,
        disableOnInteraction: false,
        waitForTransition: false
      }}
      speed={CAROUSEL_SPEED}
      style={{
        width: '100%'
      }}
    >
      {partners.map(partner => (
        <SwiperSlide key={partner.id}>
          <div className="w-full flex flex-col items-center justify-center ">
            <partner.Image className="w-96 h-96" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
