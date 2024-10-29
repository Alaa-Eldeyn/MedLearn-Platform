import { Icon } from "@iconify/react/dist/iconify.js";
import doc from "../assets/doc.png";
import { Courses } from "../components/Courses";
import { useState } from "react";
import AddCourse from "../components/Courses/AddCourse";

const AllCourses = () => {
  const [addCourseModal, setAddCourseModal] = useState(false);
  return (
    <>
      {addCourseModal && <AddCourse setAddCourseModal={setAddCourseModal} />}
      <div className="relative center h-[406px]">
        <img
          src={doc}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
        <div className="absolute z-10 text-center max-w-5xl mt-10 text-white mx-auto px-5">
          <div>
            <h2 className="lg:text-4xl mt-5 font-bold text-lg  text-secondary">
              Explore Our Medical Courses
            </h2>
            <p className=" my-4 text-xs lg:text-lg font-light leading-relaxed">
              Enhance your medical expertise with courses designed for
              healthcare professionals and students. Dive deeper into specific
              fields or explore new topics with expert-led learning experiences.
              Plus, you can upload your own courses to share your knowledge with
              others
            </p>
            <button
              type="button"
              onClick={() => setAddCourseModal(true)}
              className="mx-auto group !gap-2 center text-secondary transition-all font-bold text-lg rounded px-2 py-3"
            >
              Upload Your Course
              <Icon
                icon="ep:right"
                className="group-hover:translate-x-2 soft"
              />
            </button>
          </div>
        </div>
      </div>
      <Courses />
    </>
  );
};

export default AllCourses;
