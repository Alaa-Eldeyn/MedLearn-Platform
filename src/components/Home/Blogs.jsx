import { Link } from "react-router-dom";
import MainTitle from "./MainTitle";
import { Icon } from "@iconify/react/dist/iconify.js";

const Blogs = ({ blogs }) => {
  return (
    <>
      <div className="w-10/12 sm:w-full mx-auto py-24">
        <MainTitle title={"Our Blogs"} desc={"Explore Our Top Blogs"} />
        <div className="container mx-auto my-6">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs?.map((blog, index) => (
              <div key={index} className="rounded-3xl shadow-lg border p-3">
                <div className="relative">
                  <img
                    className="rounded-3xl"
                    src="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/101_-What-Online-Courses-Are-Most-In-Demand-In-2023_.jpg"
                    // src={`http://localhost:5000${blog?.imageURL}`}
                    alt={blog.title || "Blog Image"}
                  />
                </div>
                <div className="space-y-2 pt-3 font-semibold text-lg">
                  <h2 className="line-clamp-1">{blog?.title}</h2>
                  <p className="leading-6 text-gray-500 line-clamp-3 text-sm h-20">
                    {blog?.intro}
                  </p>
                  <Link
                    to={`/academy/blogs/${blog.id}`}
                    className="text-center block border-2 mt-2 border-secondary text-secondary p-2 w-full rounded-full"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="center">
          <Link
            to={`/academy/blogs`}
            className="rounded-xl center !gap-3 group text-secondary font-bold text-center py-2 px-5 text-lg border-2 border-secondary"
          >
            Show All Blogs
            <Icon icon="ep:right" className="group-hover:translate-x-2 soft" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Blogs;
