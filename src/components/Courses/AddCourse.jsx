import { useEffect, useRef, useState } from "react";
import { getAllSubCategories } from "../../utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCourse, schema } from "../../utils/courses";
import { getUser } from "../../utils/LocalStorage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCourse = ({ setAddCourseModal }) => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [isPaid, setIsPaid] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const currentReq = useRef();
  const currentObj = useRef();
  const { id } = getUser();
  const addToRequirements = (e) => {
    e.preventDefault();
    if (!currentReq.current.value) return;
    setRequirements([...requirements, currentReq.current.value]);
    currentReq.current.value = "";
  };
  const addToObjectives = (e) => {
    e.preventDefault();
    if (!currentObj.current.value) return;
    setObjectives([...objectives, currentObj.current.value]);
    currentObj.current.value = "";
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddCourse = async () => {
    let data = {
      InstructorID: id,
      Price: isPaid ? +getValues("price") : 0,
      Type: isPaid ? 1 : 0,
      Title: getValues("title"),
      DurationInhours: +getValues("duration"),
      Preview: getValues("preview"),
      Thumbnail: getValues("thumbnail")?.[0],
      SubCategoryId: +getValues("subCategoryID"),
      Requirements: requirements,
      Objectives: objectives,
    };
    let res = await addCourse(data);
    if (res?.isSuccess) {
      setAddCourseModal(false);
      let timerInterval;
      Swal.fire({
        icon: "success",
        title: "Your course has been submitted!",
        html: "Thank you for submitting your course. It has been sent to our team for review. Now you can add lessons to your course <br></br> Auto Redirect in (<b></b>) seconds ...",
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          navigate(`/academy/courses`);
        },
      });
    }
  };
  useEffect(() => {
    const getSubs = async () => {
      let subs = await getAllSubCategories("Courses");
      setSubCategories(subs?.data);
    };
    getSubs();
  }, []);
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setAddCourseModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-10 py-6 rounded-3xl w-[60vw] h-[80vh]">
          <div className="flex justify-between">
            <h2 className="text-primary font-bold text-3xl mb-5">
              Add Your New Course Now
            </h2>
            <div className="right-6" onClick={() => setAddCourseModal(false)}>
              <Icon
                icon="solar:close-square-bold"
                className="text-4xl text-red-600 cursor-pointer soft"
              />
            </div>
          </div>
          <form className="h-[90%]">
            <div className="space-y-5 h-[85%] overflow-auto pink-sc pr-3">
              <div className="center flex-col sm:flex-row">
                <div className="flex-1 w-full">
                  <label htmlFor="title" className="text-primary">
                    Course Title
                  </label>
                  <input
                    className="input"
                    id="title"
                    placeholder="Add Course Title here"
                    {...register("title")}
                  />
                  {errors && errors?.title && (
                    <span className="text-red-500 text-sm">
                      {errors?.title?.message}
                    </span>
                  )}
                </div>
                <div className="w-full sm:max-w-[40%]">
                  <label htmlFor="sub" className="text-primary">
                    Sub Category
                  </label>
                  <select
                    id="sub"
                    className="input"
                    defaultValue={""}
                    {...register("subCategoryID")}
                  >
                    <option value="" hidden disabled>
                      Choose a sub Category
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
                  {errors && errors?.subCategoryID && (
                    <span className="text-red-500 text-sm">
                      {errors?.subCategoryID?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="center  flex-col sm:flex-row">
                <div className="flex-1 w-full">
                  <label htmlFor="duration" className="text-primary">
                    Duration ( Hours )
                  </label>
                  <input
                    type="number"
                    id="duration"
                    placeholder="Enter Duration in Hours"
                    className={`input`}
                    step={0.5}
                    {...register("duration")}
                  />
                  {errors && errors?.duration && (
                    <span className="text-red-500 text-sm">
                      {" "}
                      {errors?.duration?.message}
                    </span>
                  )}
                </div>
                <div className="mx-5">
                  <div className="center mt-8">
                    <label className="relative inline-block w-10 mr-2">
                      <input
                        type="checkbox"
                        checked={isPaid}
                        onChange={() => setIsPaid(!isPaid)}
                        className="hidden"
                      />
                      <span
                        className={`block w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                          isPaid ? "bg-primary" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-0 w-4 h-4 m-1 bg-white rounded-full shadow-md soft ${
                            isPaid ? "translate-x-4" : ""
                          }`}
                        />
                      </span>
                    </label>
                    <span
                      onClick={() => setIsPaid(!isPaid)}
                      className="select-none cursor-pointer"
                    >
                      Course is {isPaid ? "Paid" : "Free"}
                    </span>
                  </div>
                </div>
                <div className={`flex-1 ${!isPaid && "invisible"} w-full`}>
                  <label htmlFor="price" className="text-primary">
                    Paid Subscription ( $ )
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter Price"
                    className={`input`}
                    {...register("price")}
                  />
                  {errors && errors?.price && (
                    <span className="text-red-500 text-sm">
                      {errors?.price?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="center  flex-col sm:flex-row">
                <div className="flex-1 w-full">
                  <label htmlFor="preview" className="text-primary">
                    Course Introduction
                  </label>
                  <input
                    id="preview"
                    className="input"
                    type="url"
                    placeholder="Link for preview video"
                    {...register("preview")}
                  />
                  {errors && errors?.preview && (
                    <span className="text-red-500 text-sm">
                      {errors?.preview?.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <label htmlFor="thumbnail" className="text-primary">
                    Course Cover
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    {...register("thumbnail")}
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 cursor-pointer focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none file:bg-primary file:cursor-pointer file:border-0 file:me-4 file:py-3 file:px-4 file:text-white"
                  />
                  {errors && errors?.thumbnail && (
                    <span className="text-red-500 text-sm">
                      {errors?.thumbnail?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5  flex-col sm:flex-row">
                <div className="center flex-col flex-1">
                  <div className="w-full">
                    <label htmlFor="req" className="text-primary">
                      Requirements
                    </label>
                    <input
                      id="req"
                      className="input"
                      placeholder="Add Requirements here"
                      ref={currentReq}
                    />
                  </div>
                  <div className="">
                    <button
                      className="w-30 bg-primary rounded-xl text-white p-3"
                      onClick={(e) => addToRequirements(e)}
                    >{`Add to requirements`}</button>
                  </div>
                  <div className="flex-1 overflow-auto rounded-xl w-full border pink-sc p-2">
                    <ul className="space-y-1 h-40">
                      {requirements.map((req, i) => (
                        <li
                          key={i}
                          className="flex justify-between rounded-lg border font-bold border-primary py-2 px-4 text-primary"
                        >
                          <span>{req}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setRequirements(
                                requirements.filter((_, index) => index !== i)
                              );
                            }}
                          >
                            <Icon
                              icon="solar:close-square-bold"
                              className="text-2xl"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="center flex-col flex-1">
                  <div className="w-full">
                    <label htmlFor="obj" className="text-primary">
                      Objectives
                    </label>
                    <input
                      id="obj"
                      className="input"
                      placeholder="Add Objectives here"
                      ref={currentObj}
                    />
                  </div>
                  <div className="">
                    <button
                      className="w-30 bg-primary rounded-xl text-white p-3"
                      onClick={(e) => addToObjectives(e)}
                    >{`Add to Objectives`}</button>
                  </div>
                  <div className="flex-1 overflow-auto rounded-xl w-full border pink-sc p-2">
                    <ul className="space-y-1 h-40">
                      {objectives.map((obj, i) => (
                        <li
                          key={i}
                          className="flex justify-between rounded-lg border font-bold border-primary py-2 px-4 text-primary"
                        >
                          <span>{obj}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setObjectives(
                                objectives.filter((_, index) => index !== i)
                              );
                            }}
                          >
                            <Icon
                              icon="solar:close-square-bold"
                              className="text-2xl"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="w-40 text-primary border border-primary rounded-xl  p-3"
                type="button"
                onClick={() => setAddCourseModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-40 bg-primary rounded-xl text-white p-3"
                onClick={handleSubmit(handleAddCourse)}
                disabled={isSubmitting}
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
