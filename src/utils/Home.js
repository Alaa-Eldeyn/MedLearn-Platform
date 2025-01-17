import axios from "axios";

const getLatestItems = async () => {
  try {
    let res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/Home/GetHomeInfo`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getLatestItems };
