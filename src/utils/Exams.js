import Swal from "sweetalert2";
import { z } from "zod";
import customAxios from "./customAxios";

const schema = z.object({
  examName: z.string().min(1, { message: "Exam Name is Required" }),
  subCategoryID: z.string().min(1, { message: "Please choose a Sub Category" }),
  difficulty: z
    .string()
    .min(1, { message: "Please choose a Difficulty Level" }),
  duration: z.string().min(1, { message: "Duration is Required" }),
  fullMark: z.string().min(1, { message: "Full Mark is Required" }),
});

const getAllExams = async () => {
  try {
    let response = await customAxios.get("/StandardTest/GetAllStandardTests");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getAllPremiumExams = async () => {
  try {
    let response = await customAxios.get(
      "/StandardTest/GetAllPremiumStandardTests"
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getAllFreeExams = async () => {
  try {
    let response = await customAxios.get(
      "/StandardTest/GetAllFreeStandardTests"
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const addExam = async (data) => {
  try {
    let response = await customAxios.post("/StandardTest", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const updateExam = async (id, data) => {
  try {
    let response = await customAxios.put(`/StandardTest/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getExam = async (id) => {
  try {
    let response = await customAxios.get(`/StandardTest/${id}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const deleteExam = async (id) => {
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
    title: "Delete This Exam ?",
    text: "Are You Sure that you want to delete this Exam ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`/StandardTest/${id}`);
      return response?.data;
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const addQuestion = async (testId, data) => {
  try {
    let response = await customAxios.post(`Question/test/${testId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getTestQuestions = async (testId) => {
  try {
    let response = await customAxios.get(`Question/test/${testId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const deleteQuestion = async (id) => {
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
    title: "Delete This Question ?",
    text: "Are You Sure that you want to delete this Question ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    console.log(id);
    try {
      let response = await customAxios.delete(`/Question/${id}`);
      return response?.data;
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

export {
  getAllExams,
  addExam,
  deleteExam,
  schema,
  getExam,
  updateExam,
  addQuestion,
  getTestQuestions,
  deleteQuestion,
  getAllFreeExams,
  getAllPremiumExams,
};
