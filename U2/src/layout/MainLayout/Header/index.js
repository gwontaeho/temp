import PropTypes from 'prop-types';

// material-ui
import { Box, Stack } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import Notification from './Notification';
import Profile from './Profile';
// import { MenuIcon } from '../../../ui-component/icons/icons';

// assets
// import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
	return (
		<>
			{/* logo & toggler button */}
			<Box
				sx={{
					width: 228,
					display: 'flex',
					// [theme.breakpoints.down('md')]: {
					// 	width: 'auto',
					// },
					alignItems: 'center',
				}}
			>
				{/* <ButtonBase>
					<Avatar
						variant="square"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							// transition: 'all .2s ease-in-out',
							background: 'transparent',
							color: theme.palette.grey[900],
							borderRadius: 0,
						}}
						onClick={handleLeftDrawerToggle}
						color="inherit"
					>
						{MenuIcon()}
					</Avatar>
				</ButtonBase> */}

				<Box
					component="span"
					sx={{
						// display: { xs: 'none', md: 'block' },
						flexGrow: 1,
						alignSelf: 'center',
						ml: 2,
					}}
				>
					<LogoSection />
				</Box>
			</Box>

			<Stack direction="row" alignItems="center" sx={{ ml: 'auto' }} spacing={3}>
				<Notification />
				<Profile />
			</Stack>
		</>
	);
};

Header.propTypes = {
	handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
