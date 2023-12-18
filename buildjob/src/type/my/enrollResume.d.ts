interface IenrollResumeFirst {
  name: string;
  cellNumber: string;
  category: string;
  detailCategory: string;
}

interface IenrollResumeSecond {
  form: string;
  location: string;
  detailLocation: string;
}

interface IenrollCareer {
  companyName: string;
  workForm: string;
  startDate: Date;
  endDate: Date;
  explain: String;
  workCurrent: boolean;
  isbefore?: boolean;
  uuid?: string;
}
