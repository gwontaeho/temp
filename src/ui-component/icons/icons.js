import img_logo from '../../assets/images/icons/img_logo.png';

import btn_navi_home_n from '../../assets/images/icons/btn_navi_home_n.png';
import btn_navi_home_p from '../../assets/images/icons/btn_navi_home_p.png';
import btn_navi_reserve_n from '../../assets/images/icons/btn_navi_reserve_n.png';
import btn_navi_reserve_p from '../../assets/images/icons/btn_navi_reserve_p.png';
import btn_navi_send_n from '../../assets/images/icons/btn_navi_send_n.png';
import btn_navi_send_p from '../../assets/images/icons/btn_navi_send_p.png';
import btn_navi_templete_n from '../../assets/images/icons/btn_navi_templete_n.png';
import btn_navi_templete_s from '../../assets/images/icons/btn_navi_templete_s.png';
import btn_navi_subs_n from '../../assets/images/icons/btn_navi_subs_n.png';
import btn_navi_subs_s from '../../assets/images/icons/btn_navi_subs_s.png';
import btn_navi_setting_n from '../../assets/images/icons/btn_navi_setting_n.png';
import btn_navi_setting_s from '../../assets/images/icons/btn_navi_setting_s.png';
import btn_menu_n from '../../assets/images/icons/btn_menu_n.png';
import btn_menu_p from '../../assets/images/icons/btn_menu_p.png';
import img_profile from '../../assets/images/icons/img_profile.png';
import img_fee from '../../assets/images/icons/img_fee.png';
import img_money from '../../assets/images/icons/img_money.png';
import img_receiver from '../../assets/images/icons/img_receiver.png';
import img_dot_v from '../../assets/images/icons/img_dot_v.png';
import img_dot_l from '../../assets/images/icons/img_dot_l.png';
import img_arrow_next from '../../assets/images/icons/img_arrow_next.png';
import img_calendar from '../../assets/images/icons/img_calendar.png';
import img_date from '../../assets/images/icons/img_date.png';
import img_send from '../../assets/images/icons/img_send.png';
import img_question from '../../assets/images/icons/img_question.png';
import img_info_bub from '../../assets/images/icons/img_info_bub.png';
import img_error from '../../assets/images/icons/img_error.png';
import btn_search_n from '../../assets/images/icons/btn_search_n.png';
import img_callnum from '../../assets/images/icons/img_callnum.png';
import img_check from '../../assets/images/icons/img_check.png';
import img_info from '../../assets/images/icons/img_info.png';
import btn_prev_n from '../../assets/images/icons/btn_prev_n.png';

import btn_tab_exel_s from '../../assets/images/icons/btn_tab_exel_s.png';
import btn_tab_input_s from '../../assets/images/icons/btn_tab_input_s.png';
import btn_tab_u2check_s from '../../assets/images/icons/btn_tab_u2check_s.png';
import img_reserve from '../../assets/images/icons/img_reserve.png';

import btn_tab_group_s from '../../assets/images/icons/btn_tab_group_s.png';
import btn_tab_receiver_s from '../../assets/images/icons/btn_tab_receiver_s.png';

import btn_tab_sms_s from '../../assets/images/icons/btn_tab_sms_s.png';
import btn_tab_kakao_s from '../../assets/images/icons/btn_tab_kakao_s.png';
import btn_view_list_n from '../../assets/images/icons/btn_view_list_n.png';
import btn_view_list_s from '../../assets/images/icons/btn_view_list_s.png';
import btn_view_img_n from '../../assets/images/icons/btn_view_img_n.png';
import btn_view_img_s from '../../assets/images/icons/btn_view_img_s.png';

import btn_tab_info_s from '../../assets/images/icons/btn_tab_info_s.png';
import btn_tab_call_s from '../../assets/images/icons/btn_tab_call_s.png';
import btn_tab_report_s from '../../assets/images/icons/btn_tab_report_s.png';
import img_register from '../../assets/images/icons/img_register.png';
import btn_edit_n from '../../assets/images/icons/btn_edit_n.png';

