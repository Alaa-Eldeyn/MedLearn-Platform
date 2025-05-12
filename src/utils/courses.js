import Swal from "sweetalert2";
import customAxios from "./customAxios";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subCategoryID: z.string().min(1, { message: "Sub Category is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  price: z.string().min(0, { message: "Price is required" }).default("0"),
  preview: z.string().min(1, { message: "Preview is required" }),
  thumbnail: z.any(),
});

const getJoinedCourses = async (studentId) => {
  try {
    let response = await customAxios.get(`/Course/Student/${studentId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getUploadedCourses = async (instructorId) => {
  try {
    let response = await customAxios.get(`/Course/Instructor/${instructorId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getFilteredCourses = async (filters) => {
  const categoryId = filters?.categoryId ? Number(filters.categoryId) : "";
  const subCategoryId = filters?.subCategoryId
    ? Number(filters.subCategoryId)
    : "";
  const minPrice = filters?.minPrice ? Number(filters.minPrice) : "";
  const maxPrice = filters?.maxPrice ? Number(filters.maxPrice) : "";
  try {
    let response = await customAxios.get(`/Course/GetAllCoursesFilteredPaginated?categoryId=${categoryId}&subCategoryId=${subCategoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageSize=${filters?.pageSize}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getAllCourses = async () => {
  try {
    let response = await customAxios.get("/Course/All");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getPendingCourses = async () => {
  try {
    let response = await customAxios.get("/Dashboard/PendingApproval");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getApprovedCourses = async () => {
  try {
    let response = await customAxios.get("/Dashboard/Approved");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getOneCourse = async (id) => {
  try {
    let response = await customAxios.get(`/Course/${id}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const approveCourse = async (courseId) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/ApproveAddingCourse/${courseId}`
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const rejectCourse = async (courseId) => {
  let reason = await Swal.fire({
    icon: "warning",
    title: "Reject Course!?",
    input: "textarea",
    inputPlaceholder: "Enter Rejection Reason...",
  });
  if (reason?.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Dashboard/RejectAddingCourse/${courseId}`,
        {
          params: reason?.value,
        }
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const editCourse = async (data) => {
  try {
    let response = await customAxios.put("/Course/EditCourse", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const addCourse = async (data) => {
  try {
    let response = await customAxios.post("/Course/AddCourse", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const requestDelete = async (id) => {
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
    title: "Delete This Course ?",
    text: "Are You Sure that you want to delete this Course ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Course/RequestDelete?courseId=${id}`
      );
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const deleteVideo = async (videoId) => {
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
    title: "Delete This video ?",
    text: "Are You Sure that you want to delete this video ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Course/DeleteVideo/${videoId}`);
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const deleteCourse = async (courseId) => {
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
    title: "Delete This Course ?",
    text: "Are You Sure that you want to delete this Course ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Dashboard/${courseId}`);
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const addUserToCourse = async (courseId) => {
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: "bg-primary text-white mr-5 py-3 px-14 mb-3 rounded-full",
      cancelButton: "bg-[#FEF3FF] text-black  py-3 px-14 mb-3 rounded-full",
      title: "text-[#E2508D]",
      input: "w-[80%] mx-auto",
      popup: "rounded-2xl",
    },
    buttonsStyling: false,
  });
  const result = await customSwal.fire({
    padding: "1rem",
    title: "Add User Access",
    text: "Do you want to Open This course for the User ?",
    input: "email",
    inputPlaceholder: "Enter User Email here",
    showCancelButton: true,
    confirmButtonText: "Add Now",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Course/Enroll?studentId=${result.value}&courseId=${courseId}`
      );
      if (response.data.isSuccess) {
        customSwal.fire({
          icon: "success",
          title: "Successful Process",
          text: "User Added Successfully",
          showConfirmButton: false,
          timer: 1000,
          confirmButtonText: "Got it",
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

const uploadLesson = async (data, setProgress) => {
  try {
    let response = await customAxios.post("/Course/AddVideo", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const editLesson = async (data) => {
  try {
    let response = await customAxios.put("/Course/EditVideo", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getCourseQuestions = async (courseId) => {
  try {
    let response = await customAxios.get(`/Question/course/${courseId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const addCourseQuestion = async (courseId, data) => {
  try {
    let response = await customAxios.post(`/Question/course/${courseId}`, data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const deleteQuestion = async (questionId) => {
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
    title: "Delete This question ?",
    text: "Are You Sure that you want to delete this question ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`/Question/${questionId}`);
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const editCourseQuestion = async (questionId, data) => {
  try {
    let response = await customAxios.patch(`/Question/${questionId}`, data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const requestLocalEnroll = async (data) => {
  try {
    let response = await customAxios.post(
      `Course/RequestEnroll?StudentEmail=${data.StudentEmail}&CourseId=${data.CourseId}`,
      { TransactionImage: data.TransactionImage },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const requestLocalSubscription = async (data) => {
  try {
    let response = await customAxios.post(
      `/User/RequestSubscribtionLocally?UserId=${data.UserId}`,
      { TransactionImage: data.TransactionImage },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const requestLocalPaypalSubscription = async (data) => {
  try {
    let response = await customAxios.post(`/PayPal/CreateSubscribtion`, data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const requestPaypalEnroll = async (data) => {
  try {
    let response = await customAxios.post("/PayPal/BuyCourse", data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const searchForCourse = async (courseTitle) => {
  try {
    let response = await customAxios.get(`/Course/Search/${courseTitle}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

export {
  getAllCourses,
  getOneCourse,
  getPendingCourses,
  approveCourse,
  rejectCourse,
  getApprovedCourses,
  deleteCourse,
  addUserToCourse,
  getFilteredCourses,
  getJoinedCourses,
  getUploadedCourses,
  requestDelete,
  schema,
  editCourse,
  addCourse,
  deleteVideo,
  uploadLesson,
  editLesson,
  addCourseQuestion,
  getCourseQuestions,
  deleteQuestion,
  editCourseQuestion,
  requestLocalEnroll,
  requestPaypalEnroll,
  requestLocalSubscription,
  searchForCourse,
  requestLocalPaypalSubscription,
};
