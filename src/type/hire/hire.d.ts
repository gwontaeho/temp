interface IinquryList {
  id: string;
  uid: string;
  userUuid: string;
  profImg: string;
  nickname: string;
  content: string;
  time: string;
  threadId: string;
  reply?: IinquryList[];
}

interface IapplyResumeList {
  name: string;
  date: Date;
}

interface IJobPost {
  id: string;
  uuid: string;
  corporationName: string;
  title: string;
  payType: string;
  payUnit: string;
  payAmount: string;
  durationOfhire: string;
  durationOfhireCode: string;
  workdaysOfweek: string[];
  workHours: string;
  expiresAt: string;
  gender: string;
  genderCode: string;
  ages: string;
  agesCode: string;
  workExperienceDuration: string;
  workExperienceDurationCode: string;
  note: string;
  streetAddress: string;
  detailAddress: string;
  restHoursInMinutes: number;
  employType: string;
  jobType: string;
  jobTypeCode?: string;
  jobType2?: string;
  jobTypeCode2?: string;
  phoneNumber: string;
  managerName: string;
  latitude?: string | null;
  longitude?: string | null;
  commuteType?: string;
  commuteTypeCode?: string;
  interviewType?: string;
  interviewTypeCode?: string;
  workExperienceDurationValue?: string;
  isAgree?: boolean;
  workdaysOfweekCodes?: string[];
}

type ISortKey =
  | "DESC"
  | "HIGHEST_SALARY"
  | "POPULARITY_ORDER"
  | "CLOSE_TO_EXPIRY";

type ISortKeyP = "DESC" | "STAR_RATING_DESC" | "STAR_RATING_ASC";
