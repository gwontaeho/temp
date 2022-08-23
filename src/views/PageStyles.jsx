export const PageStyle = (theme) => ({
	height: 'auto',
	minHeight: '-webkit-fill-available',
	display: 'flex',
	flexDirection: 'column',
	background: theme.palette.primary.light,
	'@media(min-width:780px)': {
		//maxWidth: '1000px',
		margin: '0 auto',
		padding: '0 20px 20px',
	},
});
