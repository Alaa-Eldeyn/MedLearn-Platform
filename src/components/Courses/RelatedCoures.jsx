import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../utils/courses";
import { useEffect, useState } from "react";

const RelatedCourses = () => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const fetchCourses = async () => {
    let res = await getAllCourses();
    setRelatedCourses(res?.data);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="-translate-y-10 pb-10">
      <div className="w-full">
        <h1 className="text-left text-xl font-bold mb-2 text-bgFontColor">
          Related Courses
        </h1>
      </div>
      <Swiper
        spaceBetween={40}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="px-10 select-none py-2"
      >
        {relatedCourses?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <CourseCard course={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RelatedCourses;
