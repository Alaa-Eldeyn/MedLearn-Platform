import { useEffect, useState } from "react";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllBooks } from "../../utils/books";
import { Link } from "react-router-dom";

const Book = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
  });
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      let res = await getAllBooks();
      setBooks(res?.data);
      console.log(res?.data);
    };
    const getCategoriesAndSubs = async () => {
      let cat = await getAllCategories("Books");
      setCategories(cat?.data);
      let subs = await getAllSubCategories("Books");
      setSubCategories(subs?.data);
    };
    getCategoriesAndSubs();
    fetchBooks();
  }, []);
  const handleSearch = async () => {
    // let res = await getFilteredBooks(filters);
    // setBooks(res?.data);
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
            {books?.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md p-4">
                <img
                  src={book?.thumbnailURL}
                  alt=""
                  className="h-80 w-full bg-gray-200 rounded-lg"
                />
                <div className="mt-3 space-y-2 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-lg font-bold line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      {book.description}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={""}
                      className="rounded-full bg-[#59248E] text-white text-center block p-4"
                    >
                      Download This Book
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

export default Book;
