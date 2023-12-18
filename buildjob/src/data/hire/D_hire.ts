export const D_hireList: IannounceList[] = [
  {
    company: "GS건설(주)",
    title: "신사업 전문 연구원 모집",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
    fav: true,
  },
  {
    company: "터한의원 강남점",
    title: "강남역 한의원 선생님 모십니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "가은치유한의원",
    title: "간호조무사 모집합니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "(주)유진홈센터",
    title: "신입/경력사원 채용",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "맨프롬오키나와",
    title: "(주5일)샤로수길 사시미바에서 셰프님을 모십니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "천신상회 주식회사",
    title: "우마이도 일본라멘 정규직 급구",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "(주)케이씨씨글라스",
    title: "각 부문 신입/경력 채용",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "(주)삼원에프앤비",
    title: "주방 및 주방보조 구함",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "해승테크",
    title: "범용선반 기술자 구함",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "고려원",
    title: "TM사원 모집",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "평화환경",
    title: "집게차 기사 구합니다.(암롤차 운전가능자 우대)",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "대덕산업",
    title: "머시닝/MCT 구합니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "현대옥",
    title: "주방보조 구합니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "대성테크",
    title: "단순 사무업무보조 구합니다.",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
  {
    company: "세명세라믹",
    title: "창고 관리직/배송사원 모집",
    loc: "서울 전체",
    payType: "월",
    pay: "300만원",
  },
];

export const D_largeCategoryList: string[] = [
  "외식·음료",
  "매장관리·판매",
  "서비스",
  "사무직",
  "고객상담·리처치·영업",
  "생산·건설·노무",
  "IT·기술",
  "디자인",
  "미디어",
  "운전·배달",
];

export const D_smallCategoryList: string[] = [
  "외식·음료 전체",
  "서빙",
  "주방장 조리사",
  "주방보조 설거지",
  "바리스타",
  "제과제빵사",
  "일반음식점",
  "레스토랑",
  "패밀리레스토랑",
  "페스트푸드점",
];

export const D_largeLocationList: string[] = [
  "서울",
  "경기",
  "인천",
  "대전",
  "세종",
  "충남",
  "충북",
  "광주",
  "전남",
  "대구",
];

export const D_smallLocationList: string[] = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
];

export const D_formList: string[] = [
  "정규직",
  "계약직",
  "파견직",
  "도급",
  "아르바이트",
];

export const D_payFormList: string[] = ["월급", "시급"];

export const sortKeyList: ISortKey[] = [
  "DESC",
  "HIGHEST_SALARY",
  "POPULARITY_ORDER",
  "CLOSE_TO_EXPIRY",
];
export const sortMap: Record<ISortKey, { label: string; value: string }> = {
  DESC: {
    label: "최신등록순",
    value: "id/DESC",
  },
  HIGHEST_SALARY: {
    label: "급여높은순",
    value: "salary/DESC",
  },
  POPULARITY_ORDER: {
    label: "인기순",
    value: "countfavorites/DESC",
  },
  CLOSE_TO_EXPIRY: {
    label: "마감임박순",
    value: "expiry/ASC",
  },
};

export const sortKeyListP: ISortKeyP[] = [
  "DESC",
  "STAR_RATING_DESC",
  "STAR_RATING_ASC",
];
export const sortMapP: Record<ISortKeyP, { label: string; value: string }> = {
  DESC: {
    label: "최신등록순",
    value: "id/DESC",
  },
  STAR_RATING_DESC: {
    label: "별점높은순",
    value: "rating/DESC",
  },
  STAR_RATING_ASC: {
    label: "별점낮은순",
    value: "rating/ASC",
  },
};
