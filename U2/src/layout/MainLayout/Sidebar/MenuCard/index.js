import { styled } from '@mui/material/styles';
import { Button as MuiButton, Card, CardContent } from '@mui/material';
import { withStyles } from '@mui/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const _URL_U2ALIMI = process.env.REACT_APP_U2ALIMI;

const CardStyle = styled(Card)(({ theme }) => ({
	background: '#FFF',
	overflow: 'hidden',
	position: 'relative',
}));

const Button = withStyles(() => ({
	root: {
		height: '3.4rem',
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 1rem',
		borderRadius: '14px',
	},
}))(MuiButton);

const MenuCard = () => {
	const handleClickAlimi = () => {
		window.open(_URL_U2ALIMI, 'U2알리미');
	};

	return (
		<CardStyle>
			<CardContent sx={{ p: 1, pt: 2 }}>
				<Button
					fullWidth
					color="primary"
					size="large"
					endIcon={<LaunchIcon />}
					onClick={handleClickAlimi}
				>
					<span>U2알리미 바로가기</span>
				</Button>
			</CardContent>
		</CardStyle>
	);
};

export default MenuCard;
