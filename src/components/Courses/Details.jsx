import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOneCourse,
  requestLocalEnroll,
  requestPaypalEnroll,
  searchForCourse,
} from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import RelatedCourses from "./RelatedCoures";
import EnrollModal from "./EnrollModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getUser } from "../../utils/LocalStorage";

const Details = () => {
  const { name, id } = useParams();
  const [course, setCourse] = useState({});
  const [enrollPrice, setEnrollPrice] = useState(0);
  const [enrollModal, setEnrollModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isMine, setIsMine] = useState(false);

  const handleLocalPayment = async () => {
    let { id } = getUser();
    let data = {
      InstructorId: course?.instructorId,
      CourseId: course?.id,
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
      courseId: course?.id,
    };
    let res = await requestPaypalEnroll(data);
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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        let course = await getOneCourse(id);
        console.log(course);
        
        if (course?.isSuccess) {
          setCourse(course?.data);
          setIsMine(true);
        } else if (!course?.isSuccess) {
          try {
            let course = await searchForCourse(name);
            setCourse(course?.data);
            setIsMine(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          toast.error("Course not found.");
        }

      } catch (error) {
        console.error(error);
      }

      
    };
    fetchCourse();
  }, [name, id]);

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
              className="w-full rounded-2xl object-cover h-56 bg-gray-200"
              src={`${import.meta.env.VITE_BASE_URL}/${course?.thumbnailURL}`}
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
            {isMine ? (
              <Link
                to={`/academy/my-courses/${id}`}
                className="center text-white bg-primary p-3 w-full rounded-full mt-3"
              >
                Go to Course
              </Link>
            ) : (
              <button
                onClick={() => {
                  setEnrollPrice(course?.price);
                  setEnrollModal(true);
                }}
                className="center text-white bg-primary p-3 w-full rounded-full mt-3"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <RelatedCourses/>
      </div>
    </>
  );
};

export default Details;
