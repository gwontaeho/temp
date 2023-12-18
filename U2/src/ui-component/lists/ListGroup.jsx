import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	ListGroup: (props) => ({
		'& > :first-child > div': {
			paddingTop: '24px',
			paddingBottom: '16px',
			minHeight: '4.6rem',
			height: 'auto',
		},
		'& > :first-child > :first-child': {
			borderTopLeftRadius: '12px',
			borderTopRightRadius: '12px',
			paddingTop: '30px',
			minHeight: '4.6rem',
			height: 'auto',
		},
		'& > :last-child > :first-child': {
			borderBottomLeftRadius: '12px',
			borderBottomRightRadius: '12px',
		},
		'& > div > div:first-child': {
			width: props.titleWidth ?? '9rem',
		},
	}),
	title: {
		fontSize: '1.2rem',
		fontWeight: 500,
		marginBottom: '1rem',
	},
}));

export default function ListGroup({ title, titleWidth, children }) {
	const classes = useStyles({ titleWidth });

	return (
		<>
			{title && (
				<Typography component="div" className={classes.title}>
					{title}
				</Typography>
			)}

			<div className={classes.ListGroup}>{children}</div>
		</>
	);
}
