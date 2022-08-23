import { useCallback } from 'react';
import { Button as MuiButton } from '@mui/material';
import { withStyles } from '@mui/styles';

const Button = withStyles(() => ({
	root: {
		borderRadius: '16px',
		marginRight: '8px',
	},
}))(MuiButton);

export default function ValueButton({ children, value, onClick, ...props }) {
	const handleClick = useCallback(
		(e) => {
			onClick(value, e);
		},
		[onClick, value],
	);

	return (
		<Button onClick={handleClick} {...props}>
			{children ?? value}
		</Button>
	);
}
