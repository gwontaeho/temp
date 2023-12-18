import { IconButton, Tooltip as MuiTooltip } from '@mui/material';

import { InfoBubbleIcon } from '../icons/icons';

export default function TooltipIcon(props) {
	const { title = '', icon, placement = 'top' } = props;

	return (
		<MuiTooltip title={title || ''} placement={placement} arrow>
			<IconButton>{icon ?? InfoBubbleIcon()}</IconButton>
		</MuiTooltip>
	);
}
