import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import qs from 'qs';

import LogoSection from '../MainLayout/LogoSection';
import UserAPI from '../../views/apis/UserAPI';
import { getCookie, removeCookie } from '../../utils/Cookie';

const _APP_HOST = {
	ALI: process.env.REACT_APP_U2ALIMI,
	POR: process.env.REACT_APP_PORTAL,
	HOM: process.env.REACT_APP_HOME,
};

const useStyles = makeStyles((theme) => ({
	MinimalLayout: {
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		height: '5.6rem',
		display: 'flex',
		padding: '0 4rem',
		backgroundColor: theme.palette.background.page,
	},
}));

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const redirect = useMemo(() => getCookie('org'), []);
	const isLogOn = useSelector((state) => state.session.isLogOn);

	useEffect(() => {
		const email = getCookie('memberEmail');
		if (!!isLogOn && !!email) {
			UserAPI.getMember(email).then((res) => {
				if (!!res) {
					if (!!redirect) {
						removeCookie('org');
						window.open(redirect, '_self');
					} else navigate('/', { replace: true });
				} else {
					removeCookie('accessToken');
				}
			});
		}
	}, [isLogOn, redirect, navigate]);

	return (
		<div className={classes.MinimalLayout}>
			<div className={classes.header}>
				<LogoSection />
			</div>

			<Outlet />
		</div>
	);
};

export default MinimalLayout;