import btn_popup_close_n from '../../assets/images/icons/btn_popup_close_n.png';
import btn_popup_close_p from '../../assets/images/icons/btn_popup_close_p.png';

import btn_check_n from '../../assets/images/icons/btn_check_n.png';
import btn_check_s from '../../assets/images/icons/btn_check_s.png';

import btn_radio_n from '../../assets/images/icons/btn_radio_n.png';
import btn_radio_s from '../../assets/images/icons/btn_radio_s.png';

import btn_page_pprev_n from '../../assets/images/icons/btn_page_pprev_n.png';
import btn_page_prev_n from '../../assets/images/icons/btn_page_prev_n.png';
import btn_page_next_n from '../../assets/images/icons/btn_page_next_n.png';
import btn_page_nnext_n from '../../assets/images/icons/btn_page_nnext_n.png';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
export const sampleIcon = () => <WallpaperIcon />;

// 로고

export const LogoIcon = () => {
	return <img src={img_logo} width="110px" height="28px" alt="logo icon" />;
};

// 공통

export const HomeIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_home_p : btn_navi_home_n}
			width="30px"
			height="30px"
			alt="home icon"
		/>
	);
};

export const MessageIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_reserve_p : btn_navi_reserve_n}
			width="30px"
			height="30px"
			alt="message icon"
		/>
	);
};

export const ListIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_send_p : btn_navi_send_n}
			width="30px"
			height="30px"
			alt="list icon"
		/>
	);
};

export const TemplateIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_templete_s : btn_navi_templete_n}
			width="30px"
			height="30px"
			alt="template icon"
		/>
	);
};

export const SubscriptionIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_subs_s : btn_navi_subs_n}
			width="30px"
			height="30px"
			alt="subscription icon"
		/>
	);
};

export const SettingIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_navi_setting_s : btn_navi_setting_n}
			width="30px"
			height="30px"
			alt="setting icon"
		/>
	);
};

export const MenuIcon = (props) => {
	return (
		<img
			src={props?.selected ? btn_menu_p : btn_menu_n}
			width="33px"
			height="32px"
			alt="menu icon"
		/>
	);
};

export const ProfileIcon = () => {
	return <img src={img_profile} width="52px" height="52px" alt="profile icon" />;
};

export const FeeIcon = () => {
	return <img src={img_fee} width="32px" height="32px" alt="fee icon" />;
};

export const MoneyIcon = () => {
	return <img src={img_money} width="30px" height="30px" alt="money icon" />;
};

export const PersonIcon = () => {
	return <img src={img_receiver} width="30px" height="30px" alt="receiver icon" />;
};

export const DotVertIcon = () => {
	return <img src={img_dot_v} width="10px" height="34px" alt="dot icon" />;
};

export const DotHorIcon = () => {
	return <img src={img_dot_l} width="34px" height="10px" alt="dot icon" />;
};

export const ArrowNextIcon = () => {
	return <img src={img_arrow_next} width="12px" height="17px" alt="arrow icon" />;
};

export const CalendarIcon = () => {
	return <img src={img_calendar} width="81px" height="83px" alt="calendar icon" />;
};

export const DateIcon = () => {
	return <img src={img_date} width="26px" height="25px" alt="date icon" />;
};

export const SendIcon = () => {
	return <img src={img_send} width="26px" height="25px" alt="sending icon" />;
};

export const QuestionIcon = () => {
	return <img src={img_question} width="26px" height="26px" alt="question icon" />;
};

export const InfoBubbleIcon = () => {
	return <img src={img_info_bub} width="38px" height="32px" alt="info icon" />;
};

export const ErrorIcon = () => {
	return <img src={img_error} width="34px" height="29px" alt="error icon" />;
};

export const SearchIcon = () => {
	return <img src={btn_search_n} width="25px" height="25px" alt="search icon" />;
};

export const PhoneIcon = () => {
	return <img src={img_callnum} width="26px" height="26px" alt="phone icon" />;
};

