import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Select, Chip, Grid, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";

import { Plan, Payment, Service } from "./subscribeList/";

export const SubscribeList = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="_title">구독현황</Typography>
            </Stack>
            <Stack spacing={5}>
                <Plan />
                <Payment />
                <Service />
            </Stack>
        </Stack>
    );
};
