interface IjoinFirst {
  username: string;
  dob: number;
  phoneNumber: number;
  code: number;
}

interface IjoinSecond {
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface IjoinTermList {
  cont: string;
  required?: boolean;
  category: ItermCategory;
}
