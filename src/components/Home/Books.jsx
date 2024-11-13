import { Link } from "react-router-dom";
import www from "../../assets/www.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const Books = ({ books }) => {
  console.log(books);
  
  return (
    <>
      <section className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#97355E] p-8 sm:p-12 md:p-16 rounded-2xl my-10 flex justify-between items-center lg:gap-6">
          <div className="text-center lg:text-left lg:w-1/2 overflow-hidden">
            <h1 className="text-2xl font-bold text-[#F799C0]">
              Explore Essential Medical Books!
            </h1>
            <p className="mt-3 text-base font-normal text-md text-white">
              Discover a curated selection of medical books to support your
              learning and professional growth. Browse through detailed
              descriptions and download resources directly from our Telegram
              channel.
            </p>

            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              loop
              className="h-40 select-none mt-5 px-5"
            >
              {books?.map((book, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={book?.thumbnailURL}
                    alt={book?.title}
                    className="h-40 w-full object-cover rounded-lg bg-slate-500"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-5 flex justify-center lg:justify-start">
              <Link
                to="/academy/books"
                className="center group !gap-3 text-lg py-2 font-bold text-white "
              >
                Show All Books
                <Icon
                  icon="ep:right"
                  className="group-hover:translate-x-2 soft"
                />
              </Link>
            </div>
          </div>

          <div className="w-[24rem] hidden lg:block">
            <img
              src={www}
              className="hidden lg:flex rounded-3xl "
              alt="Main book image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Books;
