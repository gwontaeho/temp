import { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';

import Dialog from '../../../ui-component/dialogs/Dialog';
import ListGroup from '../../../ui-component/lists/ListGroup';
import ListItem from '../../../ui-component/lists/ListItem';

export default function DialogResetPassword({ handleClose }) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [cellNumber, setCellNumber] = useState('');
	const [isSent, setIsSent] = useState(false);

	const handleChangeEmail = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const handleChangeName = useCallback((e) => {
		setName(e.target.value);
	}, []);

	const handleChangeCellNumber = useCallback((e) => {
		setCellNumber(e.target.value);
	}, []);

	const handleClickSendCode = useCallback((email, name, cellNumber) => {
		console.info(email, name, cellNumber);
		setIsSent(true);
	}, []);

	return (
		<Dialog
			title="비밀번호 재설정"
			hasClose={true}
			onClose={() => handleClose(false)}
			maxWidth="sm"
			buttons={
				<Button color="primary" onClick={() => handleClose(false)}>
					확인
				</Button>
			}
		>
			<ListGroup>
				<ListItem title="이메일">
					<TextField onChange={handleChangeEmail} />
				</ListItem>

				<ListItem title="이름">
					<TextField onChange={handleChangeName} />
				</ListItem>

				<ListItem title="휴대폰번호">
					<TextField
						onChange={handleChangeCellNumber}
						helperText={isSent ? '인증번호가 전송되었습니다.' : ''}
					/>
					<Button
						onClick={() => handleClickSendCode(email, name, cellNumber)}
						sx={{
							alignSelf: isSent ? 'flex-start' : 'center',
							mt: isSent ? '3px' : '0',
							ml: 1,
						}}
					>
						인증번호 전송
					</Button>
				</ListItem>

				<ListItem title="인증번호">
					<TextField onChange={handleChangeName} helperText={''} />
				</ListItem>
			</ListGroup>
		</Dialog>
	);
}
