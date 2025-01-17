import { useEffect, useState } from "react";
import { getUser } from "../../utils/LocalStorage";
import noResults from "../../assets/rafiki.svg";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getUploadedCourses, requestDelete } from "../../utils/courses";
import AddCourse from "./AddCourse";
import { toast } from "react-toastify";

const MyUploadedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [addCourseModal, setAddCourseModal] = useState(false);
  let { id } = getUser();
  useEffect(() => {
    const fetchCourses = async () => {
      let res = await getUploadedCourses(id);
      if (res?.isSuccess) {
        setCourses(res?.data);
        console.log(res?.data);
      }
    };
    fetchCourses();
  }, []);
  const handleDelete = async (id) => {
    let res = await requestDelete(id);
    if (res?.isSuccess) {
      toast.success("Request sent successfully");
    }
  };
  return (
    <>
      {addCourseModal && <AddCourse setAddCourseModal={setAddCourseModal} />}
      {courses?.length === 0 ? (
        <div className="center -translate-y-20 flex-col">
          <img src={noResults} alt="" className="w-92" />
          <span className="text-[#CC775D] font-bold">Nothing here yet</span>
          <button
            onClick={() => setAddCourseModal(true)}
            className="rounded-full px-5 py-2 bg-primary text-white"
          >
            Upload Your Course Now
          </button>
        </div>
      ) : (
        <div className="w-10/12 sm:w-full mx-auto py-20 -translate-y-48 -mb-48">
          <div className="container mx-auto my-6">
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses?.map((item) => (
                <div
                  key={item?.id}
                  className="rounded-3xl p-3 overflow-hidden shadow-md border bg-white"
                >
                  <div className="relative w-full">
                    <img
                      className="w-full rounded-2xl h-52 bg-gray-200"
                      src={`${import.meta.env.VITE_BASE_URL}/${
                        item?.thumbnailURL
                      }`}
                      alt="Course image preview"
                    />
                    <div className="center !gap-2 lg:gap-3 w-[90%] mx-auto rounded-full p-3 border-[5px] border-white -translate-y-8  bg-[#CC775D] text-white text-xs soft -mb-8">
                      <div className="center !gap-1">
                        <Icon icon="mdi:category-plus" />
                        <span className="line-clamp-1">
                          {item?.categoryName}
                        </span>
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
                      <h3 className="font-bold text-[#E2508D]">
                        {item?.price}$
                      </h3>
                    </div>
                    <p className="text-gray-500 my-2 text-sm h-14">
                      {item?.objectives?.map((obj) => {
                        return `${obj.description}${item?.objectives?.indexOf(obj) === item?.objectives?.length - 1 ? '.' : ','}`
                      })}
                    </p>
                    <span className="text-xs">{item?.instructorFullName}</span>
                    <button className="center text-white bg-primary p-3 w-full rounded-full mt-3">
                      Enroll Now
                    </button>
                    <div className="center !gap-2 mt-5">
                      <Link
                        to={`/academy/update-course/${item?.id}`}
                        className=" text-primary border border-primary p-3 w-full rounded-xl center gap-2"
                      >
                        <Icon icon="icon-park-outline:edit-two" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className=" text-[#FF2929] border border-[#FF2929] p-3 w-full rounded-xl center gap-2"
                      >
                        <Icon icon="fluent:delete-32-regular" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyUploadedCourses;
