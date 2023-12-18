import { makeStyles } from '@mui/styles';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';

import { InfoCircleIcon } from '../icons/icons';

const useStyles = makeStyles((theme) => ({
	tooltip: (props) => ({
		maxWidth: props.maxWidth,
	}),
	TooltipContainer: {
		width: 'fit-content',
		display: 'flex',
		alignItems: 'center',
		'& > .MuiTypography-root': {
			fontSize: '1.1rem',
			fontWeight: 500,
			color: theme.palette.primary.main,
			// textDecoration: 'underline',
			marginRight: '6px',
		},
	},
}));

export default function TooltipContainer(props) {
	const {
		title = '',
		children,
		showIcon = true,
		placement = 'top',
		maxWidth = 400,
		...others
	} = props;
	const classes = useStyles({ maxWidth });

	return (
		<MuiTooltip
			title={title || ''}
			placement={placement}
			arrow
			enterDelay={0}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: 0 }}
			{...others}
			classes={{ tooltip: classes.tooltip }}
		>
			<div className={classes.TooltipContainer}>
				{children}
				{showIcon === true ? props.icon ?? InfoCircleIcon() : null}
			</div>
		</MuiTooltip>
	);
}
