import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Select, Chip, Grid, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";

import { Plan } from "./Plan";
import { Payment } from "./Payment";
import { Service } from "./Service";

export const SubscribeList = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="subtitle1">구독현황</Typography>
            </Stack>
            <Stack spacing={5}>
                <Plan />
                <Payment />
                <Service />
            </Stack>
        </Stack>
    );
};
