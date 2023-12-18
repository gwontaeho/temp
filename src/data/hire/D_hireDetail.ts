import ProfImg1 from "assets/images/example/hire/ProfImg1.png";
import ProfImg2 from "assets/images/example/hire/ProfImg2.png";

export const D_detailCategoryList = ["모집조건", "상세요강", "문의"];

export const D_ruleList: string[] = [
  "작성한 내용은 수정 및 삭제가 불가합니다.",
  "이메일, 전화번호 등을 게시하여 직접 결제를 유도할 경우 서비스 이용에 제재를 받을 수 있습니다.",
];

export const D_inquryList: IinquryList[] = [
  {
    id: "",
    uid: "",
    userUuid: "",
    threadId: "",
    profImg: ProfImg1,
    nickname: "김둘리",
    content: "문의드립니다.",
    time: "6시간",
  },
  {
    id: "",
    uid: "",
    userUuid: "",
    threadId: "",
    profImg: ProfImg1,
    nickname: "김둘리",
    content: "같은 공고는 조금 더 높은 월급으로 올라왔던데, 뭐가 맞는건가요?",
    time: "6시간",
    reply: [
      {
        id: "",
        uid: "",
        userUuid: "",
        threadId: "",
        profImg: ProfImg2,
        nickname: "빌드잡",
        content: "안녕하세요. 문의사항 답변드립니다.",
        time: "6시간",
      },
    ],
  },
];

export const D_appltResumeList: IapplyResumeList[] = [
  {
    name: "김둘리",
    date: new Date(),
  },
  {
    name: "김둘리 1",
    date: new Date(),
  },
];
