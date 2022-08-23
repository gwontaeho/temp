import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';

import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import DialogFindEmail from '../authAccount/DialogFindEmail';
import DialogResetPassword from '../authAccount/DialogResetPassword';
import { sampleIcon } from '../../../ui-component/icons/icons';

// ================================|| AUTH - LOGIN ||================================ //

const Login = () => {
	// const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const [openEmail, setOpenEmail] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);

	return (
		<>
			<Box sx={{ alignSelf: 'center' }}>
				<AuthCardWrapper>
					<Grid container spacing={2} justifyContent="space-between">
						<Grid item xs={12}>
							<Box
								sx={{
									height: '150px',
									border: '1px dashed grey',
									mt: 5,
									mb: 4,
								}}
							>
								{sampleIcon()}
							</Box>

							<AuthLogin handleFind={setOpenEmail} handleReset={setOpenPassword} />
						</Grid>

						<Grid item xs={12} sx={{ mt: 18 }}>
							<Button fullWidth size="large">
								서비스 둘러보기
							</Button>
						</Grid>
					</Grid>
				</AuthCardWrapper>
			</Box>
			{!!openEmail && <DialogFindEmail handleClose={setOpenEmail} />}
			{!!openPassword && <DialogResetPassword handleClose={setOpenPassword} />}
		</>
	);
};

export default Login;
