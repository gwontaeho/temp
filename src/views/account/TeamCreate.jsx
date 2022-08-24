import { useState, useCallback } from "react";
import { Typography, Stack, Button, TextField, Select, MenuItem, Dialog, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DaumPostcodeEmbed from "react-daum-postcode";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

const DialogAddress = ({ open, setOpen, setAddress }) => {
    const handleComplete = useCallback((data) => {
        const code = data.zonecode;
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

        setAddress((prev) => ({ ...prev, full: fullAddress, code }));
        setOpen(false);
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
            <DaumPostcodeEmbed onComplete={handleComplete} />
        </Dialog>
    );
};

const DialogAuth = ({ open, setOpen }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // 연동 전 null, 후 true || false
    const [auth, setAuth] = useState(null);

    const handleClickLookup = useCallback(() => {
        // 연동 성공
        // setAuth(true)
        // 연동 실패
        // setAuth(false)
    }, [id, password]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
            <Stack p={3} spacing={5}>
                <Typography variant="h4">U2Check 회원 인증</Typography>
                <Stack>
                    <Stack direction="row" alignItems="center" p={3}>
                        <Typography width={150}>U2Check ID</Typography>
                        <TextField value={id} onChange={(e) => setId(e.target.value)} />
                    </Stack>
                    <Stack direction="row" alignItems="center" p={3}>
                        <Typography width={150}>U2Check 비밀번호</Typography>

                        <Stack position="relative">
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <TextField value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button color="primary" onClick={handleClickLookup}>
                                    연동 조회
                                </Button>
                            </Stack>
                            {auth !== null && (
                                <Typography color={auth ? "primary" : "red"} position="absolute" variant="caption" bottom={-30} left={0}>
                                    {auth ? "정상적으로 연동되었습니다." : "연동 실패"}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Button color="primary" sx={{ width: 120, alignSelf: "center" }}>
                    확인
                </Button>
            </Stack>
        </Dialog>
    );
};

const TeamCreate = () => {
    const [openAddress, setOpenAddress] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);

    const [address, setAddress] = useState({ code: "", full: "", detail: "" });

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center">
                    <Typography variant="h2">
                        {SubscriptionIcon()}
                        <label style={{ marginLeft: "0.8rem" }}>기관등록</label>
                    </Typography>
                </Stack>
                <MainCard>
                    <Stack spacing={5}>
                        <Stack spacing={5} maxWidth={600}>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>기관명</Typography>
                                <Stack flex={1}>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>사업자등록번호</Typography>
                                <Stack direction="row" spacing={3} flex={1}>
                                    <Stack flex={1}>
                                        <TextField fullWidth />
                                    </Stack>
                                    <Button color="primary">중복 확인</Button>
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>대표자 이름</Typography>
                                <Stack flex={1}>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>대표번호</Typography>
                                <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                                    <Select></Select>
                                    <Typography>-</Typography>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack direction="row">
                                <Typography width={200}>주소</Typography>
                                <Stack spacing={3} flex={1}>
                                    <Stack direction="row" spacing={3}>
                                        <Stack flex={1}>
                                            <TextField fullWidth value={address.code} InputProps={{ readOnly: true }} />
                                        </Stack>
                                        <Button color="primary" onClick={() => setOpenAddress(true)}>
                                            주소 검색
                                        </Button>
                                    </Stack>
                                    <TextField value={address.full} InputProps={{ readOnly: true }} />
                                    <TextField value={address.detail} onChange={(e) => setAddress((prev) => ({ ...prev, detail: e.target.value }))} />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>U2Check 연계</Typography>
                                <Button color="primary" onClick={() => setOpenAuth(true)}>
                                    U2Check 회원인증
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignSelf="center" spacing={5}>
                            <Button color="primary" sx={{ width: 200 }}>
                                발신번호 등록
                            </Button>
                            <Button color="primary" sx={{ width: 200 }}>
                                작성 완료
                            </Button>
                        </Stack>
                    </Stack>
                </MainCard>
            </Stack>

            <DialogAddress open={openAddress} setOpen={setOpenAddress} setAddress={setAddress} />
            <DialogAuth open={openAuth} setOpen={setOpenAuth} />
        </>
    );
};

export default TeamCreate;
