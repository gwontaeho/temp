import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts";

import {
    Home,
    User,
    UserUpdate,
    Team,
    TeamCreate,
    TeamUpdate,
    Member,
    MemberDetail,
    Subscribe,
    Fee,
    Bill,
    BillDetail,
    SubscribeList,
    SubscribeCreate,
    Notice,
    NoticeDetail,
    Qna,
    QnaDetail,
    QnaCreate,
    Service,
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
            path: "/application",
            element: <Service />,
        },
        {
            path: "/user",
            element: <User />,
        },
        {
            path: "/user/update",
            element: <UserUpdate />,
        },
        {
            path: "/management/team",
            element: <Team />,
        },
        {
            path: "/management/team/create",
            element: <TeamCreate />,
        },
        {
            path: "/management/team/update",
            element: <TeamUpdate />,
        },
        {
            path: "/management/member",
            element: <Member />,
        },
        {
            path: "/management/member/detail",
            element: <MemberDetail />,
        },
        {
            path: "/management/subscribe",
            element: <Subscribe />,
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
            path: "/subscribe/bill/:id",
            element: <BillDetail />,
        },
        {
            path: "/subscribe/list",
            element: <SubscribeList />,
        },
        {
            path: "/subscribe/list/create",
            element: <SubscribeCreate />,
        },
        {
            path: "/support/notice",
            element: <Notice />,
        },
        {
            path: "/support/notice/:id",
            element: <NoticeDetail />,
        },
        {
            path: "/support/qna",
            element: <Qna />,
        },
        {
            path: "/support/qna/:id",
            element: <QnaDetail />,
        },
        {
            path: "/support/qna/create",
            element: <QnaCreate />,
        },
        {
            path: "*",
            element: <Home />,
        },
    ],
};

export default () => useRoutes([routes]);
