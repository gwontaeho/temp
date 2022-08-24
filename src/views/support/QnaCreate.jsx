import { useCallback, useState } from "react";
import { Typography, Stack, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

const DialogComplete = ({ open, setOpen }) => {
    const navigate = useNavigate();

    const closeDialog = useCallback(() => {
        setOpen(false);
        navigate("/support/qna", { replace: true });
    }, []);

    return (
        <Dialog open={open} maxWidth="xs" onClose={closeDialog}>
            <Stack p={5} spacing={3} alignItems="center">
                <Typography variant="h5">문의 등록 완료</Typography>
                <Typography variant="caption" textAlign="center">
                    문의 내용이 접수되었습니다.
                    <br />
                    2~3일 이내에 등록된 이메일로 답변드리겠습니다.
                </Typography>
                <Button color="primary" onClick={closeDialog}>
                    확인
                </Button>
            </Stack>
        </Dialog>
    );
};

export default function QnaCreate() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClickSubmit = useCallback(() => {
        // 문의 등록

        setOpen(true);
    }, []);

    return (
        <>
            <Stack spacing={3}>
                <Typography variant="h2">
                    {SubscriptionIcon()}
                    <label style={{ marginLeft: "0.8rem" }}>문의</label>
                </Typography>

                <MainCard sx={{ overflow: "auto" }}>
                    <Stack spacing={3} minWidth={600}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography onClick={() => navigate(-1)}>뒤로가기</Typography>
                            <Typography variant="h4">문의하기</Typography>
                        </Stack>
                        <Stack sx={{ "&>*": { minHeight: 80, flexDirection: "row", alignItems: "center", "&>:first-child": { width: 130 } } }}>
                            <Stack>
                                <Typography>문의 유형</Typography>
                                <FormControl>
                                    <RadioGroup defaultValue="0" row>
                                        <FormControlLabel value="0" control={<Radio />} label="구독문의" />
                                        <FormControlLabel value="1" control={<Radio />} label="사용문의" />
                                        <FormControlLabel value="2" control={<Radio />} label="오류신고" />
                                        <FormControlLabel value="3" control={<Radio />} label="기타문의" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <Stack>
                                <Typography>서비스 구분</Typography>
                                <FormControl>
                                    <RadioGroup defaultValue="0" row>
                                        <FormControlLabel value="0" control={<Radio />} label="U2알리미" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <Stack>
                                <Typography>담당자명</Typography>
                                <Stack flex={1}>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>휴대전화</Typography>
                                <Stack flex={1}>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>이메일</Typography>
                                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                    <TextField fullWidth />
                                    <Typography>@</Typography>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>제목</Typography>
                                <Stack flex={1}>
                                    <TextField fullWidth />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>문의 내용</Typography>
                                <Stack flex={1} py={3}>
                                    <TextField fullWidth multiline rows={5} />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>첨부파일</Typography>
                                <Button>파일 업로드</Button>
                            </Stack>
                        </Stack>
                        <Button color="primary" sx={{ alignSelf: "flex-end" }} onClick={handleClickSubmit}>
                            문의 등록
                        </Button>
                    </Stack>
                </MainCard>
            </Stack>

            <DialogComplete open={open} setOpen={setOpen} />
        </>
    );
}
