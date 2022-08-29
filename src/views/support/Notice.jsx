import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider } from "@mui/material";

export const Notice = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">공지사항</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                {[0, 1, 2].map((v, i) => {
                    return (
                        <Stack key={v} spacing={3} onClick={() => navigate("/support/notice/1")}>
                            <Stack direction="row" spacing={3}>
                                <Typography>업데이트</Typography>
                                <Typography flex={1}>제목</Typography>
                                <Typography>날짜</Typography>
                                <Typography>아이콘</Typography>
                            </Stack>
                            {i !== 2 && <Divider />}
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};
