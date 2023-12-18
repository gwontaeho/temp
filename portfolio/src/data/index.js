import { ReactComponent as ReactIcon } from "../images/skills/react.svg";
import { ReactComponent as ReduxIcon } from "../images/skills/redux.svg";
import { ReactComponent as ReactRouterIcon } from "../images/skills/reactrouter.svg";
import { ReactComponent as JavaScriptIcon } from "../images/skills/javascript.svg";
import { ReactComponent as NodeDotJsIcon } from "../images/skills/nodedotjs.svg";
import { ReactComponent as SequelizeIcon } from "../images/skills/sequelize.svg";
import { ReactComponent as ExpressIcon } from "../images/skills/express.svg";
import { ReactComponent as Css3Icon } from "../images/skills/css3.svg";
import { ReactComponent as Html5Icon } from "../images/skills/html5.svg";
import { ReactComponent as MuiIcon } from "../images/skills/mui.svg";
import { ReactComponent as LodashIcon } from "../images/skills/lodash.svg";
import { ReactComponent as AxiosIcon } from "../images/skills/axios.svg";
import { ReactComponent as HerokuIcon } from "../images/skills/heroku.svg";
import { ReactComponent as AmazonAWSIcon } from "../images/skills/amazonaws.svg";
import { ReactComponent as JSONWebTokensIcon } from "../images/skills/jsonwebtokens.svg";
import Emotion from "../images/skills/emotion.png";

import todos from "../videos/todos.mp4";
import gym from "../videos/gym.mp4";
import zara from "../videos/zara.mp4";
import kakao from "../videos/kakao.mp4";
import market from "../videos/market.mp4";

export const skills = {
  front: [
    {
      name: "HTML5",
      icon: <Html5Icon fill="#E34F26" />,
    },
    {
      name: "CSS3",
      icon: <Css3Icon fill="#1572B6" />,
    },
    {
      name: "React",
      icon: <ReactIcon fill="#61DAFB" />,
    },
    {
      name: "React Router",
      icon: <ReactRouterIcon fill="#CA4245" />,
    },
    {
      name: "Redux",
      icon: <ReduxIcon fill="#764ABC" />,
    },
    {
      name: "Emotion",
      icon: <img src={Emotion} alt="Emotion" />,
    },
    {
      name: "MUI",
      icon: <MuiIcon fill="#007FFF" />,
    },
  ],
  back: [
    {
      name: "Node.js",
      icon: <NodeDotJsIcon fill="#339933" />,
    },
    {
      name: "Express",
      icon: <ExpressIcon fill="#000000" />,
    },
    {
      name: "Sequelize",
      icon: <SequelizeIcon fill="#52B0E7" />,
    },
  ],
  etc: [
    {
      name: "JavaScript",
      icon: <JavaScriptIcon fill="#F7DF1E" />,
    },
    {
      name: "Lodash",
      icon: <LodashIcon fill="#3492FF" />,
    },
    {
      name: "Axios",
      icon: <AxiosIcon />,
    },
    {
      name: "Heroku",
      icon: <HerokuIcon fill="#430098" />,
    },
    {
      name: "Amazon AWS",
      icon: <AmazonAWSIcon fill="#232F3E" />,
    },
    {
      name: "JSON Web Tokens",
      icon: <JSONWebTokensIcon fill="#000000" />,
    },
  ],
};

