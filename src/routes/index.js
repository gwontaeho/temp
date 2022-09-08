import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts";

import {
    Home,
    User,
    UserDetail,
    Team,
    TeamDetail,
    Experience,
    Withdrawal,
    Dormancy,
    Caller,
    CallerDetail,
    Payment,
    PaymentDetail,
    Settlement,
    SettlementDetail,
    Subscribe,
    SubscribeMember,
    App,
    AppUpdate,
    Plan,
    PlanCreate,
    PlanUpdate,
    Notice,
    NoticeDetail,
    NoticeCreate,
    NoticeUpdate,
    Notification,
    NotificationCreate,
    NotificationUpdate,
    NotificationAuto,
    Qna,
    QnaDetail,
    Admin,
    AdminDetail,
    Connect,
    Destruction,
} from "../views";

const routes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/member/user",
            element: <User />,
        },
        {
            path: "/member/user/detail",
            element: <UserDetail />,
        },
        {
            path: "/member/team",
            element: <Team />,
        },
        {
            path: "/member/team/detail",
            element: <TeamDetail />,
        },
        {
            path: "/member/experience",
            element: <Experience />,
        },
        {
            path: "/member/withdrawal",
            element: <Withdrawal />,
        },
        {
            path: "/member/dormancy",
            element: <Dormancy />,
        },
        {
            path: "/member/caller",
            element: <Caller />,
        },
        {
            path: "/member/caller/detail",
            element: <CallerDetail />,
        },
        {
            path: "/payment/management",
            element: <Payment />,
        },
        {
            path: "/payment/management/detail",
            element: <PaymentDetail />,
        },
        {
            path: "/payment/settlement",
            element: <Settlement />,
        },
        {
            path: "/payment/settlement/detail",
            element: <SettlementDetail />,
        },
        {
            path: "/subscribe/management",
            element: <Subscribe />,
        },
        {
            path: "/subscribe/management/member",
            element: <SubscribeMember />,
        },
        {
            path: "/subscribe/app",
            element: <App />,
        },
        {
            path: "/subscribe/app/update",
            element: <AppUpdate />,
        },
        {
            path: "/subscribe/app/plan",
            element: <Plan />,
        },
        {
            path: "/subscribe/app/plan/create",
            element: <PlanCreate />,
        },
        {
            path: "/subscribe/app/plan/update",
            element: <PlanUpdate />,
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
            path: "/support/notice/create",
            element: <NoticeCreate />,
        },
        {
            path: "/support/notice/update",
            element: <NoticeUpdate />,
        },
        {
            path: "/support/notification",
            element: <Notification />,
        },
        {
            path: "/support/notification/auto",
            element: <NotificationAuto />,
        },
        {
            path: "/support/notification/create",
            element: <NotificationCreate />,
        },
        {
            path: "/support/notification/update",
            element: <NotificationUpdate />,
        },
        {
            path: "/support/qna",
            element: <Qna />,
        },
        {
            path: "/admin",
            element: <Admin />,
        },
        {
            path: "/admin/detail",
            element: <AdminDetail />,
        },
        {
            path: "/history/connect",
            element: <Connect />,
        },
        {
            path: "/history/destruction",
            element: <Destruction />,
        },
    ],
};

export default () => useRoutes([routes]);
