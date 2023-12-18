interface IapplySimple {
  date: string;
  form: "온라인지원" | "전화지원";
  seen?: boolean;
  companyName: string;
  hireTitle: string;
  location: string;
  payForm: string;
  pay: string;
}

interface IapplyResumeSimple {
  date: string;
  form: "온라인지원" | "전화지원";
  status?: string;
  name: string;
  workForm: "정규직";
  career: string;
}
