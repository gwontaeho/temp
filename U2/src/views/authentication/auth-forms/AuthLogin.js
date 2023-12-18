import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/styles';
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { SET_LOGON } from '../../../store/actions';
import useScriptRef from '../../../hooks/useScriptRef';
import UserAPI from '../../apis/UserAPI';
import Alert from '../../../ui-component/alerts/Alert';
import { setCookie } from '../../../utils/Cookie';
import { sampleIcon } from '../../../ui-component/icons/icons';

// ============================|| LOGIN ||============================ //

const Login = ({ handleFind, handleReset, ...others }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const scriptedRef = useScriptRef();
	const [checked, setChecked] = useState(window.localStorage.getItem('rememberEmail') === '1');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		window.localStorage.setItem('rememberEmail', checked ? '1' : '0');
	}, [checked]);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword((prev) => !prev);
	}, []);

	const handleMouseDownPassword = useCallback((event) => {
		event.preventDefault();
	}, []);

	const getErrorString = useCallback((errors, touched) => {
		return touched.email && errors.email
			? errors.email
			: touched.password && errors.password
			? errors.password
			: errors.submit ?? '오류가 발생하였습니다.';
	}, []);

	const handleToJoin = useCallback(() => {
		window.open(`${process.env.REACT_APP_HOME}/join`, '_blank');
	}, []);

	return (
		<>
			<Formik
				initialValues={{
					email: 'test@u2bio.com',
					password: '0000',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('이메일 형식이 올바르지 않습니다.')
						.max(255)
						.required('이메일을 입력해주세요'),
					password: Yup.string().max(255).required('비밀번호를 입력해주세요.'),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						if (scriptedRef.current) {
							UserAPI.login({ authId: values.email, authPw: values.password }).then(
								(res) => {
									if (!!res) {
										setStatus({ success: true });
										setCookie('accessToken', res.token);
										setCookie('memberEmail', values.email);
									} else {
										setErrors({
											submit:
												'등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다',
										});
									}
									dispatch({ type: SET_LOGON, success: !!res });
								},
							);
							setSubmitting(false);
						}
					} catch (err) {
						if (scriptedRef.current) {
							setStatus({ success: false });
							setErrors({ submit: err.message });
							setSubmitting(false);
						}
					}
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					touched,
					values,
				}) => (
					<form noValidate onSubmit={handleSubmit} {...others}>
						<Box sx={{ height: '51.03px', mb: 2 }}>
							{(errors.email || errors.password || errors.submit) && (
								<Alert variant="filled" severity="warning" color="error">
									{getErrorString(errors, touched)}
								</Alert>
							)}
						</Box>

						<FormControl fullWidth error={Boolean(touched.email && errors.email)}>
							<TextField
								variant="standard"
								value={values.email}
								name="email"
								label="이메일"
								type="email"
								onBlur={handleBlur}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">{sampleIcon()}</InputAdornment>
									),
								}}
								sx={{ ...theme.typography.customTextField }}
								placeholder="이메일"
							/>
						</FormControl>

						<FormControl fullWidth error={Boolean(touched.email && errors.email)}>
							<TextField
								variant="standard"
								value={values.password}
								name="password"
								label="비밀번호"
								type={showPassword ? 'text' : 'password'}
								onBlur={handleBlur}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">{sampleIcon()}</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{ ...theme.typography.customTextField }}
								placeholder="비밀번호"
							/>
						</FormControl>

						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={(event) => setChecked(event.target.checked)}
									name="checked"
									color="primary"
								/>
							}
							label="이메일 저장"
							sx={{ mt: 1, '& > .MuiTypography-root': { fontWeight: 500 } }}
						/>

						<Box sx={{ mt: 6 }}>
							<Button
								disabled={isSubmitting}
								fullWidth
								size="large"
								type="submit"
								color="primary"
							>
								로그인
							</Button>
						</Box>

						<Stack direction="row" justifyContent="center" sx={{ my: 1, color: 'grey.700' }}>
							<Button
								variant="text"
								size="large"
								color="inherit"
								onClick={() => handleFind(true)}
							>
								이메일 찾기
							</Button>
							<Divider
								orientation="vertical"
								flexItem
								sx={{
									borderColor: 'text.primary',
									borderRightWidth: '2px',
									my: '1.2rem',
								}}
							/>
							<Button variant="text" size="large" onClick={() => handleReset(true)}>
								비밀번호 재설정
							</Button>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ borderColor: 'text.primary', borderRightWidth: '2px', my: '1.2rem' }}
							/>
							<Button variant="text" size="large" onClick={handleToJoin}>
								회원가입
							</Button>
						</Stack>
					</form>
				)}
			</Formik>
		</>
	);
};

export default Login;
