// action - state management
import * as actionTypes from './actions';

export const initialState = {
	isLogOn: false,
	memberInfo: {
		memberId: null,
		teamId: null,
		memberName: '',
		teamName: '',
		memberEmail: '',
	},
	settingInfo: {},
	codes: {},
	alertInfo: { key: null, open: false, message: '' },
	appInfo: { LmsPrice: 20 },
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_LOGON:
			return {
				...state,
				isLogOn: action.success,
			};
		case actionTypes.SET_MEMBERINFO:
			return {
				...state,
				memberInfo: action.value || initialState.memberInfo,
			};
		case actionTypes.SET_CODES:
			return {
				...state,
				codes: action.codes,
			};
		case actionTypes.SET_SETTINGINFO:
			let tmp = action.value;
			return { ...state, settingInfo: { ...state.settingInfo, ...tmp } };

		case actionTypes.SET_ALERTINFO:
			return { ...state, alertInfo: action.value };

		default:
			return state;
	}
};

export default sessionReducer;
