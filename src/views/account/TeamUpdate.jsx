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

export default function TeamUpdate() {
    const navigate = useNavigate();

    const [openAddress, setOpenAddress] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);

    const [address, setAddress] = useState({ code: "code", full: "full", detail: "detail" });

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center">
                    <Typography variant="h2">
                        {SubscriptionIcon()}
                        <label style={{ marginLeft: "0.8rem" }}>기관정보</label>
                    </Typography>
                </Stack>
                <MainCard>
                    <Stack direction="row" maxWidth={600}>
                        <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>기관명</Typography>
                            <Typography>사업자등록번호</Typography>
                            <Typography>대표자 이름</Typography>
                            <Typography>대표번호</Typography>
                            <Typography height={200} alignItems="flex-start" mt={0.7}>
                                주소
                            </Typography>
                            <Typography>요양기관번호</Typography>
                        </Stack>
                        <Stack flex={1} sx={{ "& > *": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>유투바이오</Typography>
                            <Typography>123-45-789-10</Typography>
                            <Stack alignItems="flex-start">
                                <TextField variant="standard" fullWidth />
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Select variant="standard"></Select>
                                <Typography>-</Typography>
                                <TextField fullWidth variant="standard" />
                            </Stack>

                            <Stack spacing={3} alignItems="flex-start" minHeight={200}>
                                <Stack direction="row" spacing={3} alignItems="center" width="100%">
                                    <Stack flex={1}>
                                        <TextField variant="standard" fullWidth value={address.code} InputProps={{ readOnly: true }} />
                                    </Stack>
                                    <Button color="primary" onClick={() => setOpenAddress(true)}>
                                        주소 검색
                                    </Button>
                                </Stack>
                                <TextField fullWidth variant="standard" value={address.full} InputProps={{ readOnly: true }} />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    value={address.detail}
                                    onChange={(e) => setAddress((prev) => ({ ...prev, detail: e.target.value }))}
                                />
                            </Stack>
                            <Stack alignItems="flex-start">
                                <TextField fullWidth variant="standard" />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={3}>
                        <Button onClick={() => navigate("/account/team", { replace: true })}>취소</Button>
                        <Button color="primary">저장</Button>
                    </Stack>
                </MainCard>
            </Stack>

            <DialogAddress open={openAddress} setOpen={setOpenAddress} setAddress={setAddress} />
            <DialogAuth open={openAuth} setOpen={setOpenAuth} />
        </>
    );
}
