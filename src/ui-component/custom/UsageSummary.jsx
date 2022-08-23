import { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, Stack, Typography } from '@mui/material';

import { MessageIcon, MoneyIcon } from '../icons/icons';

const useStyles = makeStyles((theme) => ({
	title: {
		marginRight: '16px',
	},
	icon: {
		marginRight: '8px',
		fontSize: '1.4rem',
	},
	number: {
		marginLeft: '0.4rem',
		color: theme.palette.error.main,
	},
	divider: {
		margin: '0 14px',
		height: '12px',
		borderRightWidth: '2px',
		borderColor: theme.palette.grey[900],
		alignSelf: 'center',
	},
}));

export default function UsageSummary({ count, price }) {
	const classes = useStyles();
	const countString = useMemo(() => `${count ? count.toLocaleString() : '--'} 건`, [count]);
	const priceString = useMemo(() => `${price ? price.toLocaleString() : '--'} 원`, [price]);

	return (
		<Stack direction="row" alignItems="center">
			{MessageIcon()}
			<Typography variant="subtitle1" className={classes.number}>
				{countString}
			</Typography>
			<Divider className={classes.divider} orientation="vertical" flexItem />
			{MoneyIcon()}
			<Typography variant="subtitle1" className={classes.number}>
				{priceString}
			</Typography>
		</Stack>
	);
}
