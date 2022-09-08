import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Dialog, TextField, Checkbox, Select } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";

import { PageCard, PageTitle } from "../../components";

const CancelButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>취소</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
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
            <Button onClick={() => setOpen(true)}>공지 수정</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>공지내용을 수정하시겠습니까?</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NoticeUpdate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>공지수정</PageTitle>
            <PageCard spacing={3}>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>카테고리</Typography>
                        <Select></Select>
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
