import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	ListItem: {
		display: 'flex',
	},
	title: (props) => ({
		display: 'flex',
		minWidth: '5rem',
		width: props.width ?? '9rem',
		padding: '12px 16px',
		backgroundColor: theme.palette.background.page,
		margin: '0',
		wordBreak: 'keep-all',
	}),
	content: {
		display: 'flex',
		width: 'calc(100% - 5rem)',
		minHeight: '2rem',
		alignItems: 'center',
		paddingLeft: theme.spacing(3),
		padding: '0 0 12px 24px',
	},
}));

export default function ListShortItem({ title, children, width }) {
	const classes = useStyles({ width });

	return (
		<div className={classes.ListItem}>
			<div className={classes.title}>
				<Typography variant="subtitle1">{title}</Typography>
			</div>

			<div className={classes.content}>{children}</div>
		</div>
	);
}
