import { useEffect, useState } from "react";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllBlogs } from "../../utils/Blogs";
import { Link } from "react-router-dom";

const Blog = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
  });
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      let res = await getAllBlogs();
      setBlogs(res?.data);
    };
    const getCategoriesAndSubs = async () => {
      let cat = await getAllCategories("Blogs");
      setCategories(cat?.data);
      let subs = await getAllSubCategories("Blogs");
      setSubCategories(subs?.data);
    };
    getCategoriesAndSubs();
    fetchBlogs();
  }, []);
  const handleSearch = async () => {
    // let res = await getFilteredBlogs(filters);
    // setBlogs(res?.data);
    console.log(filters);
  };
  return (
    <>
      <div className="center mx-auto w-[90%] lg:w-fit flex-col lg:flex-row flex-wrap ">
        <div className="rounded-xl bg-white -translate-y-8 min-h-16 flex-1 p-3 shadow-md center lg:px-10 flex-wrap ">
          <div className="flex items-center">
            <label htmlFor="categories"> Category</label>
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
            {blogs?.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow-md p-4">
                <img
                  src={"http://localhost:5000/" + blog?.imageURL}
                  alt=""
                  className="h-40 w-full bg-gray-200 rounded-lg"
                />
                <div className="mt-3 space-y-2 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-lg font-bold line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      {blog.intro}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`${blog.id}`}
                      className="rounded-full border border-[#E2508D] text-[#E2508D] text-sm text-center block p-4"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
