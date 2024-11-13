import axios from "axios";

const getLatestItems = async () => {
  try {
    let res = await axios.get("http://localhost:5000/api/Home/GetHomeInfo");
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getLatestItems };
