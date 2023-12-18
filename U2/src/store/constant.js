// theme constant
export const gridSpacing = 3;
export const drawerWidth = 340;
export const appDrawerWidth = 380;

// temporary
export const chartColors = {
	completed: { name: '완료', mainColor: '#2591e5', lightColor: '#d3e9fa' },
	waiting: { name: '대기', mainColor: '#30cce3', lightColor: '#c6f6ff' },
	failed: { name: '실패', mainColor: '#eb7a43', lightColor: '#f7cab4' },
};

export const RecipientStatusColors = {
	0: { name: '대기', mainColor: '#30cce3', lightColor: '#c6f6ff' },
	1: { name: '완료', mainColor: '#2591e5', lightColor: '#d3e9fa' },
	3: { name: '실패', mainColor: '#eb7a43', lightColor: '#f7cab4' },
};

export const SendGroupStatusColors = {
	0: { id: '0', name: '시작 전', color: '#969696' },
	1: { id: '1', name: '임시저장', color: '#643bc1' },
	2: { id: '2', name: '진행 중', color: '#177fff' },
	3: { id: '3', name: '완료', color: '#444444' },
	4: { id: '4', name: '발송취소', color: '#eb7a43' },
};
