import { Typography, Stack, Divider, Button } from "@mui/material";

export const U2 = () => {
    return (
        <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">U2알리미</Typography>
                <Button variant="contained" size="small">
                    U2알리미 실행
                </Button>
            </Stack>
            <Divider />
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography variant="body2">6월 발송현황</Typography>
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
                    <Typography variant="body2">당월</Typography>
                    <Stack height={40} direction="row" flex={1}>
                        {[
                            { v: 6, bgcolor: "#35c3dd" },
                            { v: 2, bgcolor: "#3680e0" },
                            { v: 2, bgcolor: "#e6713f" },
                        ].map((v) => {
                            return (
                                <Stack key={v.v} bgcolor={v.bgcolor} direction="row" flex={v.v / 10} alignItems="center" justifyContent="center" spacing={1}>
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
                    <Typography variant="body2" fontWeight="bold">
                        100명
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="body2">오늘</Typography>
                    <Stack height={40} direction="row" flex={1}>
                        {[
                            { v: 3, bgcolor: "#35c3dd" },
                            { v: 4, bgcolor: "#3680e0" },
                            { v: 3, bgcolor: "#e6713f" },
                        ].map((v) => {
                            return (
                                <Stack key={v.v} bgcolor={v.bgcolor} direction="row" flex={v.v / 10} alignItems="center" justifyContent="center" spacing={1}>
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
                    <Typography variant="body2" fontWeight="bold">
                        100명
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
