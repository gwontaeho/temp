import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Badge as MuiBadge, IconButton } from '@mui/material';
import { withStyles } from '@mui/styles';

import { sampleIcon } from '../../../../ui-component/icons/icons';

const StyledBadge = withStyles(() => ({
	badge: {
		right: 5,
		top: 11,
		backgroundColor: 'red',
		color: '#FFF',
	},
}))(MuiBadge);

export default function Notification() {
	const session = useSelector((state) => state.session);
	const { accountInfo } = session;

	const handleClick = useCallback(() => {
		console.info(accountInfo);
	}, [accountInfo]);

	return (
		<IconButton onClick={handleClick}>
			<StyledBadge badgeContent={1}>{sampleIcon()}</StyledBadge>
		</IconButton>
	);
}
