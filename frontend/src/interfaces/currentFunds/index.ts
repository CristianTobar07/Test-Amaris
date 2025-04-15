export interface ResponseCurrentFunds {
  data: CurrentFund[];
  status: boolean;
}

export interface CurrentFund {
  id_user: string;
  category: string;
  category_name: string;
  amont: number;
  state: number;
  uid: string;
}

export interface CloseInvestmentResponse {
  msg: string;
  status: number;
}
