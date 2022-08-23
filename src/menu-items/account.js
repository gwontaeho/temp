import { SubscriptionIcon } from '../ui-component/icons/icons';
import { sampleIcon } from '../ui-component/icons/icons';

const account = {
	id: 'account',
	title: '관리',
	type: 'group',
	children: [
		{
			id: 'team',
			title: '기관정보',
			type: 'item',
			url: '/account/team',
			icon: sampleIcon,
			breadcrumbs: false,
		},
		{
			id: 'member',
			title: '멤버관리',
			type: 'item',
			url: '/account/member',
			icon: sampleIcon,
			breadcrumbs: false,
		},
		{
			id: 'memberauth',
			title: '멤버구독',
			type: 'item',
			url: '/account/memberauth',
			icon: SubscriptionIcon,
			breadcrumbs: false,
		},
	],
};

export default account;
