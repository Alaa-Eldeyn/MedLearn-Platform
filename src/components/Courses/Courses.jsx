import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getFilteredCourses,
  requestLocalEnroll,
  requestPaypalEnroll,
} from "../../utils/courses";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";
import MultiRangeSlider from "multi-range-slider-react";
import EnrollModal from "./EnrollModal";
import { getUser } from "../../utils/LocalStorage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollPrice, setEnrollPrice] = useState(0);
  const [enrollModal, setEnrollModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    minPrice: 0,
    maxPrice: 10000,
  });
  useEffect(() => {
    const fetchCourses = async () => {
      let res = await getFilteredCourses(filters);
      setCourses(res?.data);
    };
    const getCategoriesAndSubs = async () => {
      let cat = await getAllCategories("Courses");
      setCategories(cat?.data);
      let subs = await getAllSubCategories("Courses");
      setSubCategories(subs?.data);
    };
    getCategoriesAndSubs();
    fetchCourses();
  }, []);
  const handleSearch = async () => {
    let res = await getFilteredCourses(filters);
    setCourses(res?.data);
  };
  const handleLocalPayment = async () => {
    let { id } = getUser();
    let data = {
      InstructorId: selectedCourse?.instructorId,
      CourseId: selectedCourse?.id,
      StudentId: id,
      TransactionImage: receipt,
    };
    let res = await requestLocalEnroll(data);
    if (res?.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Enroll Request Sent",
        text: res.message,
        timer: 2000,
      });
    } else {
      toast.error(res.message);
    }
  };
  const handlePaypalPayment = async () => {
    let user = getUser();
    let data = {
      userId: user?.id,
      subscriberEmail: paypalEmail,
      subscriberFirstName: user?.firstName,
      subscriberLastName: user?.lastName,
    };
    let res = await requestPaypalEnroll(data);
    if (res?.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Enroll Request Sent",
        text: res.message,
        timer: 2000,
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      {enrollModal && (
        <EnrollModal
          setEnrollModal={setEnrollModal}
          enrollPrice={enrollPrice}
          setReceipt={setReceipt}
          handleLocalPayment={handleLocalPayment}
          handlePaypalPayment={handlePaypalPayment}
          setPaypalEmail={setPaypalEmail}
          paypalEmail={paypalEmail}
          receipt={receipt}
        />
      )}
      <div className="center mx-auto w-[90%] lg:w-fit flex-col lg:flex-row flex-wrap ">
        <div className="rounded-xl bg-white -translate-y-8 min-h-16 flex-1 p-3 shadow-md center lg:px-10 flex-wrap ">
          <div className="flex items-center">
            <label htmlFor="categories">Category</label>
            <select
              id="categories"
              className="bg-[#FDE7FF]  text-black text-sm ml-2 font-normal rounded-full block py-2 px-3"
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
              }}
            >
              <option value="" className="bg-white p-2 shadow-lg rounded-xl">
                All Categories
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-white"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <hr className="h-[40px] w-[.1px] bg-gray-300 hidden lg:block" />
          <div className="flex items-center">
            <label htmlFor="subCategory">Sub Category</label>
            <select
              id="subCategory"
              className="bg-[#FDE7FF]  text-black text-sm ml-2 font-normal rounded-full block py-2 px-3"
            >
              <option value="" className="bg-white p-2 shadow-lg rounded-xl">
                All Sub categories
              </option>
              {subCategories.map((subCategory) => (
                <option
                  key={subCategory.id}
                  value={subCategory.id}
                  className="bg-white "
                >
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
          <hr className="h-[40px] w-[.1px] bg-gray-300 hidden lg:block" />
          <div className="flex items-center">
            <label htmlFor="pricing">Pricing</label>
            <MultiRangeSlider
              className="min-w-[200px] ml-2"
              min={0}
              max={10000}
              minValue={filters.minPrice}
              maxValue={filters.maxPrice}
              onChange={({ minValue, maxValue }) => {
                setFilters({
                  ...filters,
                  minPrice: minValue,
                  maxPrice: maxValue,
                });
              }}
            />
          </div>
        </div>
        <button
          className="hover:bg-secondary hover:text-white soft bg-white text-primary rounded-xl w-full sm:w-fit center -translate-y-8 px-4 min-h-16 shadow-md"
          onClick={() => handleSearch()}
        >
          <Icon icon="quill:search" className="text-3xl" />
        </button>
      </div>
      <div className="w-10/12 sm:w-full mx-auto pb-20">
        <div className="container mx-auto my-6">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses?.map((item) => (
              <div
                key={item?.id}
                className="rounded-3xl p-3 overflow-hidden shadow-md border"
              >
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
                    {console.log(item)}
                    {/* {item?.objectives?.map((obj, i) => (
                      <span key={i} className="block">
                        {obj},
                      </span>
                    ))} */}
                  </p>
                  <span className="text-xs">By: {item?.instructorFullName}</span>
                  <button
                    onClick={() => {
                      setEnrollPrice(item?.price);
                      setSelectedCourse(item);
                      setEnrollModal(true);
                    }}
                    className="center text-white bg-primary p-3 w-full rounded-full mt-3"
                  >
                    Enroll Now
                  </button>
                  <Link
                    to={`${item?.id}`}
                    className="block text-center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-full mt-2"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
