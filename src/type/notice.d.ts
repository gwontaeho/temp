interface InoticeList {
  id: string;
  category: string;
  content: string;
  date: string;
}

interface IpayInfoFormProps {
  form: string;
  terms: string;
  time: string;
  dayOfWeek: string;
  pay: string;
}

interface IpayFormFormProps {
  payment: string;
  receipt: boolean;
  cellNumber: string;
  tremAgree: boolean;
}
