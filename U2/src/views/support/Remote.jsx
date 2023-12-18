import { Typography } from '@mui/material';
import { SubscriptionIcon } from '../../ui-component/icons/icons';

export default function Remote() {
	return (
		<div>
			<Typography variant="h2">
				{SubscriptionIcon()}
				<label style={{ marginLeft: '0.8rem' }}>원격지원</label>
			</Typography>
		</div>
	);
}
