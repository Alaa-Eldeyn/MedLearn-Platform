import { useState } from "react";
import doc from "../assets/doc.png";
import { MyJoinedCourses, MyUploadedCourses } from "../components/Courses";
import ScrollUp from "../components/ScrollUp";

const MyCourses = () => {
  const [activeTap, setActiveTap] = useState("joined");
  return (
    <>
      <ScrollUp />

      <div className="relative center h-[406px]">
        <img
          src={doc}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
        <div className="absolute z-10 text-center max-w-5xl text-white mx-auto px-5">
          <div>
            <h2 className="lg:text-4xl mb-5 font-bold text-lg  text-secondary">
              My Courses
            </h2>
            <div className="center">
              <button
                onClick={() => setActiveTap("joined")}
                className={`${
                  activeTap == "joined" ? "bg-primary" : "bg-[#402957]"
                } rounded-full text-white px-5 py-2`}
              >
                Joined Courses
              </button>
              <button
                onClick={() => setActiveTap("uploaded")}
                className={`${
                  activeTap == "uploaded" ? "bg-primary" : "bg-[#402957]"
                } rounded-full text-white px-5 py-2`}
              >
                Uploaded Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeTap == "joined" && <MyJoinedCourses />}
      {activeTap == "uploaded" && <MyUploadedCourses />}
    </>
  );
};

export default MyCourses;
