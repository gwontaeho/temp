import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const NoMaxWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: "none",
    },
});

export const Sent = () => {
    return (
        <Stack spacing={3}>
            <Typography fontWeight="bold">발송현황</Typography>
            <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                <Stack height={40}>
                    <NoMaxWidthTooltip
                        followCursor
                        arrow
                        title={
                            <Stack p={3} spacing={3}>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2">2020.22.22</Typography>
                                    <Typography variant="body2">총 100 건</Typography>
                                </Stack>
                                <Stack direction="row" spacing={3}>
                                    <Typography variant="body2">대기 0</Typography>
                                    <Typography variant="body2">완료 50% | 150 건</Typography>
                                    <Typography variant="body2">실패 10% | 0 건</Typography>
                                </Stack>
                            </Stack>
                        }
                    >
                        <Stack direction="row" flex={1}>
                            {[
                                { v: 3, bgcolor: "#35c3dd" },
                                { v: 4, bgcolor: "#3680e0" },
                                { v: 5, bgcolor: "#e6713f" },
                            ].map((v) => {
                                return (
                                    <Stack
                                        key={v.v}
                                        bgcolor={v.bgcolor}
                                        direction="row"
                                        flex={v.v / 10}
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={1}
                                    >
                                        <Typography color="#fff" variant="body2" fontWeight="bold">
                                            {v.v}0%
                                        </Typography>
                                        <Typography color="#fff" variant="body2">
                                            |
                                        </Typography>
                                        <Typography color="#fff" variant="caption">
                                            150
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </NoMaxWidthTooltip>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={5}>
                        <Typography fontWeight="bold">발송완료</Typography>
                        <Typography flex={1}>70% | 100,500 건</Typography>
                        <Typography fontWeight="bold">이용금액</Typography>
                        <Typography>130,000 원</Typography>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                        <Typography fontWeight="bold">발송대기</Typography>
                        <Typography flex={1}>20% | 100,500 건</Typography>
                        <Typography fontWeight="bold">이용예정금액</Typography>
                        <Typography>약 130,000 원</Typography>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                        <Typography fontWeight="bold">발송실패</Typography>
                        <Typography>10% | 100,500 건</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
