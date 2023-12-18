import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Stack, TextField, Typography, Select, MenuItem, Button, IconButton, FormControl, InputLabel } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { hasCookie } from "cookies-next";

import { getContries, getOrganizations, getRoles, signup, duplicateCheck } from "@/apis";

const initialState = {
    countryId: "",
    organizationId: "",
    roleId: "",
    manager: {
        name: "",
        tel: "",
        loginId: "",
        password: "",
        reEnterPassword: "",
    },
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setCountry":
            return { ...state, countryId: payload, organizationId: "", roleId: "" };
        case "setOrganization":
            return { ...state, organizationId: payload, roleId: "" };
        case "setRoleId":
            return { ...state, roleId: payload };
        case "setName":
            return { ...state, manager: { ...state.manager, name: payload } };
        case "setTel": {
            const replaced = payload.replaceAll("-", "");
            if (isNaN(replaced)) return state;
            const newTel = replaced.split("");
            if (newTel.length > 3) newTel.splice(3, 0, "-");
            if (newTel.length > 8) newTel.splice(8, 0, "-");
            return { ...state, manager: { ...state.manager, tel: newTel.join("") } };
        }
        case "setLoginId":
            return { ...state, manager: { ...state.manager, loginId: payload } };
        case "setPassword":
            return { ...state, manager: { ...state.manager, password: payload } };
        case "setReEnterPassword":
            return { ...state, manager: { ...state.manager, reEnterPassword: payload } };
    }
};

