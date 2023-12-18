import { lazy } from "react";

import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

const Dashboard = Loadable(lazy(() => import("../views/home/Dashboard")));
const MyPage = Loadable(lazy(() => import("../views/account/Mypage")));
const MyPageUpdate = Loadable(lazy(() => import("../views/account/MyPageUpdate")));
const Team = Loadable(lazy(() => import("../views/account/Team")));
const TeamCreate = Loadable(lazy(() => import("../views/account/TeamCreate")));
const TeamUpdate = Loadable(lazy(() => import("../views/account/TeamUpdate")));
const Member = Loadable(lazy(() => import("../views/account/Member")));
const MemberAuth = Loadable(lazy(() => import("../views/account/MemberAuth")));
const Fee = Loadable(lazy(() => import("../views/subscribe/Fee")));
const Bill = Loadable(lazy(() => import("../views/subscribe/Bill")));
const Subscription = Loadable(lazy(() => import("../views/subscribe/Subscription")));
const Notice = Loadable(lazy(() => import("../views/support/Notice")));
const NoticeDetail = Loadable(lazy(() => import("../views/support/NoticeDetail")));
const Qna = Loadable(lazy(() => import("../views/support/Qna")));
const QnaDetail = Loadable(lazy(() => import("../views/support/QnaDetail")));
const QnaCreate = Loadable(lazy(() => import("../views/support/QnaCreate")));
const Remote = Loadable(lazy(() => import("../views/support/Remote")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/mypage",
            element: <MyPage />,
        },
        {
            path: "/mypage/update",
            element: <MyPageUpdate />,
        },
        {
            path: "/account/team",
            element: <Team />,
        },
        {
            path: "/account/team/create",
            element: <TeamCreate />,
        },
        {
            path: "/account/team/update",
            element: <TeamUpdate />,
        },
        {
            path: "/account/member",
            element: <Member />,
        },
        {
            path: "/account/memberauth",
            element: <MemberAuth />,
        },
        {
            path: "/subscribe/fee",
            element: <Fee />,
        },
        {
            path: "/subscribe/bill",
            element: <Bill />,
        },
        {
            path: "/subscribe/info",
            element: <Subscription />,
        },
        {
            path: "/support/notice",
            element: <Notice />,
        },
        {
            path: "/support/notice/detail",
            element: <NoticeDetail />,
        },
        {
            path: "/support/qna",
            element: <Qna />,
        },
        {
            path: "/support/qna/detail",
            element: <QnaDetail />,
        },
        {
            path: "/support/qna/create",
            element: <QnaCreate />,
        },
        {
            path: "/support/remote",
            element: <Remote />,
        },
    ],
};

export default MainRoutes;
