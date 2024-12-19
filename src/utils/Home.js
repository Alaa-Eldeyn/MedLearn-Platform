import axios from "axios";

const getLatestItems = async () => {
  try {
    let res = await axios.get("http://naserehab-001-site1.mtempurl.com/api/Home/GetHomeInfo");
    return res.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getLatestItems };
