import axios from "axios";
import { APIURL } from "../../common/constanst";
import { OpenFundsForm } from "../../interfaces/openFunds";

export const openInvestment = async (body: OpenFundsForm) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${APIURL}/funds/create`,
      data: body,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
