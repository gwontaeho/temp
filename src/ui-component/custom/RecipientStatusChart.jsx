import { Skeleton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { map } from 'lodash';
import { useCallback } from 'react';

import { RecipientStatusColors } from '../../store/constant';
import { calculateRatio } from '../../utils/NumberUtil';
import TooltipContainer from '../tooltips/TooltipContainer';
import RecipientStatusTooltip from './RecipientStatusTooltip';

const useStyles = makeStyles((theme) => ({
	RecipientStatusChart: (props) => ({
		width: '100%',
		height: props.height ?? '2.2rem',
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		background: theme.palette.background.page,
	}),
	item: {
		width: 0,
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		color: '#FFF',
		fontSize: '1rem',
		fontWeight: 500,
	},
}));

export const RecipientStatusChart = ({
	values,
	total,
	dateString,
	showLabel,
	labelType = 1,
	isLoading = false,
	height,
}) => {
	const classes = useStyles({ height });

	const getLabel = useCallback(
		(key, value) => {
			if (showLabel === 'all' || (showLabel === 'partial' && (key === '0' || key === '1'))) {
				let percentage = calculateRatio(value, total);

				switch (labelType) {
					case 2:
						return (
							<Stack
								component="label"
								direction="row"
								spacing={0.6}
								sx={{ fontSize: '0.9rem' }}
							>
								<span
									style={{ fontSize: '1rem', fontWeight: 600 }}
								>{`${percentage}%`}</span>
								<span>{'|'}</span>
								<span>{value}</span>
							</Stack>
						);
					case 0:
						return `${percentage}%`;
					case 1:
					default:
						return `${RecipientStatusColors[key]?.name} ${percentage}%`;
				}
			}
		},
		[total, labelType, showLabel],
	);

	return (
		<>
			{isLoading ? (
				<Skeleton animation="wave" variant="rectangular" height="auto" width="100%" />
			) : (
				<TooltipContainer
					title={
						<RecipientStatusTooltip dateString={dateString} total={total} values={values} />
					}
					showIcon={false}
					placement="bottom"
					followCursor
					style={{ flexGrow: 1, width: '100%' }}
				>
					<div className={classes.RecipientStatusChart}>
						{map(
							values,
							(value, key) =>
								value > 0 && (
									<label
										key={key}
										className={classes.item}
										style={{
											flexGrow: value,
											background: `${RecipientStatusColors[key]?.mainColor}`,
										}}
									>
										{showLabel && getLabel(key, value)}
									</label>
								),
						)}
					</div>
				</TooltipContainer>
			)}
		</>
	);
};
