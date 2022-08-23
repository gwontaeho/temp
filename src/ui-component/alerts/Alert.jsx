import { Alert as MuiAlert } from '@mui/material';
import { withStyles } from '@mui/styles';

const CustomAlert = withStyles((theme) => ({
	filledError: {
		backgroundColor: theme.palette.error[100],
		color: theme.palette.error.main,
	},
}))(MuiAlert);

export default function Alert({ severity, color = severity, children }) {
	return (
		<CustomAlert severity={severity} color={color}>
			{children}
		</CustomAlert>
	);
}
