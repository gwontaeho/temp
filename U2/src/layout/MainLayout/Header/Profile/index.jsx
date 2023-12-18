import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { Box, Button, ClickAwayListener, Popper, Stack } from '@mui/material';

import { SET_LOGON } from '../../../../store/actions';
import { removeCookie } from '../../../../utils/Cookie';
import { sampleIcon } from '../../../../ui-component/icons/icons';
import MainCard from '../../../../ui-component/cards/MainCard';
import DialogAlert from '../../../../ui-component/dialogs/DialogAlert';

export default function Profile() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const memberInfo = useSelector((state) => state.session?.memberInfo);
	const anchorRef = useRef(null);
	const [openAlert, setOpenAlert] = useState(null);

	const handleClickLogout = useCallback(async () => {
		removeCookie('accessToken');
		removeCookie('memberEmail');
		setOpenAlert(true);
	}, []);

	const handleAlert = useCallback(() => {
		setOpenAlert(null);
	}, []);

	useEffect(() => {
		if (!openAlert) dispatch({ type: SET_LOGON, success: false });
	}, [openAlert, dispatch]);

	const handleClickMyPage = useCallback(() => {
		navigate('/mypage');
	}, [navigate]);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const handleToggle = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<>
			<Button
				variant="text"
				startIcon={sampleIcon()}
				onClick={handleToggle}
				ref={anchorRef}
				disableRipple
				sx={{ '&:hover': { backgroundColor: 'transparent' } }}
			>
				{`${memberInfo.memberName} 님`}
			</Button>
			<Popper
				placement="bottom-end"
				open={open}
				anchorEl={anchorRef.current}
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 14],
							},
						},
					],
				}}
			>
				<ClickAwayListener onClickAway={handleClose}>
					<MainCard
						border={false}
						elevation={16}
						content={false}
						boxShadow
						shadow={theme.shadows[16]}
					>
						<Stack sx={{ p: 2, minWidth: '17rem' }} spacing={2}>
							<Stack direction="row" spacing={1}>
								<Box sx={{ display: 'flex', alignItems: 'center', px: 0.4 }}>
									{sampleIcon()}
								</Box>
								<Stack>
									<div>{memberInfo.memberName}</div>
									<div>{memberInfo.memberEmail}</div>
								</Stack>
							</Stack>
							<Stack direction="row" spacing={1}>
								<Button fullWidth onClick={handleClickMyPage}>
									내 정보
								</Button>
								<Button fullWidth onClick={handleClickLogout}>
									로그아웃
								</Button>
							</Stack>
						</Stack>
					</MainCard>
				</ClickAwayListener>
			</Popper>

			{!!openAlert && (
				<DialogAlert onClose={handleAlert}>{'U2Cloud 로그아웃이 완료되었습니다.'}</DialogAlert>
			)}
		</>
	);
}
