import { Tooltip as MuiTooltip } from '@mui/material';
import { withStyles } from '@mui/styles';

const Tooltip = withStyles(() => ({
	tooltip: (props) => ({
		minWidth: props.minwidth ?? 450,
		backgroundColor: props.backgroundcolor ?? '#177FFF',
	}),
}))(MuiTooltip);

export default function TooltipTitle(props) {
	const {
		title = '',
		placement = 'top',
		minWidth = 450,
		backgroundColor = '#177FFF',
		children = <div />,
	} = props;

	return (
		<Tooltip
			title={title}
			placement={placement}
			arrow
			minwidth={minWidth}
			backgroundcolor={backgroundColor}
		>
			{children}
		</Tooltip>
	);
}
