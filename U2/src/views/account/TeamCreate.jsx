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

// const DialogAuth = ({ open, setOpen }) => {
//     const [id, setId] = useState("");
//     const [password, setPassword] = useState("");
//     // 연동 전 null, 후 true || false
//     const [auth, setAuth] = useState(null);

//     const handleClickLookup = useCallback(() => {
//         // 연동 성공
//         // setAuth(true)
//         // 연동 실패
//         // setAuth(false)
//     }, [id, password]);

//     return (
//         <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
//             <Stack p={3} spacing={5}>
//                 <Typography variant="h4">U2Check 회원 인증</Typography>
//                 <Stack>
//                     <Stack direction="row" alignItems="center" p={3}>
//                         <Typography width={150}>U2Check ID</Typography>
//                         <TextField value={id} onChange={(e) => setId(e.target.value)} />
//                     </Stack>
//                     <Stack direction="row" alignItems="center" p={3}>
//                         <Typography width={150}>U2Check 비밀번호</Typography>

//                         <Stack position="relative">
//                             <Stack direction="row" alignItems="center" spacing={3}>
//                                 <TextField value={password} onChange={(e) => setPassword(e.target.value)} />
//                                 <Button color="primary" onClick={handleClickLookup}>
//                                     연동 조회
//                                 </Button>
//                             </Stack>
//                             {auth !== null && (
//                                 <Typography color={auth ? "primary" : "red"} position="absolute" variant="caption" bottom={-30} left={0}>
//                                     {auth ? "정상적으로 연동되었습니다." : "연동 실패"}
//                                 </Typography>
//                             )}
//                         </Stack>
//                     </Stack>
//                 </Stack>
//                 <Button color="primary" sx={{ width: 120, alignSelf: "center" }}>
//                     확인
//                 </Button>
//             </Stack>
//         </Dialog>
//     );
// };

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
                        <label style={{ marginLeft: "0.8rem" }}>기관정보</label>
                    </Typography>
                </Stack>
                <MainCard>
                    <Stack spacing={5}>
                        <Typography variant="h3">기관등록</Typography>
                        <Divider />
                        <Stack spacing={5} maxWidth={700}>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>기관명</Typography>
                                <Stack flex={1}>
                                    <TextField placeholder="병원명 또는 기관명을 입력해주세요" variant="standard" fullWidth />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>사업자등록번호</Typography>
                                <Stack direction="row" spacing={3} flex={1}>
                                    <Stack flex={1}>
                                        <TextField
                                            inputProps={{ maxLength: 8 }}
                                            placeholder="사업자등록번호10자리를-없이 입력해주세요"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Stack>
                                    <Button color="primary">중복 확인</Button>
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>대표자 이름</Typography>
                                <Stack flex={1}>
                                    <TextField placeholder="대표자명을 입력해주세요" variant="standard" fullWidth inputProps={{ maxLength: 8 }} />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>대표번호</Typography>
                                <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                                    <Select variant="standard"></Select>
                                    <Typography>-</Typography>
                                    <TextField placeholder="전화번호를-없이 입력해주세요" variant="standard" fullWidth />
                                </Stack>
                            </Stack>
                            <Stack direction="row">
                                <Typography width={200}>주소</Typography>
                                <Stack spacing={3} flex={1}>
                                    <Stack direction="row" spacing={3}>
                                        <Stack flex={1}>
                                            <TextField
                                                placeholder="우편번호"
                                                variant="standard"
                                                fullWidth
                                                value={address.code}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Stack>
                                        <Button color="primary" onClick={() => setOpenAddress(true)}>
                                            주소 검색
                                        </Button>
                                    </Stack>
                                    <TextField placeholder="주소" variant="standard" value={address.full} InputProps={{ readOnly: true }} />
                                    <TextField
                                        placeholder="상세주소"
                                        variant="standard"
                                        value={address.detail}
                                        onChange={(e) => setAddress((prev) => ({ ...prev, detail: e.target.value }))}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={200}>요양기관번호</Typography>
                                <Stack flex={1}>
                                    <TextField placeholder="요양기관번호 8자리를-없이 입력해주세요" variant="standard" fullWidth />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignSelf="center" spacing={5}>
                            <Button color="primary" sx={{ width: 200 }}>
                                작성 완료
                            </Button>
                        </Stack>
                    </Stack>
                </MainCard>
            </Stack>

            <DialogAddress open={openAddress} setOpen={setOpenAddress} setAddress={setAddress} />
            {/* <DialogAuth open={openAuth} setOpen={setOpenAuth} /> */}
        </>
    );
};

export default TeamCreate;
