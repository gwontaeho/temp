import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
	SectionSubtitle: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '2.6rem',
		marginTop: '-0.4rem',
		'& > .MuiTypography-root': {
			fontWeight: 600,
		},
	},
	title: {
		display: 'flex',
		alignItems: 'center',
	},
	right: {
		marginLeft: 'auto',
	},
	divider: {
		margin: '12px 0 18px',
	},
}));

export default function SectionSubtitle(props) {
	const classes = useStyles();
	const { text, rightComponent } = props;

	return (
		<>
			<div className={classes.SectionSubtitle}>
				<Typography variant="h4" className={classes.title}>
					{text}
				</Typography>

				<div className={classes.right}>{rightComponent}</div>
			</div>
			<Divider className={classes.divider} />
		</>
	);
}
