import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="rounded-3xl p-3 overflow-hidden shadow-md border">
      <div className="relative w-full">
        <img
          className="w-full rounded-2xl min-h-52 bg-gray-200"
          src={`http://localhost:5000/${course?.thumbnailURL}`}
          alt="Course image preview"
        />
        <div className="center !gap-2 lg:gap-3 w-[90%] mx-auto rounded-full p-3 border-[5px] border-white -translate-y-8  bg-[#CC775D] text-white text-xs soft -mb-8">
          <div className="center !gap-1">
            <Icon icon="mdi:category-plus" />
            <span className="line-clamp-1">{course?.categoryName}</span>
          </div>
          <div className="center !gap-1">
            <Icon icon="mdi:category-plus" />
            <span className="line-clamp-1">{course?.subCategoryName}</span>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center text-lg soft">
          <h2 className="line-clamp-1">{course?.title}</h2>
          <h3 className="font-bold text-[#E2508D]">{course?.price}$</h3>
        </div>
        <p className="text-gray-500 my-2 text-sm h-14">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, alias?
        </p>
        <span className="text-xs">{course?.instructorFullName}</span>
        <button className="center text-white bg-primary p-3 w-full rounded-full mt-3">
          Enroll Now
        </button>
        <Link
          to={`/academy/courses/${course?.id}`}
          className="block text-center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-full mt-2"
        >
          See More
        </Link>
      </div>
    </div>
  );
};
export default CourseCard;
