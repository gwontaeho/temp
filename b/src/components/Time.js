import dayjs from "dayjs";

export const Time = ({ time, className }) => {
    const dayjsT = dayjs(time);
    const diff = dayjs().diff(dayjsT, "d");

    const text = () => {
        if (diff === 0) {
            const diff_h = dayjs().diff(dayjsT, "h");
            if (diff_h === 0) {
                const diff_m = dayjs().diff(dayjsT, "m");
                return `${diff_m}분 전`;
            }
            return `${diff_h}시간 전`;
        }
        return `${diff}일 전`;
    };

    const t = diff <= 7 ? `${diff}일 전` : dayjsT.format("YYYY. MM. DD");

    return <p className={className}>{text()}</p>;
};
