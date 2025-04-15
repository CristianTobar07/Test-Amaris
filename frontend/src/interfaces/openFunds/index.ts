export interface OpenFundsForm {
  id_user: string;
  category: string;
  category_name: string;
  amont: number;
  state: number;
}

export interface OpenFundsResponse {
  message: string;
  status: boolean;
  data: DataFund;
}

export interface DataFund extends OpenFundsForm {
  uid: string;
}
