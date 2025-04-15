import axios from "axios";
import { APIURL } from "../../common/constanst";

export const getCurrentFunds = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${APIURL}/funds/open`,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const closeInvestment = async (idFund: string, idUser: string) => {
  const body = {
    id_fund: idFund,
    id_user: idUser,
    state: 2,
  };

  try {
    const response = await axios({
      method: "PATCH",
      url: `${APIURL}/funds/update`,
      data: body,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