export default function Signup() {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { countryId, organizationId, roleId, manager } = state;
    const { name, tel, loginId, password, reEnterPassword } = manager;

    const [duplicate, setDuplicate] = useState(null);
    const [validation, setValidation] = useState({ name: false, id: false, pw: false, rePw: false, tel: false });

    const idReg = /^[a-zA-Z0-9]{5,20}$/;
    const pwReg = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    const textFieldError = {
        name: validation.name && name.length < 2,
        id: validation.id && !idReg.test(loginId),
        pw: validation.pw && !pwReg.test(password),
        rePw: validation.rePw && password !== reEnterPassword,
        tel: validation.tel && tel.length !== 13,
    };

    const helperText = {
        id: textFieldError.id
            ? "올바른 아이디 형식이 아닙니다"
            : duplicate
            ? "이미 사용중인 아이디입니다"
            : "5글자 이상 20글자 이하인 영문과 숫자를 사용한 아이디를 입력하세요",
        pw: textFieldError.pw ? "올바른 비밀번호 형식이 아닙니다" : "8글자 이상 20글자 이하인 영문, 숫자, 특수문자를 포함한 비밀번호를 입력하세요",
        rePw: textFieldError.rePw && "비밀번호를 일치하게 입력해주세요",
        tel: textFieldError.tel && "올바른 전화번호 형식이 아닙니다",
    };

    const { mutate } = useMutation({
        mutationFn: () => signup(state),
        onSuccess: () => router.replace("/signin"),
        onError: (error) => console.log(error),
    });

    const { mutate: dMutate } = useMutation({
        mutationFn: () => duplicateCheck(loginId),
        onSuccess: (data) => setDuplicate(data.response),
    });

    const { data: cData } = useQuery({
        queryKey: ["contries"],
        queryFn: getContries,
    });

    const { data: oData } = useQuery({
        queryKey: ["organizations", countryId],
        queryFn: () => getOrganizations(countryId),
        enabled: !!countryId,
    });

    const { data: rData } = useQuery({
        queryKey: ["roles", organizationId],
        queryFn: () => getRoles(organizationId),
        enabled: !!organizationId,
    });

    const countries = cData?.response || [];
    const organizations = oData?.response || [];
    const roles = rData?.response || [];

    const validationCheck = (type) => {
        const manager = { name, id: loginId, pw: password, rePw: reEnterPassword, tel };
        const isExist = !!manager[type];
        setValidation((prev) => ({ ...prev, [type]: isExist }));
    };

    const handleClickSignup = () => {
        if (!check()) return;
        mutate();
    };

    const check = () => {
        // 아이디 중복 체크 여부
        const dCheck = duplicate !== null && !duplicate;
        // 유효성 검사 됐는지 여부
        const vCheck = Object.values(validation).every((v) => v === true);
        // 유효성 검사 후 에러가 없는지 여부
        const eCheck = Object.values(textFieldError).every((v) => v === false);
        // 나라, 기관, 직책이 선택됐는지 여부
        const sCheck = !!countryId && !!organizationId && !!roleId;

        return dCheck && vCheck && eCheck && sCheck;
    };

    const styles = {
        label: {
            width: 80,
            height: 40,
            lineHeight: "40px",
        },
    };

    return (
        <Stack minWidth={1920} minHeight={1074} width="100vw" height="100vh" alignItems="center" justifyContent="center" bgcolor="spirokit.bg">
            <Stack
                border="1px solid"
                borderColor="spirokit.border"
                borderRadius={1.5}
                px={5}
                py={3}
                width={640}
                bgcolor="#fff"
                boxShadow="0px 3px 6px #0000001A"
            >
                <Stack direction="row" alignItems="center" justifyContent="center" position="relative" mb={5}>
                    <IconButton sx={{ position: "absolute", left: 0 }} color="primary" size="large" onClick={() => router.push("/signin")}>
                        <ChevronLeftIcon fontSize="inherit" />
                    </IconButton>
                    <Typography color="primary" variant="h6">
                        회원가입
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <Stack>
                        <Stack direction="row">
                            <Typography {...styles.label}>이름</Typography>
                            <TextField
                                label="이름"
                                onBlur={() => validationCheck("name")}
                                error={textFieldError.name}
                                helperText="이름을 입력하세요"
                                sx={{ flex: 1 }}
                                inputProps={{ maxLength: 10 }}
                                value={name}
                                onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack direction="row">
                            <Typography {...styles.label}>아이디</Typography>
                            <TextField
                                label="아이디"
                                error={textFieldError.id || duplicate}
                                helperText={helperText.id}
                                onBlur={() => {
                                    validationCheck("id");
                                    dMutate();
                                }}
                                sx={{ flex: 1 }}
                                inputProps={{ maxLength: 20 }}
                                value={loginId}
                                onChange={(e) => {
                                    setDuplicate(null);
                                    dispatch({ type: "setLoginId", payload: e.target.value });
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Typography {...styles.label}>비밀번호</Typography>
                        <TextField
                            label="비밀번호"
                            type="password"
                            error={textFieldError.pw}
                            onBlur={() => validationCheck("pw")}
                            helperText={helperText.pw}
                            sx={{ flex: 1 }}
                            value={password}
                            inputProps={{ maxLength: 20 }}
                            onChange={(e) => dispatch({ type: "setPassword", payload: e.target.value })}
                        />
                    </Stack>
                    <Stack direction="row">
                        <TextField
                            label="비밀번호 확인"
                            type="password"
                            error={textFieldError.rePw}
                            helperText={helperText.rePw}
                            onBlur={() => validationCheck("rePw")}
                            sx={{ flex: 1, ml: "80px" }}
                            value={reEnterPassword}
                            inputProps={{ maxLength: 20 }}
                            onChange={(e) => dispatch({ type: "setReEnterPassword", payload: e.target.value })}
                        />
                    </Stack>
                    <Stack direction="row">
                        <Typography {...styles.label}>전화번호</Typography>
                        <TextField
                            label="전화번호"
                            onBlur={() => validationCheck("tel")}
                            error={textFieldError.tel}
                            helperText={helperText.tel}
                            inputProps={{ maxLength: 13 }}
                            sx={{ flex: 1 }}
                            value={tel}
                            onChange={(e) => dispatch({ type: "setTel", payload: e.target.value })}
                        />
                    </Stack>
                    <Stack direction="row">
                        <Typography {...styles.label}>나라</Typography>
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel size="small">나라 선택</InputLabel>
                            <Select label="나라 선택" value={countryId} onChange={(e) => dispatch({ type: "setCountry", payload: e.target.value })}>
                                {countries.map(({ id, name }) => {
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row">
                        <Typography {...styles.label}>기관</Typography>
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel size="small">기관 선택</InputLabel>
                            <Select
                                label="기관 선택"
                                sx={{ flex: 1 }}
                                disabled={!countryId}
                                value={organizationId}
                                onChange={(e) => dispatch({ type: "setOrganization", payload: e.target.value })}
                            >
                                {organizations.map(({ id, name }) => {
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row">
                        <Typography {...styles.label}>직책</Typography>

                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel size="small">직책 선택</InputLabel>
                            <Select
                                label="직책 선택"
                                sx={{ flex: 1 }}
                                disabled={!organizationId}
                                value={roleId}
                                onChange={(e) => dispatch({ type: "setRoleId", payload: e.target.value })}
                            >
                                {roles.map(({ id, name }) => {
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
                <Button disabled={!check()} sx={{ mt: 10 }} onClick={handleClickSignup}>
                    회원가입
                </Button>
            </Stack>
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const accessToken = hasCookie("accessToken", { req, res });

    if (accessToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
