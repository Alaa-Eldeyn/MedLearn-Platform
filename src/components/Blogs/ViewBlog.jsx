import { useParams } from "react-router-dom";
import doc from "../../assets/doc.png";
import { useEffect, useState } from "react";
import { getBlog } from "../../utils/Blogs";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";
import RelatedBlogs from "./RelatedBlogs";
const ViewBlog = () => {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    const getAllCategoriesAndSubs = async () => {
      let cat = await getAllCategories("Blogs");
      setCategories(cat?.data);
      let subs = await getAllSubCategories("Blogs");
      setSubCategories(subs?.data);
    };
    const fetchBlog = async () => {
      const blog = await getBlog(params?.id);
      setBlog(blog.data);
    };
    getAllCategoriesAndSubs();
    fetchBlog();
  }, [params?.id]);

  return (
    <>
      <div className="relative center h-[406px]">
        <img
          src={doc}
          alt="Banner image"
          className="object-cover w-full h-full z-0"
        />
      </div>
      <div className="container -translate-y-60 -mb-40">
        <h1 className="font-bold text-secondary text-center text-lg lg:text-2xl mb-5">
          {blog.title}
        </h1>
        <div className="relative w-full h-96 bg-gray-200 rounded-3xl overflow-hidden">
          <img
            src={`http://naserehab-001-site1.mtempurl.com${blog?.imageURL}`}
            alt=""
            className="w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex gap-3 mb-5 mt-3">
          <div className="py-2 px-4 bg-[#FFF2F7] rounded-lg">
            {categories?.filter((cat) => cat.id === blog?.categoryId)?.[0]
              ?.name || ""}
          </div>
          <div className="py-2 px-4 bg-[#FFF2F7] rounded-lg">
            {subCategories?.filter((sub) => sub.id === blog?.subCategoryId)?.[0]
              ?.name || ""}
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <p className="font-bold">Introduction</p>
            <p>{blog?.intro}</p>
          </div>
          <div>
            <p className="font-bold">Main Body</p>
            <p>{blog?.content}</p>
          </div>
          <div>
            <p className="font-bold">Conclusion</p>
            <p>{blog?.conclusion}</p>
          </div>
        </div>
        <RelatedBlogs />
      </div>
    </>
  );
};

export default ViewBlog;
