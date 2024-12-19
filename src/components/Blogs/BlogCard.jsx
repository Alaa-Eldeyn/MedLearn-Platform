import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="rounded-3xl shadow-lg border p-3">
      <div className="relative">
        <img
          className="rounded-3xl h-56 bg-gray-200 "
          src={`http://naserehab-001-site1.mtempurl.com${blog?.imageURL}`}
          alt={blog.title || "Blog Image"}
        />
      </div>
      <div className="pt-3 font-semibold text-lg w-full">
        <h2 className="line-clamp- 1">{blog?.title}</h2>
        <p className="text-gray-500 text-sm break-all h-20 line-clamp-3">
          {blog?.intro}
        </p>
        <Link
          to={`/academy/blogs/${blog.id}`}
          className="text-center block border-2 border-secondary text-secondary p-2 w-full rounded-full"
          aria-label={`Read more about ${blog.title}`}
        >
          See More
        </Link>
      </div>
    </div>
  );
};
export default BlogCard;
