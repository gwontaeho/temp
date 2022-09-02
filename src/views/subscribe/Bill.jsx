import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

import { Payment, History } from "./bill/";
import { ViewTitle } from "../../components/";

export const Bill = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="bill" title="청구서" />
            </Stack>
            <Stack spacing={5}>
                <Payment />
                <History />
            </Stack>
        </Stack>
    );
};
