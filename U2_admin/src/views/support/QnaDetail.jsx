import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Dialog, Chip, Divider, Avatar, TextField } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { PageCard, PageTitle } from "../../components";
import { Editor } from "@toast-ui/react-editor";

const WriteButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && (
                <Stack bgcolor="_bg.main" borderRadius={4} p={3} spacing={3}>
                    <Typography>답변내용</Typography>

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
                    <Button component="label" variant="outlined" sx={{ alignSelf: "flex-start" }}>
                        파일 업로드
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Stack>
            )}
            {open ? (
                <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(false)}>
                    응답 완료
                </Button>
            ) : (
                <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(true)}>
                    답변 작성
                </Button>
            )}
        </>
    );
};

const HeaderUser = () => {
    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar />
                <Typography>email@email.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={3}>
                    <Typography>환불가능한가요?</Typography>
                    <Typography color="primary">응답대기</Typography>
                </Stack>
                <Typography>22-05-14 12:00</Typography>
            </Stack>
            <Chip label="사용 문의" sx={{ alignSelf: "flex-start" }} />
        </Stack>
    );
};

const HeaderGuest = () => {
    return (
        <Stack spacing={3}>
            <Chip label="사용 문의" sx={{ alignSelf: "flex-start" }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>환불가능한가요?</Typography>
                <Typography color="primary">응답대기</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar />
                    <Typography>email@email.com</Typography>
                    <Typography>[비회원]</Typography>
                </Stack>
                <Typography>22-05-14 12:00</Typography>
            </Stack>
        </Stack>
    );
};

export const QnaDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>문의내용</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <HeaderUser />
                    <HeaderGuest />
                    <Divider />
                    <Typography>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis at, voluptas minima minus, magnam adipisci, inventore praesentium
                        architecto dolore illum veniam consectetur dicta maxime. Sequi, dolores earum! Magni, placeat eum?
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Typography>첨부파일</Typography>
                        <Typography>sample.png</Typography>
                    </Stack>
                </Stack>
                <Stack bgcolor="_bg.main" borderRadius={4} p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <ReplyIcon />
                            <Typography color="primary">응답완료</Typography>
                        </Stack>
                        <Stack direction="row" spacing={3}>
                            <Typography>Supervisor</Typography>
                            <Typography>22-05-21 14:20</Typography>
                        </Stack>
                    </Stack>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse laboriosam, est consequatur inventore dignissimos modi beatae cumque
                        doloremque veniam non aliquam temporibus mollitia. Dignissimos saepe qui deserunt! Itaque, odio rerum!
                    </Typography>
                </Stack>
                <WriteButton />
            </PageCard>
        </Stack>
    );
};
