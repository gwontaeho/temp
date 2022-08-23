import { makeStyles } from '@mui/styles';

import { SendGroupStatusColors } from '../../store/constant';

const useStyles = makeStyles(() => ({
	SendGroupStatusLabel: (props) => ({
		minWidth: '4.2rem',
		fontFamily: 'NanumSquareRound',
		fontSize: '1rem',
		textAlign: 'center',
		fontWeight: 600,
		color: props.color,
		border: `3px solid ${props.color}`,
		borderRadius: '5px',
		height: '1.8rem',
		lineHeight: '1.4rem',
	}),
}));

export const SendGroupStatusLabel = ({ id }) => {
	const classes = useStyles({ color: SendGroupStatusColors[id]?.color });

	return <div className={classes.SendGroupStatusLabel}>{SendGroupStatusColors[id]?.name}</div>;
};
