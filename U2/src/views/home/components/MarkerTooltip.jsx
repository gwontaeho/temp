import { makeStyles } from '@mui/styles';

import TooltipContainer from '../../../ui-component/tooltips/TooltipContainer';

const useStyles = makeStyles((theme) => ({
	MarkerTooltip: {
		fontSize: '1.6rem',
	},
	text: {
		color: theme.palette.primary.main,
		fontSize: '1.05rem',
		fontWeight: 500,
		margin: '0 0.3rem 0 1rem',
	},
}));

export const MarkerTooltip = ({ content }) => {
	const classes = useStyles();

	return (
		<TooltipContainer title={content} className={classes.MarkerTooltip}>
			<label className={classes.text}>범례</label>
		</TooltipContainer>
	);
};
