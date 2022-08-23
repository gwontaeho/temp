import { makeStyles } from '@mui/styles';
import { map } from 'lodash';

import { RecipientStatusColors } from '../../store/constant';

const useStylesCircleIcon = makeStyles(() => ({
	CircleIcon: (props) => ({
		width: '1rem',
		height: '1rem',
		background: props.light ? props.lightColor : props.mainColor,
		border: `2px solid ${props.mainColor}`,
		borderRadius: '0.5rem',
	}),
}));

const CircleIcon = (props) => {
	const classes = useStylesCircleIcon(props);
	return <div className={classes.CircleIcon} />;
};

const useStyles = makeStyles(() => ({
	RecipientStatusMarker: {
		display: 'flex',
		fontSize: '1.3rem',
		marginRight: '-0.8rem',
	},
	marker: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '0.6rem',
		'& label': {
			margin: '0 0.4rem',
			fontSize: '0.95rem',
		},
	},
}));

export const RecipientStatusMarker = ({ light = false }) => {
	const classes = useStyles();

	return (
		<div className={classes.RecipientStatusMarker}>
			{map(RecipientStatusColors, (item, key) => (
				<div key={key} className={classes.marker}>
					<CircleIcon mainColor={item.mainColor} lightColor={item.lightColor} light={light} />
					<label>{item.name}</label>
				</div>
			))}
		</div>
	);
};
