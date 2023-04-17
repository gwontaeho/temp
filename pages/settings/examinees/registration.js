import { useReducer, useState } from "react";
import { Stack, Button, Typography, TextField, Select, MenuItem, InputAdornment } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check as CheckIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { hasCookie } from "cookies-next";

import { Header, Footer, Dialog, Snackbar } from "@/components/common";
import { Nav } from "@/components/settings";
import { createExaminee, getManagers } from "@/apis";

const initialState = {
    managerId: "",
    chartNumber: "",
    name: "",
    birthday: "",
    gender: "",
    info: {
        height: "",
        weight: "",
    },
    smoke: {
        startAge: "",
        stopAge: "",
        amountDay: "",
        experience: null,
        smoking: false,
    },
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setChartNumber": {
            const reg = /^[a-zA-Z0-9]*$/;
            if (!reg.test(payload)) return state;
            return { ...state, chartNumber: payload };
        }
        case "setManagerId":
            return { ...state, managerId: payload };
        case "setName":
            return { ...state, name: payload };
        case "setGender":
            return { ...state, gender: payload };
        case "setBirthday": {
            const replaced = payload.replaceAll("-", "");
            if (isNaN(replaced)) return state;
            const newBirthday = replaced.split("");
            if (newBirthday.length > 4) newBirthday.splice(4, 0, "-");
            if (newBirthday.length > 7) newBirthday.splice(7, 0, "-");
            return { ...state, birthday: newBirthday.join("") };
        }
        case "setHeight":
            if (isNaN(payload)) return state;
            return { ...state, info: { ...state.info, height: payload } };
        case "setWeight":
            if (isNaN(payload)) return state;
            return { ...state, info: { ...state.info, weight: payload } };
        case "setStartAge":
            if (isNaN(payload)) return state;
            return { ...state, smoke: { ...state.smoke, startAge: payload } };
        case "setStopAge":
            if (isNaN(payload)) return state;
            return { ...state, smoke: { ...state.smoke, stopAge: payload } };
        case "setAmountDay": {
            const reg = /^[0-9.]+$/;
            if ((payload.length !== 0 && !reg.test(payload)) || payload.split(".").length > 2) return state;
            let newAmoutday = payload;
            if (payload === ".") newAmoutday = "0.";
            return { ...state, smoke: { ...state.smoke, amountDay: newAmoutday } };
        }
        case "setAmountDayFormat": {
            if (payload.slice(-1) === ".") return { ...state, smoke: { ...state.smoke, amountDay: payload.slice(0, -1) } };
            return state;
        }
        case "setExperience": {
            if (payload) return { ...state, smoke: { ...state.smoke, experience: payload, smoking: payload } };
            return { ...state, smoke: { ...initialState.smoke, experience: payload } };
        }
        case "setSmoking": {
            return { ...state, smoke: { ...state.smoke, smoking: payload, ...(payload && { stopAge: "" }) } };
        }
    }
};