export const CheckIcon = () => {
	return <img src={img_check} width="34px" height="34px" alt="check icon" />;
};

export const InfoCircleIcon = () => {
	return <img src={img_info} width="26px" height="26px" alt="info icon" />;
};

export const BackIcon = () => {
	return <img src={btn_prev_n} width="15px" height="23px" alt="back icon" />;
};

// 발송예약

export const ExcelIcon = () => {
	return <img src={btn_tab_exel_s} width="34px" height="34px" alt="excel icon" />;
};

export const EditorIcon = () => {
	return <img src={btn_tab_input_s} width="34px" height="34px" alt="editor icon" />;
};

export const U2CheckIcon = () => {
	return <img src={btn_tab_u2check_s} width="34px" height="34px" alt="U2Check icon" />;
};

export const ReserveIcon = () => {
	return <img src={img_reserve} width="70px" height="90px" alt="reserve icon" />;
};

// 발송현황

export const GroupIcon = () => {
	return <img src={btn_tab_group_s} width="34px" height="34px" alt="group icon" />;
};

export const ReceiveIcon = () => {
	return <img src={btn_tab_receiver_s} width="34px" height="34px" alt="person icon" />;
};

// 템플릿 관리

export const SmsIcon = () => {
	return <img src={btn_tab_sms_s} width="34px" height="34px" alt="SMS icon" />;
};

export const KakaoIcon = () => {
	return <img src={btn_tab_kakao_s} width="34px" height="34px" alt="Kakao icon" />;
};

export const ListViewIcon = (props) => {
	return (
		<img
			src={props.selected ? btn_view_list_s : btn_view_list_n}
			width="25px"
			height="24px"
			alt="list view"
		/>
	);
};

export const CardViewIcon = (props) => {
	return (
		<img
			src={props.selected ? btn_view_img_s : btn_view_img_n}
			width="25px"
			height="24px"
			alt="card view"
		/>
	);
};

// 설정

export const InfoIcon = () => {
	return <img src={btn_tab_info_s} width="34px" height="34px" alt="info icon" />;
};

export const CallIcon = () => {
	return <img src={btn_tab_call_s} width="34px" height="34px" alt="call icon" />;
};

export const ReportIcon = () => {
	return <img src={btn_tab_report_s} width="34px" height="34px" alt="report icon" />;
};

export const RegisterIcon = () => {
	return <img src={img_register} width="70px" height="90px" alt="register icon" />;
};

export const EditIcon = () => {
	return <img src={btn_edit_n} width="26px" height="26px" alt="edit icon" />;
};

// 다이얼로그

export const CloseIcon = (props) => {
	return (
		<img
			src={props.selected ? btn_popup_close_p : btn_popup_close_n}
			width="34px"
			height="34px"
			alt="close icon"
		/>
	);
};

// 체크박스

export const CheckboxIcon = (props) => {
	return (
		<img
			src={props.checked ? btn_check_s : btn_check_n}
			width="34px"
			height="34px"
			alt={`${props.checked ? '' : 'non'}checked icon`}
		/>
	);
};

// 라디오

export const RadioIcon = (props) => {
	return (
		<img
			src={props.checked ? btn_radio_s : btn_radio_n}
			width="34px"
			height="34px"
			alt={`${props.checked ? '' : 'non'}checked icon`}
		/>
	);
};

// 페이지네이션

export const PageFisrtIcon = () => {
	return <img src={btn_page_pprev_n} width="36px" height="36px" alt={'first page icon'} />;
};

export const PagePreviousIcon = () => {
	return <img src={btn_page_prev_n} width="36px" height="36px" alt={'previous page icon'} />;
};

export const PageNextIcon = () => {
	return <img src={btn_page_next_n} width="36px" height="36px" alt={'next page icon'} />;
};

export const PageLastIcon = () => {
	return <img src={btn_page_nnext_n} width="36px" height="36px" alt={'last page icon'} />;
};
