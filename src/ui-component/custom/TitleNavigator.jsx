import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { IconButton, Stack } from '@mui/material';

import { BackIcon } from '../icons/icons';

const useStyles = makeStyles(() => ({
	button: {
		padding: '8px 12px',
		margin: '0 2px 0 -8px',
	},
	title: {
		fontFamily: 'Noto Sans KR',
		fontSize: '1.25rem',
		fontWeight: 600,
	},
}));

export default function TitleNavigator({ title, children, handleClick }) {
	const classes = useStyles();
	const navigate = useNavigate();

	const onClick = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<Stack direction="row" alignItems="center">
			<IconButton onClick={handleClick ?? onClick} className={classes.button}>
				{BackIcon()}
			</IconButton>

			<div className={classes.title}>{title}</div>

			{children}
		</Stack>
	);
}
