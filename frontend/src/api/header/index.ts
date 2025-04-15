import axios from "axios";
import { APIURL } from "../../common/constanst";

export const getDataUser = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${APIURL}/user`,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