const Main = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { managerId, chartNumber, name, birthday, gender, info, smoke } = state;
    const { height, weight } = info;
    const { startAge, stopAge, amountDay, smoking, experience } = smoke;

    const [open, setOpen] = useState(false);

    const getButtonDisabled = () => {
        if (experience === null) return true;
        if (experience && (!startAge || !amountDay)) return true;
        if (experience && smoking === false && !stopAge) return true;
        const status = !managerId || !chartNumber || !name || !height || !weight || !birthday || birthday.length !== 10;
        return status;
    };

    const { data } = useQuery({
        queryKey: ["managers", "all"],
        queryFn: () => getManagers({ name: "" }),
    });

    const managers = data?.response || [];

    const { mutate, isError } = useMutation({
        mutationFn: () => createExaminee(state),
        onSuccess: () => router.replace("/settings/examinees"),
        onError: (error) => {
            setOpen(false);
        },
    });

    const styles = {
        item: {
            direction: "row",
            alignItems: "center",
        },
        label: {
            width: 160,
        },
        card: {
            bgcolor: "#fff",
            p: 5,
            borderRadius: 1.5,
            spacing: 5,
            boxShadow: "0px 3px 6px #0000001A",
            border: "1px solid",
            borderColor: "spirokit.border",
            flex: 1,
        },
    };

    return (
        <>
            <Stack component="main" bgcolor="spirokit.bg" p={3} spacing={1.5}>
                <Typography color="primary" variant="h6">
                    수검자 등록
                </Typography>

                <Stack {...styles.card}>
                    <Stack {...styles.card} direction="row">
                        <Stack direction="row" alignItems="center" flex={1}>
                            <Typography {...styles.label} color="primary">
                                차트넘버
                            </Typography>
                            <TextField
                                sx={{ flex: 1 }}
                                inputProps={{ style: { textAlign: "center" } }}
                                value={chartNumber}
                                onChange={(e) => dispatch({ type: "setChartNumber", payload: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" flex={1}>
                            <Typography {...styles.label} color="primary">
                                담당자 선택
                            </Typography>
                            <Select
                                value={managerId}
                                sx={{ flex: 1, textAlign: "center" }}
                                onChange={(e) => dispatch({ type: "setManagerId", payload: e.target.value })}
                            >
                                {managers.map(({ id, name }) => {
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                        <Stack {...styles.card}>
                            <Typography color="primary">기본 정보</Typography>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>이름</Typography>
                                <TextField
                                    inputProps={{ style: { textAlign: "center" } }}
                                    sx={{ flex: 1 }}
                                    value={name}
                                    onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                                />
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>성별</Typography>
                                <Stack direction="row" flex={1} spacing={3}>
                                    <Button
                                        color={gender === "MALE" ? "primary" : "secondary"}
                                        startIcon={gender === "MALE" && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setGender", payload: "MALE" })}
                                    >
                                        남
                                    </Button>
                                    <Button
                                        color={gender === "FEMALE" ? "primary" : "secondary"}
                                        startIcon={gender === "FEMALE" && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setGender", payload: "FEMALE" })}
                                    >
                                        여
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>신장</Typography>
                                <TextField
                                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                                    sx={{ flex: 1 }}
                                    value={height}
                                    onChange={(e) => dispatch({ type: "setHeight", payload: e.target.value })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ position: "absolute", right: 0 }}>
                                                <Typography color="primary" sx={{ borderLeft: "1px solid", pl: 1, width: 40 }}>
                                                    cm
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>몸무게</Typography>
                                <TextField
                                    sx={{ flex: 1 }}
                                    value={weight}
                                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ position: "absolute", right: 0 }}>
                                                <Typography color="primary" sx={{ borderLeft: "1px solid", pl: 1, width: 40 }}>
                                                    kg
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => dispatch({ type: "setWeight", payload: e.target.value })}
                                />
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>생년월일</Typography>
                                <TextField
                                    sx={{ flex: 1 }}
                                    value={birthday}
                                    inputProps={{ maxLength: 10, style: { textAlign: "center" } }}
                                    onChange={(e) => dispatch({ type: "setBirthday", payload: e.target.value })}
                                />
                            </Stack>
                        </Stack>

                        <Stack {...styles.card}>
                            <Typography color="primary">추가 정보</Typography>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>흡연경험</Typography>
                                <Stack direction="row" flex={1} spacing={3}>
                                    <Button
                                        color={experience !== null && experience ? "primary" : "secondary"}
                                        startIcon={experience !== null && experience && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setExperience", payload: true })}
                                    >
                                        있음
                                    </Button>
                                    <Button
                                        color={experience !== null && !experience ? "primary" : "secondary"}
                                        startIcon={experience !== null && !experience && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setExperience", payload: false })}
                                    >
                                        없음
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>현재 흡연 여부</Typography>
                                <Stack direction="row" flex={1} spacing={3}>
                                    <Button
                                        disabled={!experience}
                                        color={smoking ? "primary" : "secondary"}
                                        startIcon={smoking && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setSmoking", payload: true })}
                                    >
                                        흡연
                                    </Button>
                                    <Button
                                        disabled={!experience}
                                        color={!smoking ? "primary" : "secondary"}
                                        startIcon={experience && !smoking && <CheckIcon />}
                                        sx={{ flex: 1 }}
                                        onClick={() => dispatch({ type: "setSmoking", payload: false })}
                                    >
                                        금연
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>흡연 시작 나이</Typography>
                                <TextField
                                    disabled={!experience}
                                    sx={{ flex: 1 }}
                                    value={startAge}
                                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                                    onChange={(e) => dispatch({ type: "setStartAge", payload: e.target.value })}
                                />
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>하루 흡연량(갑)</Typography>
                                <TextField
                                    disabled={!experience}
                                    sx={{ flex: 1 }}
                                    value={amountDay}
                                    inputProps={{ maxLength: 4, style: { textAlign: "center" } }}
                                    onBlur={(e) => dispatch({ type: "setAmountDayFormat", payload: e.target.value })}
                                    onChange={(e) => dispatch({ type: "setAmountDay", payload: e.target.value })}
                                />
                            </Stack>
                            <Stack {...styles.item}>
                                <Typography {...styles.label}>금연한 나이</Typography>
                                <TextField
                                    disabled={!experience || smoking}
                                    sx={{ flex: 1 }}
                                    value={stopAge}
                                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                                    onChange={(e) => dispatch({ type: "setStopAge", payload: e.target.value })}
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Button onClick={() => setOpen(true)} disabled={getButtonDisabled()}>
                        등록
                    </Button>
                </Stack>
            </Stack>
            <Dialog open={open} setOpen={setOpen} content="환자를 등록하시겠습니까?" onConfirm={mutate} />
            <Snackbar status={isError} content="차트넘버가 중복되었습니다" />
        </>
    );
};

export default function Registration() {
    return (
        <Stack minHeight="100vh" minWidth={1920}>
            <Header />
            <Stack direction="row">
                <Nav />
                <Stack flex={1}>
                    <Main />
                    <Footer />
                </Stack>
            </Stack>
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const accessToken = hasCookie("accessToken", { req, res });

    if (!accessToken) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
