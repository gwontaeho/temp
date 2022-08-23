import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePicker({ value, onChange, ...props }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MuiDatePicker
				value={value}
				inputFormat="yyyy-MM-dd"
				mask="____-__-__"
				onChange={onChange}
				renderInput={(params) => (
					<TextField sx={{ width: '12rem', '& input': { paddingRight: '0' } }} {...params} />
				)}
				{...props}
			/>
		</LocalizationProvider>
	);
}
