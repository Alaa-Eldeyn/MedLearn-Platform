import { useEffect, useState } from "react";
import { getAllCategories, getSubs } from "../../utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getAllFreeExams,
  getAllPremiumExams,
  getFilteredExams,
} from "../../utils/Exams";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getUser } from "../../utils/LocalStorage";
import {
  requestLocalPaypalSubscription,
  requestLocalSubscription,
} from "../../utils/courses";
import EnrollModal from "../Courses/EnrollModal";
import { useNavigate } from "react-router-dom";

const Exam = ({ isFree }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [enrollPrice] = useState(50);
  const [enrollModal, setEnrollModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    subCategoryId: "",
  });
  const [exams, setExams] = useState([]);
    useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories("Exams");
      setCategories(res?.data || []);
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchSubCategories = async () => {
      let subs = await getSubs(filters.categoryId);
      setSubCategories(subs?.data);
    };
    fetchSubCategories();
  }, [filters.categoryId]);
  
  const fetchExams = async () => {
    setExams([]);
    if (isFree) {
      let res = await getAllFreeExams();
      if (res?.isSuccess) {
        setExams(res?.data);
      } else {
        toast.error(res?.message);
      }
    } else {
      let res = await getAllPremiumExams();
      if (res?.isSuccess) {
        setExams(res?.data);
      } else {
        setEnrollModal(true);
        toast.error(res?.message);
      }
    }
  };
  useEffect(() => {
    fetchExams();
  }, [isFree]);

  const handleSearch = async () => {
    let res = await getFilteredExams({ ...filters, isPremium: isFree });
    if (res?.isSuccess) {
      setExams(res?.data?.tests || []);
    } else {
      toast.error(res.message);
      setFilters({
        categoryId: "",
        subCategoryId: "",
      });
      fetchExams();
    }
  };

  const handleLocalPayment = async () => {
    let { id } = getUser();
    let data = {
      UserId: id,
      TransactionImage: receipt,
    };
    let res = await requestLocalSubscription(data);
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
    let res = await requestLocalPaypalSubscription(data);
    if (res?.isSuccess) {
      const approveLink = res.data.links.find((link) => link.rel === "approve");
      if (approveLink && approveLink.href) {
        window.location.href = approveLink.href;
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
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
        <div className="rounded-xl bg-white -translate-y-8 min-h-16 flex-1 p-3 lg:px-10 shadow-md center flex-wrap ">
          <div className="flex items-center">
            <label htmlFor="categories">Category</label>
            <select
              id="categories"
              className="bg-[#FDE7FF] text-black text-sm ml-2 font-normal rounded-full block py-2 px-3"
              value={filters.categoryId}
              onChange={(e) => {
                setFilters({ ...filters, categoryId: e.target.value });
              }}
            >
              <option value="" className="bg-white p-2 shadow-lg rounded-xl">
                All Categories
              </option>
              {categories?.map((category) => (
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
              value={filters.subCategoryId}
              onChange={(e) => {
                setFilters({ ...filters, subCategoryId: e.target.value });
              }}
            >
              <option value="" className="bg-white p-2 shadow-lg rounded-xl">
                All Sub categories
              </option>
              {subCategories?.map((subCategory) => (
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
        </div>
        <button
          className="hover:bg-secondary hover:text-white soft bg-white text-primary rounded-xl w-full sm:w-fit center -translate-y-8 px-4 min-h-16 shadow-md"
          onClick={() => handleSearch()}
        >
          <Icon icon="quill:search" className="text-3xl" />
        </button>
      </div>

      <div className="w-10/12 sm:w-full mx-auto pb-10">
        <div className="container mx-auto my-6">
          <div
            className={`grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
          >
            {exams?.map((item) => (
              <div
                key={item?.id}
                className="rounded-3xl p-3 overflow-hidden shadow-md border bg-white"
              >
                <div className="p-2">
                  <h2 className="line-clamp-1 font-bold text-xl mb-3">
                    {item?.title}
                  </h2>
                  <div className="text-gray-500 mb-5 text-sm space-y-3">
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="iconamoon:star-bold"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Full Mark: {item?.fullmark}
                    </div>
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="mingcute:time-line"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Duration (Minutes): {item?.durationInMinutes}
                    </div>
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="material-symbols:merge-type"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Type: {item?.typeName}
                    </div>
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="icon-park-twotone:muscle"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Difficulty: {item?.difficultyName}
                    </div>
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="mdi:category-plus-outline"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Category: {item?.categoryName}
                    </div>
                    <div className=" flex items-center gap-2">
                      <Icon
                        icon="mdi:category-plus-outline"
                        className="text-[#E2508D] text-lg"
                      />{" "}
                      Sub Category: {item?.subCategoryName}
                    </div>
                  </div>
                  <span className="text-xs">{item?.instructorFullName}</span>
                  <button
                    onClick={() =>
                      navigate(`${item?.id}/${item?.durationInMinutes}`)
                    }
                    className="center text-white bg-primary p-3 w-full rounded-xl mt-2"
                  >
                    Start Test Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam;
