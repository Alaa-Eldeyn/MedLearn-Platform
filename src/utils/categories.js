import customAxios from "./customAxios"

const getAllCategories = async (type) => {
  try {
    let response = await customAxios.get(
      `Category/GetAllCategoriesByType${type}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllSubCategories = async (type) => {
  try {
    let response = await customAxios.get(
      `SubCategory/GetAllSubCategoriesByType${type}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const addCategory = async (categoryName, type) => {
  try {
    let response = await customAxios.post(
      "/Category",
      { name: `${categoryName}`, type: `${type}` },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const addSubCategory = async (data) => {
  try {
    let response = await customAxios.post(`/SubCategory`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getSubs = async (categoryId) => {
  try {
    let response = await customAxios.get(`/SubCategory/Category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const moveSubCategory = async (id, data) => {
  try {
    let response = await customAxios.put(`/SubCategory/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteCategory = async (id) => {
  try {
    let response = await customAxios.delete(`/Category/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteSubCategory = async (id) => {
  try {
    let response = await customAxios.delete(`/SubCategory/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export {
  getAllCategories,
  getAllSubCategories,
  addCategory,
  addSubCategory,
  getSubs,
  moveSubCategory,
  deleteCategory,
  deleteSubCategory,
};
