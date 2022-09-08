import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Checkbox, FormControlLabel, Dialog } from "@mui/material";

const initialState = { team: "", name: "", num: "", phone: "", address: "", detailAddress: "", code: "" };

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
        case "setAddress": {
            const { address, code } = payload;
            return { ...state, address, code };
        }
        case "setDetailAddress": {
            return { ...state, detailAddress: payload };
        }
    }
};

const CompleteButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button sx={{ mt: 3 }} onClick={() => setOpen(true)}>
                신청완료
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack spacing={3} p={3}>
                    <Typography textAlign="center">
                        신청완료되었습니다.
                        <br />
                        바로 사용해보세요
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={() => navigate("/")}>
                        U2알리미
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

const Ex = ({ setScreen }) => {
    const navigate = useNavigate();
    return (
        <Stack>
            <Stack spacing={20} alignSelf="center" bgcolor="#fff" borderRadius={3} p={3} minWidth={600}>
                <Stack spacing={3}>
                    <Typography p={3} bgcolor="_bg.main" borderRadius={2} textAlign="center">
                        서비스를 한달간 무료로 이용해보세요.
                    </Typography>

                    <Stack spacing={5}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography fontWeight="bold">서비스 신청</Typography>
                            <Button variant="text" onClick={() => navigate("/subscribe/list/create")}>
                                바로 구독하러 가기
                            </Button>
                        </Stack>
                        <Stack spacing={3} borderRadius={3} p={5} boxShadow={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <FormControlLabel control={<Checkbox />} label="U2알리미" />
                                <Button color="_gray">서비스 상세보기</Button>
                            </Stack>
                            <Typography>검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Button onClick={() => setScreen(1)}>다음</Button>
            </Stack>
        </Stack>
    );
};

const Team = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([false, false]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { team, name, num, prePhone, phone, address, detailAddress, code, care } = state;

    const handleClickSubmit = useCallback(() => {
        console.log(state);
    }, [state]);
    return (
        <Stack>
            <Stack spacing={20} alignSelf="center" bgcolor="#fff" borderRadius={3} p={3} minWidth={600}>
                <Stack spacing={3}>
                    <Typography fontWeight="bold" p={3} borderRadius={2} textAlign="center">
                        서비스 신청
                    </Typography>
                    <Stack spacing={1}>
                        <Typography>서비스 이용약관</Typography>
                        <Stack spacing={1} borderRadius={3} p={5} boxShadow={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked[0] && checked[1]}
                                        indeterminate={checked[0] !== checked[1]}
                                        onChange={(e) => {
                                            setChecked([e.target.checked, e.target.checked]);
                                        }}
                                    />
                                }
                                label="전체 약관에 동의합니다"
                            />
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked[0]}
                                                onChange={(e) =>
                                                    setChecked((prev) => {
                                                        const newChecked = [...prev];
                                                        newChecked[0] = e.target.checked;
                                                        return newChecked;
                                                    })
                                                }
                                            />
                                        }
                                        label="U2알리미 이용약관에 동의합니다"
                                    />
                                    <Typography variant="body2" color="primary">
                                        (필수)
                                    </Typography>
                                </Stack>
                                <Button variant="text">보기</Button>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked[1]}
                                                onChange={(e) =>
                                                    setChecked((prev) => {
                                                        const newChecked = [...prev];
                                                        newChecked[1] = e.target.checked;
                                                        return newChecked;
                                                    })
                                                }
                                            />
                                        }
                                        label="개인정보 처리 위탁에 동의합니다"
                                    />
                                    <Typography variant="body2" color="primary">
                                        (필수)
                                    </Typography>
                                </Stack>

                                <Button variant="text">보기</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>기관 정보</Typography>
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
                                <TextField
                                    placeholder="병원명 또는 기관명을 입력해주세요"
                                    fullWidth
                                    value={team}
                                    onChange={(e) => dispatch({ type: "setTeam", payload: e.target.value })}
                                />
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
                                            placeholder="사업자등록번호 10자리를 -없이 입력해주세요"
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
                                <TextField
                                    placeholder="대표자명을 입력해주세요"
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
                                        placeholder="전화번호를 - 없이 입력해주세요"
                                        fullWidth
                                        value={phone}
                                        onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                    주소
                                </Typography>
                                <Stack height="100%" justifyContent="space-around" flex={1}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <TextField placeholder="우편번호" fullWidth value={code} inputProps={{ readOnly: true }} />
                                        <Button color="_gray" onClick={() => setOpen(true)}>
                                            검색
                                        </Button>
                                    </Stack>
                                    <TextField placeholder="주소" fullWidth value={address} inputProps={{ readOnly: true }} />
                                    <TextField
                                        placeholder="상세 주소"
                                        fullWidth
                                        value={detailAddress}
                                        onChange={(e) => dispatch({ type: "setDetailAddress", payload: e.target.value })}
                                    />
                                </Stack>
                            </Stack>
                            <CompleteButton />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export const Service = () => {
    const [screen, setScreen] = useState(0);

    return <Stack>{screen === 0 ? <Ex setScreen={setScreen} /> : <Team />}</Stack>;
};
