import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Grid } from "@mui/material";

export const Plan = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Typography fontWeight="bold">구독중인 요금제</Typography>
            <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                <Typography>서비스를 구독해주세요.</Typography>
                <Button variant="contained" size="small" onClick={() => navigate("/subscribe/list/create")}>
                    구독신청
                </Button>
            </Stack>
            <Stack>
                <Grid container spacing={3}>
                    {[0, 1].map((v) => {
                        return (
                            <Grid item xs={6} key={v}>
                                <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                                    <Typography>U2알리미</Typography>
                                    <Typography>매월 정기 결제 중</Typography>
                                    <Stack spacing={1}>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                이용기간
                                            </Typography>
                                            <Typography variant="body2">2022.01.05 ~ 2022.02.05</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                결제 예정일
                                            </Typography>
                                            <Typography variant="body2">2022.01.05</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                구독금액
                                            </Typography>
                                            <Typography variant="body2">5,000원</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={3} justifyContent="center">
                                        <Button variant="contained" color="_gray" size="small">
                                            구독 해지
                                        </Button>
                                        <Button variant="contained" size="small">
                                            구독 변경
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
            </Stack>
        </Stack>
    );
};
