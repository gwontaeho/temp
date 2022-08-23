import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts";

import { Home, Member, Team, Experience, Withdrawal, Caller, Billing, Settlement, Subscribe, Plan, Notice, Notification, Qna, Admin } from "../views";

const routes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/member",
            element: <Member />,
        },
        {
            path: "/member/team",
            element: <Team />,
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
            path: "/member/caller",
            element: <Caller />,
        },
        {
            path: "/billing",
            element: <Billing />,
        },
        {
            path: "/billing/settlement",
            element: <Settlement />,
        },
        {
            path: "/subscribe",
            element: <Subscribe />,
        },
        {
            path: "/subscribe/plan",
            element: <Plan />,
        },
        {
            path: "/support",
            element: <Notice />,
        },
        {
            path: "/support/notification",
            element: <Notification />,
        },
        {
            path: "/support/qna",
            element: <Qna />,
        },
        {
            path: "/admin",
            element: <Admin />,
        },
    ],
};

export default () => useRoutes([routes]);