export const projects = [
  {
    open: true,
    name: "Effects",
    title: "E f f e c t s",
    github: "https://github.com/gwontaeho/drag",
    githubpages: "https://gwontaeho.github.io/drag/",
    text: "사용해보고싶은 기술이나 효과들을 페이지별로 구현 한 프로젝트입니다.",
    fn: "hover, scroll, drag, slide",
    term: "진행 중",
    personnel: "개인",
    video: null,
    tooltip: "여러 효과들을 구현해본 프로젝트",
    skills: [],
  },
  {
    open: true,
    name: "Market",
    title: "M a r k e t",
    github: "https://github.com/gwontaeho/market.git",
    githubpages: "https://gwontaeho.github.io/market/",
    text: "사용자들 간에 거래를 할 수 있는 사이트입니다. 회원가입을 하면 누구나 판매 등록을 할 수 있고 댓글로 거래가 이루어지며 판매종료 시 댓글을 달거나 상품을 관심목록에 추가한 사람 중 구매자를 선택할 수 있습니다. Node.js API서버와 Sequelize로 생성한 DB를 헤로쿠에 배포하였고 이미지 관리는 AWS S3를 이용했습니다. 이 프로젝트를 하며 백엔드 부분을 많이 공부할 수 있었습니다.",
    fn: "회원가입, 로그인, 정보 수정, 상품등록 및 수정, 판매내역, 구매내역, 댓글, 관심목록 추가 및 확인, 반응형",
    term: "약 3주",
    personnel: "개인",
    video: market,
    tooltip: "중고거래 사이트",
    skills: [
      {
        name: "HTML5",
        icon: <Html5Icon fill="#E34F26" />,
      },
      {
        name: "CSS3",
        icon: <Css3Icon fill="#1572B6" />,
      },
      {
        name: "JavaScript",
        icon: <JavaScriptIcon fill="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon fill="#61DAFB" />,
      },
      {
        name: "React Router",
        icon: <ReactRouterIcon fill="#CA4245" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon fill="#764ABC" />,
      },
      {
        name: "Emotion",
        icon: <img src={Emotion} alt="Emotion" />,
      },
      {
        name: "MUI",
        icon: <MuiIcon fill="#007FFF" />,
      },
      {
        name: "Lodash",
        icon: <LodashIcon fill="#3492FF" />,
      },
      {
        name: "Node.js",
        icon: <NodeDotJsIcon fill="#339933" />,
      },
      {
        name: "Express",
        icon: <ExpressIcon fill="#000000" />,
      },
      {
        name: "Sequelize",
        icon: <SequelizeIcon fill="#52B0E7" />,
      },
      {
        name: "Axios",
        icon: <AxiosIcon />,
      },
      {
        name: "Heroku",
        icon: <HerokuIcon fill="#430098" />,
      },
      {
        name: "Amazon AWS",
        icon: <AmazonAWSIcon fill="#232F3E" />,
      },
      {
        name: "JSON Web Tokens",
        icon: <JSONWebTokensIcon fill="#000000" />,
      },
    ],
  },
  {
    open: true,
    name: "Zara",
    title: "Z a r a",
    github: "https://github.com/gwontaeho/zara",
    githubpages: "https://gwontaeho.github.io/zara/",
    text: "자라의 공식 홈페이지를 클론한 프로젝트입니다. 자라 홈페이지의 반응형 디자인을 참고하여 만들었습니다.",
    fn: "메인페이지, 카테고리 1페이지, 상품상세 1페이지, 반응형",
    term: "약 1주",
    personnel: "개인",
    video: zara,
    tooltip: "자라 홈페이지 클론",
    skills: [
      {
        name: "HTML5",
        icon: <Html5Icon fill="#E34F26" />,
      },
      {
        name: "CSS3",
        icon: <Css3Icon fill="#1572B6" />,
      },
      {
        name: "JavaScript",
        icon: <JavaScriptIcon fill="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon fill="#61DAFB" />,
      },
      {
        name: "React Router",
        icon: <ReactRouterIcon fill="#CA4245" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon fill="#764ABC" />,
      },
      {
        name: "Emotion",
        icon: <img src={Emotion} alt="Emotion" />,
      },
    ],
  },
  {
    open: true,
    name: "Kakao",
    title: "K a k a o",
    github: "https://github.com/gwontaeho/kakao",
    githubpages: "https://gwontaeho.github.io/kakao/",
    text: "카카오의 공식 홈페이지를 클론한 프로젝트입니다. 카카오 홈페이지의 반응형 디자인을 참고하여 만들었습니다.",
    fn: "다크모드, 반응형 ",
    term: "약 1주",
    personnel: "개인",
    video: kakao,
    tooltip: "카카오 홈페이지 클론",
    skills: [
      {
        name: "HTML5",
        icon: <Html5Icon fill="#E34F26" />,
      },
      {
        name: "CSS3",
        icon: <Css3Icon fill="#1572B6" />,
      },
      {
        name: "JavaScript",
        icon: <JavaScriptIcon fill="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon fill="#61DAFB" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon fill="#764ABC" />,
      },
      {
        name: "Emotion",
        icon: <img src={Emotion} alt="Emotion" />,
      },
    ],
  },
  {
    open: true,
    name: "Todos",
    title: "T o d o s",
    github: "https://github.com/gwontaeho/todos",
    githubpages: "https://gwontaeho.github.io/todos/",
    text: "할 일들을 기록 할 수 있는 투두리스트입니다.",
    fn: "추가, 삭제, 수행여부 변경",
    term: "1일",
    personnel: "개인",
    video: todos,
    tooltip: "투두리스트",
    skills: [
      {
        name: "HTML5",
        icon: <Html5Icon fill="#E34F26" />,
      },
      {
        name: "CSS3",
        icon: <Css3Icon fill="#1572B6" />,
      },
      {
        name: "JavaScript",
        icon: <JavaScriptIcon fill="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon fill="#61DAFB" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon fill="#764ABC" />,
      },
    ],
  },
  {
    open: true,
    name: "Gym",
    title: "G y m",
    github: "https://github.com/gwontaeho/gym",
    githubpages: "https://gwontaeho.github.io/gym/",
    text: "선택한 날짜에 운동을 기록할 수 있는 프로젝트입니다. 운동 기록은 로컬스토리지에 저장됩니다.",
    fn: "기록, 세부운동 추가, 삭제, 날짜 별 기록 확인",
    term: "1일",
    personnel: "개인",
    video: gym,
    tooltip: "운동 기록 프로젝트",
    skills: [
      {
        name: "HTML5",
        icon: <Html5Icon fill="#E34F26" />,
      },
      {
        name: "CSS3",
        icon: <Css3Icon fill="#1572B6" />,
      },
      {
        name: "JavaScript",
        icon: <JavaScriptIcon fill="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon fill="#61DAFB" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon fill="#764ABC" />,
      },
    ],
  },

  {
    open: false,
    name: "Jeju Road",
    title: "J e j u R o a d",
    github: null,
    githubpages: null,
    text: "",
    tooltip: "",
  },
];
