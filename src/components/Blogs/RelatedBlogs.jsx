import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../utils/Blogs";

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
              <div key={blog.id} className="bg-white rounded-xl shadow-md p-4">
                <img
                  src={"http://localhost:5000/" + blog?.imageURL}
                  alt=""
                  className="h-40 w-full bg-gray-200 rounded-lg"
                />
                <div className="mt-3 space-y-2 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-lg font-bold line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      {blog.intro}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`${blog.id}`}
                      className="rounded-full border border-[#E2508D] text-[#E2508D] text-sm text-center block p-4"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RelatedBlogs;
