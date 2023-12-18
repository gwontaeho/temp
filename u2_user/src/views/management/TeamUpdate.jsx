import { useState, useReducer, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Select, MenuItem, Dialog } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import { ViewTitle } from "../../components/";

const Address = ({ open, setOpen, dispatch }) => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        dispatch({ type: "setAddress", payload: { address: fullAddress, code: data.zonecode } });
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DaumPostcodeEmbed onComplete={handleComplete} />
        </Dialog>
    );
};

const initialState = { name: "", nameError: "", phone: "", phoneError: "", address: "", addressError: "", detailAddress: "", code: "", care: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setName": {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            if (regex.test(payload) || !payload) return { ...state, name: payload, nameError: "" };
            return { ...state };
        }
        case "setNameError": {
            const name = state.name;
            if (!name) return { ...state, nameError: "대표자 이름을 입력해주세요" };
            return { ...state, nameError: "" };
        }
        case "setPhone": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, phone: payload, phoneError: "" };
            return { ...state };
        }
        case "setPhoneError": {
            const phone = state.phone;
            if (!phone) return { ...state, phoneError: "대표 번호를 입력해주세요" };
            return { ...state, phoneError: "" };
        }
        case "setAddress": {
            const { address, code } = payload;
            return { ...state, address, code, addressError: "" };
        }
        case "setAddressError": {
            const code = state.code;
            if (!code) return { ...state, addressError: "기관 주소를 입력해주세요" };
            return { ...state, addressError: "" };
        }
        case "setDetailAddress": {
            return { ...state, detailAddress: payload };
        }
        case "setCare": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, care: payload };
            return { ...state };
        }
        case "setAllErrors": {
            const { phone, name, code } = state;
            const errors = {
                nameError: !name ? "대표자 이름을 입력해주세요" : "",
                phoneError: !phone ? "대표 번호를 입력해주세요" : "",
                addressError: !code ? "기관 주소를 입력해주세요" : "",
            };
            return { ...state, ...errors };
        }
    }
};

export const TeamUpdate = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const refs = useRef([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, phone, nameError, phoneError, addressError, address, detailAddress, code, care } = state;

    const handleClickSubmit = useCallback(() => {
        if (!phone) refs.current[1].focus();
        if (!name) refs.current[0].focus();
        if (!name || !phone || !code) return dispatch({ type: "setAllErrors" });
        navigate("/management/team");
    }, [state, refs]);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="team" title="기관 정보" />
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                    <Stack maxWidth="sm" spacing={3}>
                        <Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography
                                    fontWeight="bold"
                                    minWidth={150}
                                    px={2}
                                    py={3}
                                    bgcolor="#f2f3f7"
                                    sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                                >
                                    기관명
                                </Typography>
                                <Typography>U2cloud@U2check.com</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    사업자등록번호
                                </Typography>
                                <Typography>홍길동</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표자명
                                </Typography>
                                <TextField
                                    inputRef={(el) => (refs.current[0] = el)}
                                    onBlur={(e) => dispatch({ type: "setNameError", payload: e })}
                                    error={!!nameError}
                                    helperText={nameError}
                                    fullWidth
                                    value={name}
                                    onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                                />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표번호
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                    <TextField
                                        inputRef={(el) => (refs.current[1] = el)}
                                        onBlur={(e) => dispatch({ type: "setPhoneError", payload: e })}
                                        error={!!phoneError}
                                        helperText={phoneError}
                                        fullWidth
                                        value={phone}
                                        onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} height={200} bgcolor="#f2f3f7">
                                    주소
                                </Typography>
                                <Stack height="100%" justifyContent="space-around" flex={1}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <TextField error={!!addressError} helperText={addressError} fullWidth value={code} inputProps={{ readOnly: true }} />
                                        <Button color="_gray" onClick={() => setOpen(true)}>
                                            검색
                                        </Button>
                                    </Stack>
                                    <TextField error={!!addressError} fullWidth value={address} inputProps={{ readOnly: true }} />
                                    <TextField
                                        fullWidth
                                        error={!!addressError}
                                        value={detailAddress}
                                        onChange={(e) => dispatch({ type: "setDetailAddress", payload: e.target.value })}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    요양기관번호
                                </Typography>
                                <TextField fullWidth value={care} onChange={(e) => dispatch({ type: "setCare", payload: e.target.value })} />
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={3} justifyContent="flex-end">
                            <Button color="_gray" onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button onClick={handleClickSubmit}>저장</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Address open={open} setOpen={setOpen} dispatch={dispatch} />
        </>
    );
};
