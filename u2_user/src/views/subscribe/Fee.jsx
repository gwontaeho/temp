import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

import { ViewTitle } from "../../components/";
import { Sent, Usage, Usage2 } from "./fee/";

export const Fee = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="fee" title="실시간 이용요금" />
            </Stack>
            <Stack spacing={5}>
                <Usage />
                <Usage2 />
                <Sent />
            </Stack>
        </Stack>
    );
};
