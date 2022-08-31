import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

import { Payment, History } from "./bill/";

export const Bill = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="_title">청구서</Typography>
            </Stack>
            <Stack spacing={5}>
                <Payment />
                <History />
            </Stack>
        </Stack>
    );
};
