interface IannounceList {
  uuid?: string;
  company: string;
  title: string;
  loc: string;
  payType: string;
  pay: string;
  fav?: boolean;
}

interface IpersonSimple {
  id: string;
  img: string;
  name: string;
  status: string;
  message: string;
  score: number;
}

interface IcompanyList {
  companyName: string;
  uuid: string;
  img: string;
  name: string;
  location: string;
  tel: string;
  latitude: string;
  longitude: string;
}
