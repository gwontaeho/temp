import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';

import { RecipientStatusColors } from '../../store/constant';
import { map } from 'lodash';
import { calculateRatio } from '../../utils/NumberUtil';

const useStylesDetailItem = makeStyles(() => ({
	DetailItem: {
		minWidth: '9rem',
	},
	name: {
		width: '2.2rem',
		fontWeight: 500,
	},
	percentage: {
		width: '2.4rem',
		textAlign: 'right',
	},
	bar: {
		width: '1.6rem',
		textAlign: 'center',
	},
	count: {
		textAlign: 'right',
	},
}));

const DetailItem = ({ id, value, total }) => {
	const classes = useStylesDetailItem();
	return (
		<Stack component="label" direction="row" alignItems="center" className={classes.DetailItem}>
			<span className={classes.name}>{RecipientStatusColors[id]?.name}</span>
			<span className={classes.percentage}>{`${calculateRatio(value, total)}%`}</span>
			<span className={classes.bar}>{'｜'}</span>
			<span className={classes.count}>{`${value ?? 0}건`}</span>
		</Stack>
	);
};

const useStyles = makeStyles(() => ({
	date: {
		fontWeight: 500,
		marginRight: '1.2rem',
	},
	detail: {
		margin: '0.4rem 0',
	},
}));

export default function RecipientStatusTooltip({ dateString, total, values }) {
	const classes = useStyles();

	return (
		<>
			<div className={classes.date}>{dateString || ''}</div>

			<div className={classes.detail}>
				{map(values, (item, key) => (
					<DetailItem key={key} id={key} value={item} total={total} />
				))}
			</div>

			<div>{`총 ${total?.toLocaleString() ?? '--'} 건`}</div>
		</>
	);
}
