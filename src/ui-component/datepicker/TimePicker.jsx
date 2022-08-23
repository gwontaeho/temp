import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';

export default function TimePicker({ value, onChange, ...props }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MuiTimePicker
				value={value}
				inputFormat="HH:mm"
				mask="__:__"
				onChange={onChange}
				renderInput={(params) => (
					<TextField sx={{ width: '8rem', '& input': { paddingRight: '0' } }} {...params} />
				)}
				{...props}
			/>
		</LocalizationProvider>
	);
}
