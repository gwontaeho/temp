import { sampleIcon } from '../ui-component/icons/icons';

const top = {
	id: 'top',
	title: '',
	type: 'group',
	children: [
		{
			id: 'mypage',
			title: '내 정보',
			type: 'item',
			url: '/mypage',
			icon: sampleIcon,
			breadcrumbs: false,
		},
	],
};

export default top;
