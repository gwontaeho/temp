import { Tabs as MuiTabs, Tab as MuiTab, AppBar as MuiAppBar } from '@mui/material';
import { withStyles } from '@mui/styles';

const AppBar = withStyles((theme) => ({
	root: {
		background: 'transparent',
		borderRadius: '16px',
		border: '0px solid',
		zIndex: 2,
		boxShadow: 'none',
		color: theme.palette.text.primary,
	},
}))(MuiAppBar);
const StyleTabs = withStyles(() => ({
	root: {
		background: 'transparent',
		borderRadius: '0px',
	},
}))(MuiTabs);
const StyleTab = withStyles((theme) => ({
	root: {
		background: 'white',
		borderTopLeftRadius: '16px',
		borderTopRightRadius: '16px',
		borderBottomLeftRadius: '0px',
		borderBottomRightRadius: '0px',
		borderTop: '1px solid #E0E0E0',
		borderLeft: '1px solid #E0E0E0',
		borderBottom: '1px solid #E0E0E0',
		borderRight: '1px solid #E0E0E0',
		minWidth: '16rem',
		maxWidth: '24rem',
		height: '4.2rem',
		justifyContent: 'flex-start',
		padding: '0rem 1.6rem',
		marginBottom: '0rem',
		minHeight: '50px',
		fontSize: '1.2rem',
		fontFamily: 'Noto Sans KR',
		fontWeight: 700,
	},
	indicator: {},
	selected: {
		borderTop: '1px solid #E0E0E0',
		borderLeft: '1px solid #E0E0E0',
		borderBottom: '1px solid transparent',
		borderRight: '1px solid #E0E0E0',
	},
	wrapper: {},
	iconWrapper: {
		marginRight: '0.8rem !important',
	},
}))(MuiTab);

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

// Sample-tabinfo
// const SAMPLE_TABS = [
// 	{ index: 0, label: '기본정보', icon: SAMPLE_ICONS.AccountCircleOutlinedIcon },
// 	{ index: 1, label: '발신정보', icon: SAMPLE_ICONS.AccountCircleOutlinedIcon },
// 	{ index: 2, label: '결과 리포팅', icon: SAMPLE_ICONS.AccountCircleOutlinedIcon },
// ];
// Sample-Call
// <Tab tabinfo={TAB_INFOS} value={value} handleChange={handleChange} />

export default function Tab({ tabinfo, value, handleChange }) {
	return (
		<>
			<AppBar position="static">
				<StyleTabs
					onChange={handleChange}
					value={value}
					variant="scrollable"
					scrollButtons="auto"
					textColor="inherit"
					TabIndicatorProps={{ style: { background: 'none' } }}
				>
					{tabinfo.map((t) => {
						return (
							<StyleTab
								key={t.index}
								label={t.label}
								icon={t.icon}
								iconPosition="start"
								{...a11yProps(t.index)}
							/>
						);
					})}
				</StyleTabs>
			</AppBar>
		</>
	);
}
