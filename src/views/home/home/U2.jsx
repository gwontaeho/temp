import { Typography, Stack, Divider, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NoMaxWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: "none",
    },
});

export const U2 = () => {
    const navigate = useNavigate();
    return (
        <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">U2알리미</Typography>
                <Stack direction="row" alignItems="center">
                    <Typography variant="body2" fontWeight="bold">
                        U2알리미 실행
                    </Typography>
                    <IconButton onClick={() => navigate("/subscribe/fee")}>
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <Divider />
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography variant="body2" fontWeight="bold">
                            6월 발송현황
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Stack width={10} height={10} bgcolor="#35c3dd" borderRadius="50%" />
                            <Typography variant="caption">대기</Typography>
                            <Stack width={10} height={10} bgcolor="#3680e0" borderRadius="50%" />
                            <Typography variant="caption">완료</Typography>
                            <Stack width={10} height={10} bgcolor="#e6713f" borderRadius="50%" />
                            <Typography variant="caption">실패</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="caption">2022.12.12 ~ 2022.12.12</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="body2" fontWeight="bold">
                        &#183; 당월
                    </Typography>
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
                        <Stack height={40} direction="row" flex={1}>
                            {[
                                { v: 6, bgcolor: "#35c3dd" },
                                { v: 3, bgcolor: "#3680e0" },
                                { v: 1, bgcolor: "#e6713f" },
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
                    <Typography variant="body2" fontWeight="bold">
                        100명
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="body2" fontWeight="bold">
                        &#183; 오늘
                    </Typography>
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
                        <Stack height={40} direction="row" flex={1}>
                            {[
                                { v: 1, bgcolor: "#35c3dd" },
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
                    <Typography variant="body2" fontWeight="bold">
                        100명
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
