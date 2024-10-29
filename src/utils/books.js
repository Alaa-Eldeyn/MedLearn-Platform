import { z } from "zod";
import customAxios from "./customAxios";
import Swal from "sweetalert2";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 character" })
    .max(255, { message: "Name is too long." }),
  description: z
    .string()
    .min(10, { message: "Description must contain at least 10 character" })
    .max(1000, { message: "Description is too long." }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  subcategory: z.string().min(1, { message: "Please select a subcategory" }),
  downloadLink: z.string().url(),
  cover: z.any(),
});

const addBook = async (data) => {
  try {
    let response = await customAxios.post("Book", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getBook = async (id) => {
  try {
    let response = await customAxios.get(`Book/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllBooks = async () => {
  try {
    let response = await customAxios.get(`Book`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteBook = async (id) => {
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
    title: "Delete This Book ?",
    text: "Are You Sure that you want to delete this Book ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Book/${id}`);
      if (response.data.isSuccess) {
        await Swal.fire({
          icon: "success",
          title: "Blog Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const updateBook = async (id, data) => {
  try {
    let response = await customAxios.put(`Book/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { schema, addBook, updateBook, getBook, getAllBooks, deleteBook };
