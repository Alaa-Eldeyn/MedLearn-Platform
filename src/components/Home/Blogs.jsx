import { Link } from "react-router-dom";
import MainTitle from "./MainTitle";
import { Icon } from "@iconify/react/dist/iconify.js";
import BlogCard from "../Blogs/BlogCard";

const Blogs = ({ blogs }) => {
  return (
    <>
      <div className="w-10/12 sm:w-full mx-auto py-24">
        <MainTitle title={"Our Blogs"} desc={"Explore Our Top Blogs"} />
        <div className="container mx-auto my-6">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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
