import axios from "axios";

const getLatestCourses = async () => {
  try {
    let res = await axios.get(
      "http://localhost:5000/api/Course/GetFilteredCoursesPaginated?status=1&page=1&pageSize=6"
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getLatestBlogs = async () => {
  try {
    let res = await axios.get(
      "http://localhost:5000/api/Blog/GetAllPaginated?page=1&pageSize=6"
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getLatestBooks = async () => {
  try {
    let res = await axios.get(
      "http://localhost:5000/api/Book/GetAllBooksPaginated?page=1&pageSize=10"
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getLatestCourses, getLatestBlogs, getLatestBooks };
