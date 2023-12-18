export const D_enrollHireTerm: Record<IHire, string> = {
  over_1_yr: "1년 이상",
  "6_mo_1_yr": "6개월~1년",
  "3_mo_6_mo": "3개월~6개월",
  "1_mo_3_mo": "1개월~3개월",
  under_1_wk: "1주일 이하",
};

export const D_dayOfWeek: Record<IDayOfWeek, string> = {
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
  7: "일",
};

export const D_dayOfWeekFormList = ["요일 선택", "요일 협의"];

export const D_gender = {
  DC: "성별 무관",
  M: "남자",
  F: "여자",
};

export const D_oldList = [
  "연령무관",
  "청소년 가능(만18세 이하)",
  "고연령자 가능(만55세 이상)",
  "미성년자 불가(만18세 이 불가)",
];

export const D_supportTypeList = ["온라인 지원", "전화 후 방문", "직접 방문"];

export const D_WorkExperienceDuration = {
  "0_10": "경력무관",
  "0_0": "신입",
  "1_4": "1~4년",
  "5_7": "5~7년",
  "8_9": "8~9년",
  "10_10": "10년 이상",
};
