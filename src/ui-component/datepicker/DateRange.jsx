import { useCallback } from 'react';
import { Stack } from '@mui/material';

import DatePicker from './DatePicker';

export default function DateRange({ dateRange, handleChange, startProps, endProps }) {
	const handleChangeStart = useCallback(
		(val) => {
			handleChange({ start: val, end: dateRange.end });
		},
		[dateRange.end, handleChange],
	);
	const handleChangeEnd = useCallback(
		(val) => {
			handleChange({ start: dateRange.start, end: val });
		},
		[dateRange.start, handleChange],
	);

	return (
		<Stack direction="row" alignItems="center" spacing={1} sx={{ width: '22rem' }}>
			<DatePicker value={dateRange.start} onChange={handleChangeStart} {...startProps} />
			<span style={{ fontSize: '1.2rem', fontWeight: 500 }}>~</span>
			<DatePicker value={dateRange.end} onChange={handleChangeEnd} {...endProps} />
		</Stack>
	);
}
