import { useEffect, useState } from "react";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllBlogs, getFilteredBlogs } from "../../utils/blogs";
import BlogCard from "./BlogCard";
import { toast } from "react-toastify";

const Blog = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: "",
    subCategoryId: "",
  });
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    let res = await getAllBlogs();
    if (res?.isSuccess) {
      setBlogs(res?.data);
    }
  };
  useEffect(() => {
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
    console.log(filters);
    let res = await getFilteredBlogs(filters);
    console.log(res?.data?.items || []);
    if (res?.isSuccess) {
      setBlogs(res?.data?.items || []);
    } else {
      toast.error(res.message);
      setFilters({
        categoryId: "",
        subCategoryId: "",
      });
      fetchBlogs();
    }
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
              value={filters.categoryId}
              onChange={(e) => {
                setFilters({ ...filters, categoryId: e.target.value });
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
              value={filters.subCategoryId}
              onChange={(e) => {
                setFilters({ ...filters, subCategoryId: e.target.value });
              }}
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
      <div className="container mx-auto my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
