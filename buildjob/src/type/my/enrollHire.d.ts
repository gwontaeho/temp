interface IenrollHireDefaultInfo {
  title: string;
  category: {
    label: string;
    type: string;
  } | null;
  detailCategory: {
    label: string;
    type: string;
  } | null;
  form: string;
  payform: string;
  pay: string;
}

type IHire =
  | "over_1_yr"
  | "6_mo_1_yr"
  | "3_mo_6_mo"
  | "1_mo_3_mo"
  | "under_1_wk";
type IDayOfWeek = "1" | "2" | "3" | "4" | "5" | "6" | "7";
type IGender = "DC" | "M" | "F";
type IOld = "1" | "2" | "3" | "4";
type ICommute = "1" | "2" | "3";

interface IenrollHireWorkCondition {
  term: IHire;
  dayOfWeekForm: string;
  dayOfWeek: IDayOfWeek[];
  startTime: string;
  endTime: string;
  location: string;
  detailLocation: string;
  restHoursInMinutes?: string;
  commuteType: {
    label: string;
    type: ICommute;
  };
}

interface IenrollHireSupportCondition {
  gender: IGender;
  old: IOld;
  limitDate: Date;
  supportType: string;
  workExperienceDuration: string;
}

interface IenrollHireCompanyInfo {
  companyName: string;
  // companyNumber: string;
  managerName: string;
  cellNumber: string;
  agreeTerm: boolean;
}
