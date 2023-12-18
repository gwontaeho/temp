import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from '../../../config';
// import { LogoIcon } from '../../../ui-component/icons/icons';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
	<ButtonBase disableRipple component={Link} to={config.defaultPath}>
		{/* {LogoIcon()} */}
		<Typography variant="h1" color="primary">
			U2
		</Typography>
		<Typography variant="h1">Cloud Portal</Typography>
	</ButtonBase>
);

export default LogoSection;
