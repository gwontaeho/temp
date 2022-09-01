import AlimiN from "./btn_new_alimi_n.png";
import AlimiP from "./btn_new_alimi_p.png";

import AlarmN from "./btn_alarm_n.png";
import AlarmP from "./btn_alarm_p.png";

import UserIconN from "./btn_navi_01_n.png";
import UserIconP from "./btn_navi_01_p.png";

import TeamIconN from "./btn_navi_02_n.png";
import TeamIconP from "./btn_navi_02_p.png";

import MembersIconN from "./btn_navi_03_n.png";
import MembersIconP from "./btn_navi_03_p.png";

import SubscribeIconN from "./btn_navi_04_n.png";
import SubscribeIconP from "./btn_navi_04_p.png";

import FeeIconN from "./btn_navi_05_n.png";
import FeeIconP from "./btn_navi_05_p.png";

import BillIconN from "./btn_navi_06_n.png";
import BillIconP from "./btn_navi_06_n.png";

import NoticeIconN from "./btn_navi_08_n.png";
import NoticeIconP from "./btn_navi_08_n.png";

import QnaIconN from "./btn_navi_09_n.png";
import QnaIconP from "./btn_navi_09_n.png";

import ArrowpIconN from "./btn_arrow_p_n.png";
import ArrowpIconP from "./btn_arrow_p_p.png";

const icons = {
    alimi: [AlimiN, AlimiP],
    alarm: [AlarmN, AlarmP],
    user: [UserIconN, UserIconP],
    team: [TeamIconN, TeamIconP],
    member: [MembersIconN, MembersIconP],
    subscribe: [SubscribeIconN, SubscribeIconP],
    fee: [FeeIconN, FeeIconP],
    bill: [BillIconN, BillIconP],
    notice: [NoticeIconN, NoticeIconP],
    qna: [QnaIconN, QnaIconP],
    arrow: [ArrowpIconN, ArrowpIconP],
};

export const Icon = (props) => {
    const { $p, name, size, onClick, style } = props;

    return icons[name] && <img onClick={onClick} style={style} src={$p ? icons[name][1] : icons[name][0]} width={size} height={size} />;
};
