import { RadioGroup as MuiRadioGroup } from '@mui/material';
import { withStyles } from '@mui/styles';

const RadioGroup = withStyles(() => ({
	root: (props) => ({
		display: 'flex',
		flexDirection: 'row',
		padding: props.noPadding ? '0' : '8px 0',
		'& .MuiTypography-root': {
			marginRight: '1.4rem',
			fontWeight: 500,
		},
	}),
}))(MuiRadioGroup);

export default function RadioGroupRow({ children, ...props }) {
	return <RadioGroup {...props}>{children}</RadioGroup>;
}
