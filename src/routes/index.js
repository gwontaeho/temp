import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts";

import {
    Home,
    User,
    Team,
    Experience,
    Withdrawal,
    Dormancy,
    Caller,
    Payment,
    Settlement,
    Subscribe,
    Plan,
    Notice,
    Notification,
    Qna,
    Admin,
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
            path: "/member/dormancy",
            element: <Dormancy />,
        },
        {
            path: "/member/caller",
            element: <Caller />,
        },
        {
            path: "/payment",
            element: <Payment />,
        },
        {
            path: "/payment/settlement",
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
