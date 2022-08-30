import { useNavigate } from "react-router-dom";

import { Typography, Stack } from "@mui/material";

import { U2 } from "./U2";
import { Fee } from "./Fee";
import { Notice } from "./Notice";
import { Qna } from "./Qna";
import { Notification } from "./Notification";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" height={60} spacing={1}>
                <Typography variant="subtitle1">홍길동</Typography>
                <Typography>님 반갑습니다</Typography>
            </Stack>
            <Stack spacing={3}>
                <U2 />
                <Fee />
                <Notice />
                <Qna />
                <Notification />
            </Stack>
        </Stack>
    );
};
