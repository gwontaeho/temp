import Index from "pages";
import AlarmSetting from "pages/alarm/alarmSetting";
import AuthMain from "pages/auth/AuthMain";
import ComeAgain from "pages/auth/comeAgain";
import Join from "pages/auth/join";
import SimpleLogin from "pages/auth/simpleLogin";
import Franchisee from "pages/franchisee/franchisee";
import Comment from "pages/hire/comment";
import DetailContent from "pages/hire/detailContent";
import Hire from "pages/hire/hire";
import HireApply from "pages/hire/hireApply";
import HireDetail from "pages/hire/hireDetail";
import Intro from "pages/intro/intro";
import Layout from "pages/layout";
import Apply from "pages/my/apply/apply";
import ApplyResume from "pages/my/apply/applyResume";
import Limited from "pages/my/block/limited";
import Locked from "pages/my/block/locked";
import Penalty from "pages/my/block/penalty";
import ApplyResumeByCompany from "pages/my/company/apply/applyResumeByCompany";
import CheckApply from "pages/my/company/apply/checkApply";
import Company from "pages/my/company/company";
import EnrollCompany from "pages/my/company/enroll/enrollCompany";
import CancelHire from "pages/my/company/hireSituation/cancelHire/cancelHire";
import HireSituation from "pages/my/company/hireSituation/hireSituation";
import ReviewHire from "pages/my/company/hireSituation/reviewHire/reviewHire";
import EnrollJobOpening from "pages/my/company/jobOpening/enroll/enrollJobOpening";
import Jobopening from "pages/my/company/jobOpening/jobOpening";
import PayHistory from "pages/my/company/payHistory/payHistory";
import EditProfile from "pages/my/edit/editProfile";
import History from "pages/my/history/history";
import MyPage from "pages/my/myPage";
import Offer from "pages/my/offer/offer";
import OfferDetail from "pages/my/offer/offerDetail";
import Referral from "pages/my/referral/referral";
import EnrollResume from "pages/my/resume/enroll/enrollResume";
import Resume from "pages/my/resume/resume";
import Scrab from "pages/my/scrab";
import SettingScreen from "pages/my/setting/settingScreen";
import Notice from "pages/notice/notice";
import PayHire from "pages/notice/payHire/payHire";
import Person from "pages/person/person";
import PersonDetail from "pages/person/personDetail";
import PersonOffer from "pages/person/personOffer";
import Search from "pages/search";
import Terms from "pages/terms/terms";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Index /> },
      { path: "intro", element: <Intro /> },
      { path: "home", element: <Home /> },
      { path: "search", element: <Search /> },
      {
        path: "notice",
        children: [
          { path: "", element: <Notice /> },
          {
            path: "payHire",
            children: [{ path: ":id", element: <PayHire /> }],
          },
        ],
      },
      {
        path: "hire",
        children: [
          { path: "", element: <Hire /> },
          {
            path: ":id",
            children: [
              { path: "", element: <HireDetail /> },
              { path: "detailcontent", element: <DetailContent /> },
              { path: "apply", element: <HireApply /> },
              {
                path: "comment",
                children: [{ path: ":commentId", element: <Comment /> }],
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        children: [
          { path: "", element: <AuthMain /> },
          { path: "join", element: <Join /> },
          { path: "comeagain", element: <ComeAgain /> },
          { path: "simplelogin", element: <SimpleLogin /> },
        ],
      },
      {
        path: "person",
        children: [
          { path: "", element: <Person /> },
          {
            path: ":id",
            children: [
              { path: "", element: <PersonDetail /> },
              { path: "offer", element: <PersonOffer /> },
            ],
          },
        ],
      },
      {
        path: "franchisee",
        element: <Franchisee />,
      },
      {
        path: "mypage",
        children: [
          { path: "", element: <MyPage /> },
          { path: "edit", element: <EditProfile /> },
          {
            path: "resume",
            children: [
              { path: "", element: <Resume /> },
              { path: "enroll", element: <EnrollResume /> },
            ],
          },
          {
            path: "apply",
            children: [
              { path: "", element: <Apply /> },
              {
                path: ":id",
                children: [{ path: "resume", element: <ApplyResume /> }],
              },
            ],
          },
          { path: "scrab", element: <Scrab /> },
          {
            path: "offer",
            children: [
              { path: "", element: <Offer /> },
              { path: ":id", element: <OfferDetail /> },
            ],
          },
          {
            path: "company",
            children: [
              { path: "", element: <Company /> },
              {
                path: "jobopening",
                children: [
                  { path: "", element: <Jobopening /> },
                  { path: "enroll", element: <EnrollJobOpening /> },
                ],
              },
              {
                path: "apply",
                children: [
                  { path: "", element: <CheckApply /> },
                  { path: ":id", element: <ApplyResumeByCompany /> },
                ],
              },
              {
                path: "hire_situation",
                children: [
                  { path: "", element: <HireSituation /> },
                  {
                    path: "cancel_hire",
                    children: [{ path: ":id", element: <CancelHire /> }],
                  },
                  {
                    path: "review_hire",
                    children: [{ path: ":id", element: <ReviewHire /> }],
                  },
                ],
              },
              { path: "payhistory", element: <PayHistory /> },
              { path: "enroll", element: <EnrollCompany /> },
            ],
          },
          { path: "history", element: <History /> },
          { path: "referral", element: <Referral /> },
          {
            path: "block",
            children: [
              { path: "locked", element: <Locked /> },
              { path: "limited", element: <Limited /> },
              { path: "penalty", element: <Penalty /> },
            ],
          },
          { path: "setting", element: <SettingScreen /> },
        ],
      },
      {
        path: "alarm",
        children: [
          {
            path: "setting",
            element: <AlarmSetting />,
          },
        ],
      },
      { path: "terms", element: <Terms /> },
    ],
  },
]);

export default router;
