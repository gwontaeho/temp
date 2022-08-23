import { makeStyles } from '@mui/styles';

import { RecipientStatusColors } from '../../store/constant';
import { ErrorIcon } from '../icons/icons';
import TooltipIcon from '../tooltips/TooltipIcon';

const useStyles = makeStyles(() => ({
	RecipientStatusLabel: (props) => ({
		display: 'flex',
		alignItems: 'center',
		color: props.color,
		fontWeight: 500,
	}),
}));

export const RecipientStatusLabel = ({ id, message }) => {
	const classes = useStyles({ color: RecipientStatusColors[id]?.mainColor });

	return (
		<div className={classes.RecipientStatusLabel}>
			{id === 3 && <TooltipIcon icon={ErrorIcon()} title={message} />}
			{RecipientStatusColors[id]?.name}
		</div>
	);
};
