import { sampleIcon } from '../ui-component/icons/icons';

const support = {
	id: 'support',
	title: '고객지원',
	type: 'group',
	children: [
		{
			id: 'notice',
			title: '공지사항',
			type: 'item',
			url: '/support/notice',
			icon: sampleIcon,
			breadcrumbs: false,
		},
		{
			id: 'qna',
			title: '문의',
			type: 'item',
			url: '/support/qna',
			icon: sampleIcon,
			breadcrumbs: false,
		},
		{
			id: 'remote',
			title: '원격지원',
			type: 'item',
			url: '/support/remote',
			icon: sampleIcon,
			breadcrumbs: false,
		},
	],
};

export default support;
