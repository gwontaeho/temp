import { useNavigate } from "react-router-dom";

import { Typography, Stack } from "@mui/material";

import { U2, Fee, Notice, Qna, Notification, NoService } from "./home/";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" height={60} spacing={1}>
                <Typography variant="_title">홍길동</Typography>
                <Typography>님 반갑습니다</Typography>
            </Stack>
            <Stack spacing={3}>
                <NoService />
                <U2 />
                <Fee />
                <Notice />
                <Qna />
                <Notification />
            </Stack>
        </Stack>
    );
};
