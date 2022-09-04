import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Dialog } from "@mui/material";
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

const initialState = { team: "", name: "", num: "", prePhone: "02", phone: "", address: "", detailAddress: "", code: "", care: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setTeam": {
            return { ...state, team: payload };
        }
        case "setName": {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            if (regex.test(payload) || !payload) return { ...state, name: payload };
            return { ...state };
        }
        case "setNum": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, num: payload };
            return { ...state };
        }
        case "setPhone": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, phone: payload };
            return { ...state };
        }
        case "setPrePhone": {
            return { ...state, prePhone: payload };
        }
        case "setAddress": {
            const { address, code } = payload;
            return { ...state, address, code };
        }
        case "setDetailAddress": {
            return { ...state, detailAddress: payload };
        }
        case "setCare": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, care: payload };
            return { ...state };
        }
    }
};

export const TeamCreate = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { team, name, num, prePhone, phone, address, detailAddress, code, care } = state;

    const handleClickSubmit = useCallback(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="team" title="기관 관리" />
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
                                <TextField fullWidth value={team} onChange={(e) => dispatch({ type: "setTeam", payload: e.target.value })} />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    사업자등록번호
                                </Typography>
                                <Stack direction="row" spacing={3} alignItems="center" flex={1}>
                                    <Stack flex={1}>
                                        <TextField
                                            inputProps={{ maxLength: 10 }}
                                            fullWidth
                                            value={num}
                                            onChange={(e) => dispatch({ type: "setNum", payload: e.target.value })}
                                        />
                                    </Stack>
                                    <Button color="_gray">중복확인</Button>
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표자명
                                </Typography>
                                <TextField fullWidth value={name} onChange={(e) => dispatch({ type: "setName", payload: e.target.value })} />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표번호
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                    <TextField fullWidth value={phone} onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })} />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                    주소
                                </Typography>
                                <Stack height="100%" justifyContent="space-around" flex={1}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <TextField fullWidth value={code} inputProps={{ readOnly: true }} />
                                        <Button color="_gray" onClick={() => setOpen(true)}>
                                            검색
                                        </Button>
                                    </Stack>
                                    <TextField fullWidth value={address} inputProps={{ readOnly: true }} />
                                    <TextField
                                        fullWidth
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
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                            <Button color="_gray" onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button onClick={handleClickSubmit}>등록</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Address open={open} setOpen={setOpen} dispatch={dispatch} />
        </>
    );
};
