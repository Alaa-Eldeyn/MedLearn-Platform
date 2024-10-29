import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const RelatedCourses = () => {
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
        {["a", "f", "f", "a", "f", "f"].map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="rounded-3xl p-3 overflow-hidden shadow-md border">
                <div className="relative w-full">
                  <img
                    className="w-full rounded-2xl"
                    src="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/101_-What-Online-Courses-Are-Most-In-Demand-In-2023_.jpg"
                    // src={item?.thumbnailURL}
                    alt="Course image preview"
                  />
                  <div className="center !gap-2 lg:gap-3 w-[90%] mx-auto rounded-full p-3 border-[5px] border-white -translate-y-8  bg-[#CC775D] text-white text-xs soft -mb-8">
                    <div className="center !gap-1">
                      <Icon icon="mdi:category-plus" />
                      <span className="line-clamp-1">{item?.categoryName}</span>
                    </div>
                    <div className="center !gap-1">
                      <Icon icon="mdi:category-plus" />
                      <span className="line-clamp-1">
                        {item?.subCategoryName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex justify-between items-center text-lg soft">
                    <h2 className="line-clamp-1">{item?.title}</h2>
                    <h3 className="font-bold text-[#E2508D]">{item?.price}$</h3>
                  </div>
                  <p className="text-gray-500 my-2 text-sm h-14">
                    Deepen your understanding of advanced cardiovascular
                    treatments and diagnostic techniques.
                  </p>
                  <span className="text-xs">{item?.instructorFullName}</span>
                  <button className="center text-white bg-primary p-3 w-full rounded-full mt-3">
                    Enroll Now
                  </button>
                  <Link
                    to={``}
                    className="block text-center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-full mt-2"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RelatedCourses;
