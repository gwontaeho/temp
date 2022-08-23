import { resolveMotionValue } from 'framer-motion';
import { read, utils } from 'xlsx';
import { map, mapKeys } from 'lodash';

const _KEYS = {
	이름: 'patientName',
	성별: 'gender',
	주민등록번호: 'socialNumber',
	생년월일: 'birthday',
	휴대폰번호: 'cellNumber',
	이메일: 'email',
};

export const loadExcelFile = (file, callback) => {
	if (file) {
		// TO-DO : 파일 용량, 확장자 등 체크
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept
		let reader = new FileReader();

		reader.onloadend = () => {
			let result = [];
			try {
				const wb = read(reader.result, { type: 'binary' });
				let worksheet = wb.Sheets[wb.SheetNames[0]];
				result = utils.sheet_to_json(worksheet, {
					blankrows: false,
					defval: '',
					dateNF: 'yyyy-MM-dd',
				});
				console.log(result);
				result = map(result, (item, index) => {
					item = mapKeys(item, function (v, k) {
						return k in _KEYS ? _KEYS[k] : k;
					});

					item.no = index + 1;
					return item;
				});
			} catch (e) {
				console.log(e);
			}

			callback(result);
		};

		reader.readAsBinaryString(file);
	}
};

export const loadFile = (file, callback) => {
	if (file) {
		let reader = new FileReader();
		reader.readAsDataURL(file); // base64 로 저장

		reader.onload = () => {
			callback(reader.result);
		};

		// reader.onload = () => {
		// 	let blob = reader.result;
		// 	let file = new Blob([blob], { type: 'application/pdf' });

		// 	callback(file);

		// 	return file;
		// };
	}
};
