import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, MenuItem, Typography, Stack, Button, Dialog, TextField, Checkbox, Select } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Close as CloseIcon } from "@mui/icons-material";
import { PageCard, PageTitle } from "../../components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const CancelButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>취소</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography textAlign="center">
                        취소하시면 작성된 내용이 삭제됩니다.
                        <br />
                        취소하시겠습니까?
                    </Typography>
                    <Button onClick={() => navigate(-1)}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const SubmitButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>공지 등록</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography>공지내용을 등록하시겠습니까?</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NoticeCreate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>공지등록</PageTitle>
            </Stack>

            <PageCard spacing={3}>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>카테고리</Typography>
                        <Select defaultValue={0} sx={{ minWidth: 120 }}>
                            <MenuItem value={0}>공지사항</MenuItem>
                            <MenuItem value={1}>업데이트</MenuItem>
                            <MenuItem value={2}>메뉴얼</MenuItem>
                            <MenuItem value={3}>이벤트</MenuItem>
                        </Select>
                    </Stack>
                    <Stack>
                        <Typography>제목</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack>
                        <Typography>팝업공지</Typography>
                        <Checkbox />
                    </Stack>
                    <Stack>
                        <Typography>팝업노출기간</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>내용</Typography>
                        <Stack py={3}>
                            <Editor
                                placeholder="내용을 입력해주세요."
                                previewStyle="vertical"
                                height="300px"
                                initialEditType="wysiwyg"
                                toolbarItems={[
                                    ["heading", "bold", "italic", "strike"],
                                    ["ul", "ol", "task", "indent", "outdent"],
                                    ["image", "link"],
                                ]}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <CancelButton />
                    <SubmitButton />
                </Stack>
            </PageCard>
        </Stack>
    );
};
