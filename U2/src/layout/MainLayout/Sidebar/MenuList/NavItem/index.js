import PropTypes from 'prop-types';
import { forwardRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
	Avatar,
	Chip,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

// project imports
import { MENU_OPEN } from '../../../../../store/actions';
import config from '../../../../../config';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const customization = useSelector((state) => state.customization);
	// const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
	const selected = useMemo(
		() => customization.isOpen.findIndex((id) => id === item.id) > -1,
		[customization.isOpen, item.id],
	);

	let itemTarget = '_self';
	if (item.target) {
		itemTarget = '_blank';
	}

	let listItemProps = {
		component: forwardRef((props, ref) => (
			<Link ref={ref} {...props} to={`${config.basename}${item.url}`} target={itemTarget} />
		)),
	};
	if (item?.external) {
		listItemProps = { component: 'a', href: item.url, target: itemTarget };
	}

	const itemHandler = (id) => {
		dispatch({ type: MENU_OPEN, id });
		// if (matchesSM) dispatch({ type: SET_MENU, opened: false });
	};

	// active menu item on page load
	useEffect(() => {
		const currentIndex = document.location.pathname
			.toString()
			.split('/')
			.findIndex((id) => id === item.id);
		if (currentIndex > -1) {
			dispatch({ type: MENU_OPEN, id: item.id });
		}
		// eslint-disable-next-line
	}, []);

	return (
		<ListItemButton
			{...listItemProps}
			disabled={item.disabled}
			sx={
				{
					// backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
					// py: level > 1 ? 1 : 1.25,
					// pl: `${level * 1}rem`,
				}
			}
			selected={selected}
			onClick={() => itemHandler(item.id)}
		>
			<ListItemIcon>{item.icon({ selected })}</ListItemIcon>
			<ListItemText
				primary={
					<Typography variant={'h5'} color="inherit">
						{item.title}
					</Typography>
				}
				secondary={
					item.caption && (
						<Typography
							variant="caption"
							sx={{ ...theme.typography.subMenuCaption }}
							display="block"
							gutterBottom
						>
							{item.caption}
						</Typography>
					)
				}
			/>
			{item.chip && (
				<Chip
					color={item.chip.color}
					variant={item.chip.variant}
					size={item.chip.size}
					label={item.chip.label}
					avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
				/>
			)}
		</ListItemButton>
	);
};

NavItem.propTypes = {
	item: PropTypes.object,
	level: PropTypes.number,
};

export default NavItem;
