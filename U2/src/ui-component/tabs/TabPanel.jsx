import { Typography as MuiTypography, Box as MuiBox } from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';

function TabPanelBox(props) {
	const { children, value, index, ...other } = props;

	return (
		<MuiTypography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			<MuiBox p={3}>{children}</MuiBox>
		</MuiTypography>
	);
}

TabPanelBox.propTypes = {
	children: propTypes.node,
	index: propTypes.any.isRequired,
	value: propTypes.any.isRequired,
};

// Sample-Call
//<TabPanel value={value} index={0}>
//	<Typography variant="h6" className={classes.title}>
//		{`제목`}
//	</Typography>
//</TabPanel>

export default function TabPanel({ index, value, children }) {
	return (
		<>
			<TabPanelBox key={index} index={index} value={value}>
				{children}
			</TabPanelBox>
		</>
	);
}
