import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewCourse = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params?.id);
  }, [params?.id]);
  return (
    <>
      <div className="h-[70px] bg-[#1E0C2F]" />
      <div className="bg-gray-50 h-[1000px]">
        <div className="container">
          <h1 className="text-2xl font-bold text-[#E2508D]">
            Choose Payment Method
          </h1>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
