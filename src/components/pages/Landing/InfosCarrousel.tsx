import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import 'swiper/css'
import 'swiper/css/pagination'

interface InfosCarrouselProps {
  infos: { id: string; title: string; description: string }[]
}

const CAROUSEL_SPEED = 2000
const CAROUSEL_DELAY = 500

export function InfosCarrousel({ infos }: InfosCarrouselProps) {
  return (
    <div className="w-full flex flex-col items-center cursor-grab">
      <Swiper
        modules={[Autoplay, Pagination]}
        centeredSlides={true}
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + ' !w-3 !h-3 !bg-gray-900"></span>'
            )
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
        {infos.map(item => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col items-start gap-6">
              <Heading
                asChild
                className="max-w-[35rem] text-4xl leading-tight text-black lg:text-6xl lg:leading-[4.5rem]"
              >
                <h1>{item.title}</h1>
              </Heading>

              <Text
                asChild
                className="w-full mb-12 text-xl font-medium text-gray-900 leading-relaxed lg:text-2xl lg:max-w-2xl"
              >
                <p>{item.description}</p>
              </Text>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
