import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { ViewTitle } from "../../components/";
import { Plan, Payment, Service } from "./subscribeList/";

export const SubscribeList = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="subscribe" title="구독 관리" />
            </Stack>
            <Stack spacing={5}>
                <Plan />
                <Payment />
                <Service />
            </Stack>
        </Stack>
    );
};
