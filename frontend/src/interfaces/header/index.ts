export interface DataUser {
  name: string;
  email: string;
  balance: number;
  uid: string;
}

export interface ResponseDataUser {
  data: {
    name: string;
    email: string;
    balance: number;
    uid: string;
  };
  status: boolean;
}
