import {
	Dialog as MuiDialog,
	DialogTitle as MuiDialogTitle,
	DialogContent,
	DialogActions as MuiDialogActions,
	IconButton,
} from '@mui/material';

import { CloseIcon } from '../icons/icons';

export default function Dialog({
	title = '',
	children,
	buttons,
	hasClose,
	onClose,
	maxWidth = 'xl',
}) {
	return (
		<MuiDialog open={true} maxWidth={maxWidth}>
			<MuiDialogTitle>
				{title}
				{hasClose && (
					<IconButton
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							p: 1.8,
						}}
					>
						{CloseIcon({ selected: false })}
					</IconButton>
				)}
			</MuiDialogTitle>

			<DialogContent>{children}</DialogContent>

			<MuiDialogActions>{buttons}</MuiDialogActions>
		</MuiDialog>
	);
}
