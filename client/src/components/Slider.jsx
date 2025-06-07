import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Slider = () => {
  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/slider') // backend API
      .then(res => res.json())
      .then(data => setImageIds(data.map(img => img.id)))
      .catch(console.error);
  }, []);

  return (
    <section className="pt-24 bg-[#f2f3f4]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="py-10"
      >
        {imageIds.map((id) => (
          <SwiperSlide key={id}>
            <div className="flex justify-center items-center h-full">
              <img
                src={`http://localhost:4000/api/slider/image/${id}`}
                alt="Result Slide"
                className="object-contain h-40 w-auto rounded-md shadow-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
