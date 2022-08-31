import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Select, MenuItem, Dialog } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";

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

const prePhoneOptions = [
    "02",
    "031",
    "032",
    "033",
    "041",
    "042",
    "043",
    "044",
    "051",
    "052",
    "053",
    "054",
    "055",
    "061",
    "062",
    "063",
    "064",
    "010",
    "011",
    "016",
    "017",
    "018",
    "019",
    "0130",
    "070",
    "080",
    "0502",
    "0503",
    "0504",
    "0305",
    "0506",
    "0507",
    "0303",
    "050",
];

const initialState = { name: "", prePhone: "02", phone: "", address: "", detailAddress: "", code: "", care: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setName": {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            if (regex.test(payload) || !payload) return { ...state, name: payload };
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

export const TeamUpdate = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, prePhone, phone, address, detailAddress, code, care } = state;

    const handleClickSubmit = useCallback(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <Typography variant="_title">기관 관리</Typography>
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                    <Stack maxWidth="sm" spacing={3}>
                        <Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                    기관명
                                </Typography>
                                <Typography>U2cloud@U2check.com</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    사업자등록번호
                                </Typography>
                                <Typography>홍길동</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표자명
                                </Typography>
                                <TextField size="small" fullWidth value={name} onChange={(e) => dispatch({ type: "setName", payload: e.target.value })} />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표번호
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                    <Select size="small" value={prePhone} onChange={(e) => dispatch({ type: "setPrePhone", payload: e.target.value })}>
                                        {prePhoneOptions.map((v) => (
                                            <MenuItem key={v} value={v}>
                                                {v}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Typography>-</Typography>
                                    <TextField size="small" fullWidth value={phone} onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })} />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                    주소
                                </Typography>
                                <Stack height="100%" justifyContent="space-around" flex={1}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <TextField size="small" fullWidth value={code} inputProps={{ readOnly: true }} />
                                        <Button color="_gray" variant="contained" size="small" onClick={() => setOpen(true)}>
                                            검색
                                        </Button>
                                    </Stack>
                                    <TextField size="small" fullWidth value={address} inputProps={{ readOnly: true }} />
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={detailAddress}
                                        onChange={(e) => dispatch({ type: "setDetailAddress", payload: e.target.value })}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    요양기관번호
                                </Typography>
                                <TextField size="small" fullWidth value={care} onChange={(e) => dispatch({ type: "setCare", payload: e.target.value })} />
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={3} justifyContent="flex-end">
                            <Button variant="contained" size="small" onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button variant="contained" size="small" onClick={handleClickSubmit}>
                                저장
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Address open={open} setOpen={setOpen} dispatch={dispatch} />
        </>
    );
};
