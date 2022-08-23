import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
	SectionItem: (props) => ({
		display: 'flex',
		flexDirection: 'column',
		marginBottom: theme.spacing(props.mb),
		height: props.height100 ? `calc(100% - ${theme.spacing(props.mb)} / 2)` : 'fit-content',
	}),
	title: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing(2),
		fontFamily: 'Noto Sans KR',
	},
	paper: {
		height: 'inherit',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(3),
		border: `1px solid ${theme.palette.divider}`,
	},
}));

export default function SectionItem({ title, children, noContainer, mb = 4, height100 = false }) {
	const classes = useStyles({ mb, height100 });

	return (
		<div className={classes.SectionItem}>
			{title && (
				<Typography variant="h5" className={classes.title}>
					{title}
				</Typography>
			)}

			{noContainer ? <>{children}</> : <Paper className={classes.paper}>{children}</Paper>}
		</div>
	);
}
