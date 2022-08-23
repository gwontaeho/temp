import { lazy } from 'react';

import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

const Dashboard = Loadable(lazy(() => import('../views/home/Dashboard')));
const MyPage = Loadable(lazy(() => import('../views/account/MyPage')));
const Team = Loadable(lazy(() => import('../views/account/Team')));
const Member = Loadable(lazy(() => import('../views/account/Member')));
const MemberAuth = Loadable(lazy(() => import('../views/account/MemberAuth')));
const Fee = Loadable(lazy(() => import('../views/subscribe/Fee')));
const Bill = Loadable(lazy(() => import('../views/subscribe/Bill')));
const Subscription = Loadable(lazy(() => import('../views/subscribe/Subscription')));
const Notice = Loadable(lazy(() => import('../views/support/Notice')));
const Qna = Loadable(lazy(() => import('../views/support/Qna')));
const Remote = Loadable(lazy(() => import('../views/support/Remote')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <Dashboard />,
		},
		{
			path: '/mypage',
			element: <MyPage />,
		},
		{
			path: '/account/team',
			element: <Team />,
		},
		{
			path: '/account/member',
			element: <Member />,
		},
		{
			path: '/account/memberauth',
			element: <MemberAuth />,
		},
		{
			path: '/subscribe/fee',
			element: <Fee />,
		},
		{
			path: '/subscribe/bill',
			element: <Bill />,
		},
		{
			path: '/subscribe/info',
			element: <Subscription />,
		},
		{
			path: '/support/notice',
			element: <Notice />,
		},
		{
			path: '/support/qna',
			element: <Qna />,
		},
		{
			path: '/support/remote',
			element: <Remote />,
		},
	],
};

export default MainRoutes;
