import { Link } from '@mui/material';

export const LinkButton = ({ text, handleClick }) => {
	return (
		<Link
			sx={{ fontFamily: 'Noto Sans KR', overFlow: 'hidden', width: '100%' }}
			component="button"
			onClick={handleClick}
		>
			{text}
		</Link>
	);
};
