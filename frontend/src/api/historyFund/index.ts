import axios from "axios";
import { APIURL } from "../../common/constanst";

export const getHistoryFunds = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${APIURL}/funds`,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
