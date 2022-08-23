import { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';

import Dialog from '../../../ui-component/dialogs/Dialog';
import ListGroup from '../../../ui-component/lists/ListGroup';
import ListItem from '../../../ui-component/lists/ListItem';

export default function DialogFindEmail({ handleClose }) {
	const [name, setName] = useState('');
	const [cellNumber, setCellNumber] = useState('');
	const [isSent, setIsSent] = useState(false);

	const handleChangeName = useCallback((e) => {
		setName(e.target.value);
	}, []);

	const handleChangeCellNumber = useCallback((e) => {
		setCellNumber(e.target.value);
	}, []);

	const handleClickSendCode = useCallback((name, cellNumber) => {
		console.info(name, cellNumber);
		setIsSent(true);
	}, []);

	return (
		<Dialog
			title="이메일 찾기"
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
				<ListItem title="이름">
					<TextField onChange={handleChangeName} />
				</ListItem>

				<ListItem title="휴대폰번호">
					<TextField
						onChange={handleChangeCellNumber}
						helperText={isSent ? '인증번호가 전송되었습니다.' : ''}
					/>
					<Button
						onClick={() => handleClickSendCode(name, cellNumber)}
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
