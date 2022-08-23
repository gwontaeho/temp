import { Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	ListItem: {
		display: 'flex',
	},
	title: (props) => ({
		minWidth: '5rem',
		width: props.width ?? '9rem',
		padding: '12px 16px',
		backgroundColor: theme.palette.background.page,
		margin: '0',
		wordBreak: 'keep-all',
		'& > .MuiTypography-root': {
			fontFamily: 'Noto Sans KR',
			lineHeight: '1.4',
		},
	}),
	content: {
		display: 'flex',
		width: 'calc(100% - 5rem)',
		minHeight: '4rem',
		alignItems: 'center',
		paddingLeft: theme.spacing(3),
		padding: '0 0 12px 24px',
	},
}));

export default function ListItem({ title, children, width, LinkAddr, LinkName }) {
	const classes = useStyles({ width });

	return (
		<div className={classes.ListItem}>
			<div className={classes.title}>
				<Typography variant="subtitle1">{title}</Typography>

				{!!LinkAddr && !!LinkName && (
					<Link href={LinkAddr} download>
						{LinkName}
					</Link>
				)}
			</div>

			<div className={classes.content}>{children}</div>
		</div>
	);
}
