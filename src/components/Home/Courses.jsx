import { Link } from "react-router-dom";
import MainTitle from "./MainTitle";
import { Icon } from "@iconify/react/dist/iconify.js";

const Courses = ({ courses }) => {
  return (
    <>
      <div className="w-10/12 sm:w-full mx-auto pb-32 pt-12">
        <MainTitle
          title={"Our Courses"}
          desc={"Explore Our Top Medical Courses"}
        />
        <div className="container mx-auto my-6">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses?.map((item) => (
              <div
                key={item?.id}
                className="rounded-3xl p-3 overflow-hidden shadow-md border"
              >
                <div className="relative w-full">
                  <img
                    className="w-full rounded-2xl object-cover h-52"
                    src={import.meta.env.VITE_BASE_URL + item?.thumbnailURL}
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
                    {item?.objectives?.map((obj) => (
                      <span key={obj.id}>{obj.description}, </span>
                    ))}
                  </p>
                  <span className="text-xs">
                    By: {item?.instructorFullName}
                  </span>
                  {/* <button className="center text-white bg-primary p-3 w-full rounded-full mt-3">
                    Enroll Now
                  </button> */}
                  <Link
                    to={`/academy/courses/${item?.title}/${item?.id}`}
                    className="block text-center text-[#E2508D] hover:text-white hover:bg-[#E2508D] soft border border-[#E2508D] p-3 w-full rounded-full mt-2"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="center">
          <Link
            to={"/academy/courses"}
            className="rounded-xl center !gap-3 group text-secondary font-bold text-center py-2 px-5 text-lg border-2 border-secondary"
          >
            Show All Courses
            <Icon icon="ep:right" className="group-hover:translate-x-2 soft" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Courses;
