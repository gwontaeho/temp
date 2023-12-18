import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getExaminee } from "@/apis";

export const Examinee = () => {
    const main = useSelector((state) => state.main);
    const examineeId = main?.examineeId;

    const { data } = useQuery({
        queryKey: ["examinee", examineeId],
        queryFn: () => getExaminee(examineeId),
        enabled: !!examineeId,
    });

    const { name, birthday, gender, inform = {}, smoke = {} } = data?.response || {};
    const genderText = gender === "MALE" ? "남" : "여";

    const styles = {
        card: {
            border: "0.5px solid",
            p: 1.5,
            borderRadius: 1.5,
            borderColor: "primary.main",
            boxShadow: "0px 3px 6px #0000001A",
            height: 400,
        },
    };

    if (!data)
        return (
            <Stack spacing={1.5}>
                <Typography variant="subtitle2">환자 정보</Typography>
                <Stack {...styles.card} alignItems="center" justifyContent="center">
                    <Typography variant="body2">환자를 먼저 검색해주세요</Typography>
                </Stack>
            </Stack>
        );

    return (
        <Stack spacing={1.5}>
            <Typography variant="subtitle2">환자 정보</Typography>
            <Stack {...styles.card} justifyContent="space-between">
                <Stack>
                    <Typography variant="caption">이름</Typography>
                    <Typography>{name}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">성별</Typography>
                    <Typography>{genderText}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">몸무게</Typography>
                    <Typography>{inform.weight}kg</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">생년월일</Typography>
                    <Typography>{birthday}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">연간 흡연량(갑)</Typography>
                    <Typography>{smoke.packYear ? `${smoke.packYear}` : "-"}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">흡연 여부</Typography>
                    <Typography>{smoke.smoking ? "흡연" : "비흡연"}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">흡연 기간</Typography>
                    <Typography>{smoke.period ? `${smoke.period}년` : "-"}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
