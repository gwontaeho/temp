import { lazy } from 'react';

import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/authentication/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
	path: '/',
	element: <MinimalLayout />,
	children: [
		{
			path: '/login',
			element: <AuthLogin />,
		},
	],
};

export default AuthenticationRoutes;
