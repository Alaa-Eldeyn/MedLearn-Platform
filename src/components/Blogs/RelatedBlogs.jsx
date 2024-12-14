import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../utils/Blogs";
import BlogCard from "./BlogCard";

const RelatedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      let res = await getAllBlogs();
      setBlogs(res?.data);
    };
    fetchBlogs();
  }, []);
  return (
    <div className="mt-14">
      <div className="w-full">
        <h1 className="text-left text-xl font-bold mb-2 text-secondary">
          Related Blogs
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
        {blogs?.map((blog, index) => {
          return (
            <SwiperSlide key={index}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RelatedBlogs;
