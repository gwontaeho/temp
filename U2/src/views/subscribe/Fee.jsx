import { Typography } from '@mui/material';
import { SubscriptionIcon } from '../../ui-component/icons/icons';

export default function Fee() {
	return (
		<div>
			<Typography variant="h2">
				{SubscriptionIcon()}
				<label style={{ marginLeft: '0.8rem' }}>실시간 이용요금</label>
			</Typography>
		</div>
	);
}
