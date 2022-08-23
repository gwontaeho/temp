import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
	SectionItem: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: theme.spacing(4),
		zIndex: 1,
		backgroundColor: 'transparent',
	},
	title: {
		display: 'flex',
		marginBottom: theme.spacing(-0.2),
		backgroundColor: 'transparent',
	},
	paper: {
		padding: theme.spacing(1),
		border: `1px solid ${theme.palette.divider}`,
		//borderRadius: '0px',
		borderTopRightRadius: '16px',
		borderTopLeftRadius: '0px',
		borderBottomRightRadius: '16px',
		borderBottomLeftRadius: '16px',
	},
}));

export default function TabSectionItem({ title, children }) {
	const classes = useStyles();

	return (
		<div className={classes.SectionItem}>
			<Typography variant="h5" className={classes.title}>
				{title}
			</Typography>

			<Paper className={classes.paper}>{children}</Paper>
		</div>
	);
}
