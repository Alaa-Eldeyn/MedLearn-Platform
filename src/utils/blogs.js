import { z } from "zod";
import Swal from "sweetalert2";
import customAxios from "./customAxios";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 character" })
    .max(255, { message: "Name is too long." }),
  intro: z.string().min(1, { message: "You must add an introduction" }),
  content: z
    .string()
    .min(10, { message: "Content must contain at least 10 character" }),
  conclusion: z.string().min(1, { message: "You must add a conclusion" }),
  subcategory: z.string().min(1, { message: "Please select a subcategory" }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  image: z.any(),
});

const addBlog = async (data) => {
  try {
    let response = await customAxios.post("Blog", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getBlog = async (id) => {
  try {
    let response = await customAxios.get(`Blog/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllBlogs = async () => {
  try {
    let response = await customAxios.get(`Blog`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteBlog = async (id) => {
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: "bg-red-500 text-white mr-5 py-3 px-8 rounded-full",
      cancelButton: "bg-[#FEF3FF] text-black  py-3 px-8 rounded-full",
      title: "text-red-500",
      icon: "!text-red-500 !border-red-500",
    },
    buttonsStyling: false,
  });
  const result = await customSwal.fire({
    icon: "warning",
    title: "Delete This Blog?",
    text: "Are You Sure that you want to delete this Blog?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Blog/${id}`);
      if (response.data.isSuccess) {
        await Swal.fire({
          icon: "success",
          title: "Blog Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const updateBlog = async (data) => {
  try {
    let response = await customAxios.put(`Blog`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getFilteredBlogs = async (filters) => {
  try {
    const categoryId = filters?.categoryId ? Number(filters.categoryId) : "";
    const subCategoryId = filters?.subCategoryId ? Number(filters.subCategoryId) : "";
    let response = await customAxios.get(`/Blog/GetBlogsFilteredPaginated?categoryId=${categoryId}&subCategoryId=${subCategoryId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { schema, addBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, getFilteredBlogs };
