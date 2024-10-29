import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCourse } from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import RelatedCourses from "./RelatedCoures";

const Details = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    const fetchCourse = async () => {
      let course = await getOneCourse(id);
      setCourse(course?.data);
    };
    fetchCourse();
  }, [id]);
  return (
    <>
      <div className="h-60 bg-[#1F0C30E5]"></div>
      <div className="container flex justify-between -translate-y-10 flex-col-reverse sm:flex-row">
        <div className=" -translate-y-10 sm:translate-y-0">
          <h1 className="text-2xl font-extrabold text-primary sm:text-white">
            Advanced Cardiology: Diagnosis and Treatment
          </h1>
          <section className="my-6">
            <h2 className="text-purple-800 font-semibold text-lg mb-2">
              What You Will Learn:
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-3">
              {course?.objectives?.map((obj) => (
                <li key={obj.id}>{obj.description}</li>
              ))}
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-purple-800 font-semibold text-lg mb-2">
              Course Requirements:
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {course?.requirements?.map((req) => (
                <li key={req.id}>{req.description}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="rounded-3xl p-3 overflow-hidden shadow-md border max-w-xs mx-auto sm:mx-0 bg-white -translate-y-20">
          <div className="relative w-full">
            <img
              className="w-full rounded-2xl"
              src="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/101_-What-Online-Courses-Are-Most-In-Demand-In-2023_.jpg"
              // src={course?.thumbnailURL}
              alt="Course image preview"
            />
          </div>
          <div className="p-2">
            <h2 className="font-bold text-lg mb-4">{course?.title}</h2>
            <div className="center !gap-2 flex-nowrap text-sm">
              <div className="center !gap-1 flex-1">
                <Icon
                  icon="hugeicons:money-bag-02"
                  className="size-5 text-[#CC775D]"
                />
                <span className="line-clamp-1">{course?.price}$</span>
              </div>
              <div className="center !gap-1 flex-1">
                <Icon
                  icon="mdi:category-plus"
                  className="size-5 text-[#CC775D]"
                />
                <span className="line-clamp-1">{course?.categoryName}</span>
              </div>
              <div className="center !gap-1 flex-1">
                <Icon
                  icon="mdi:category-plus"
                  className="size-5 text-[#CC775D]"
                />
                <span className="line-clamp-1">{course?.subCategoryName}</span>
              </div>
            </div>
            <button className="center text-white bg-primary p-3 w-full rounded-full mt-3">
              Enroll Now
            </button>
            <button className="block text-center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-full mt-2">
              Watch a trial lesson
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <RelatedCourses />
      </div>
    </>
  );
};

export default Details;
