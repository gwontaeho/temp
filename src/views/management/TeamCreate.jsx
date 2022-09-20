import { useState, useReducer, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Dialog } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import { ViewTitle } from "../../components/";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/features/toast/toastSlice";

const Check = ({ dispatch, num }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = useCallback(() => {
        // 중복시 dispatch
        dispatch({ type: "setNumError", payload: { check: true } });
        setOpen(true);
    }, [num, dispatch]);

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <>
            <Button color="_gray" onClick={handleClickOpen}>
                중복확인
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>사용가능합니다</Typography>
                    {/* <Typography>이미 등록된번호로 사용불가합니다</Typography> */}
                    <Button onClick={handleClick}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

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

const initialState = {
    team: "",
    teamError: "",
    name: "",
    nameError: "",
    num: "",
    numError: "",
    phone: "",
    phoneError: "",
    address: "",
    addressError: "",
    detailAddress: "",
    code: "",
    care: "",
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setTeam": {
            return { ...state, team: payload, teamError: "" };
        }
        case "setTeamError": {
            const team = state.team;
            if (!team) return { ...state, teamError: "기관명을 입력해주세요" };
            return { ...state, teamError: "" };
        }
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
        case "setNum": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, num: payload };
            return { ...state };
        }
        case "setNumError": {
            const num = state.num;
            if (!num) return { ...state, numError: "사업자 등록번호를 입력해주세요" };
            if (payload?.check) return { ...state, numError: "이미 등록된 번호입니다. 입력하신 번호를 다시 확인해주세요" };
            return { ...state, numError: "" };
        }
        case "setPhone": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, phone: payload, phoneError: "" };
            return { ...state };
        }
        case "setPhoneError": {
            const phone = state.phone;
            if (!phone) return { ...state, phoneError: "대표번호를 입력해주세요" };
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
            const { phone, name, code, num, team } = state;
            const errors = {
                teamError: !team ? "기관명을을 입력해주세요" : "",
                nameError: !name ? "대표자 이름을 입력해주세요" : "",
                numError: !num ? "사업자 등록번호를 입력해주세요" : "",
                phoneError: !phone ? "대표번호를 입력해주세요" : "",
                addressError: !code ? "기관 주소를 입력해주세요" : "",
            };
            return { ...state, ...errors };
        }
    }
};

export const TeamCreate = () => {
    const rdxDispatch = useDispatch();

    const navigate = useNavigate();

    const refs = useRef([]);

    const [open, setOpen] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { team, teamError, name, nameError, num, numError, phone, phoneError, address, addressError, detailAddress, code, care } = state;

    const handleClickSubmit = useCallback(() => {
        if (!phone) refs.current[3].focus();
        if (!name) refs.current[2].focus();
        if (!num) refs.current[1].focus();
        if (!team) refs.current[0].focus();
        if (!name || !phone || !code || !team || !num) return dispatch({ type: "setAllErrors" });
        console.log(state);
        rdxDispatch(openToast("기관정보가 수정되었습니다"));
        // navigate("/management/team");
    }, [state]);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="team" title="기관 등록" />
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
                                <TextField
                                    inputRef={(el) => (refs.current[0] = el)}
                                    onBlur={() => dispatch({ type: "setTeamError" })}
                                    error={!!teamError}
                                    helperText={teamError}
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
                                            inputRef={(el) => (refs.current[1] = el)}
                                            onBlur={() => dispatch({ type: "setNumError" })}
                                            error={!!numError}
                                            helperText={numError}
                                            inputProps={{ maxLength: 10 }}
                                            fullWidth
                                            value={num}
                                            placeholder="사업자등록번호 10자리를 -없이 입력해주세요"
                                            onChange={(e) => dispatch({ type: "setNum", payload: e.target.value })}
                                        />
                                    </Stack>
                                    <Check num={num} dispatch={dispatch} />
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                    대표자명
                                </Typography>
                                <TextField
                                    inputRef={(el) => (refs.current[2] = el)}
                                    onBlur={() => dispatch({ type: "setNameError" })}
                                    error={!!nameError}
                                    helperText={nameError}
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
                                        inputRef={(el) => (refs.current[3] = el)}
                                        onBlur={() => dispatch({ type: "setPhoneError" })}
                                        error={!!phoneError}
                                        helperText={phoneError}
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
                                        <TextField
                                            error={!!addressError}
                                            helperText={addressError}
                                            placeholder="우편번호"
                                            fullWidth
                                            value={code}
                                            inputProps={{ readOnly: true }}
                                        />
                                        <Button color="_gray" onClick={() => setOpen(true)}>
                                            검색
                                        </Button>
                                    </Stack>
                                    <TextField error={!!addressError} placeholder="주소" fullWidth value={address} inputProps={{ readOnly: true }} />
                                    <TextField
                                        error={!!addressError}
                                        placeholder="상세 주소"
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
                                <TextField
                                    placeholder="요양기관번호 8자리를 -없이 입력해주세요"
                                    fullWidth
                                    value={care}
                                    onChange={(e) => dispatch({ type: "setCare", payload: e.target.value })}
                                />
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
