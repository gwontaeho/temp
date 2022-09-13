import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Dialog, Chip, Divider, Avatar, TextField } from "@mui/material";

import { PageCard, PageTitle } from "../../components";

const WriteButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && (
                <Stack bgcolor="_bg.main" borderRadius={4} p={3} spacing={3}>
                    <Typography>답변내용</Typography>
                    <TextField rows={4} multiline />
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

export const QnaDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>문의내용</PageTitle>
            <PageCard spacing={5}>
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
                        <Typography>22-05-14</Typography>
                    </Stack>
                    <Chip label="사용 문의" sx={{ alignSelf: "flex-start" }} />
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
                        <Typography color="primary">응답완료</Typography>
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
