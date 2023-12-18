import { Typography } from '@mui/material';
import { SubscriptionIcon } from '../../ui-component/icons/icons';

export default function MemberAuth() {
	return (
		<div>
			<Typography variant="h2">
				{SubscriptionIcon()}
				<label style={{ marginLeft: '0.8rem' }}>멤버구독</label>
			</Typography>
		</div>
	);
}
