import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton, Stack, Button, Dialog, Chip, Divider } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { PageCard, PageTitle } from "../../components";

const DeleteButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>삭제</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>공지사항을 삭제하시겠습니까?</Typography>
                    <Button>삭제</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NoticeDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>공지사항</PageTitle>
            </Stack>

            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>U2알리미 업데이트 안내</Typography>
                        <Typography>22-05-14</Typography>
                    </Stack>
                    <Chip label="업데이트" sx={{ alignSelf: "flex-start" }} />
                    <Divider />
                    <Typography>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis at, voluptas minima minus, magnam adipisci, inventore praesentium
                        architecto dolore illum veniam consectetur dicta maxime. Sequi, dolores earum! Magni, placeat eum?
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={3} alignItems="center">
                    <DeleteButton />
                    <Button onClick={() => navigate("/support/notice/update")}>수정</Button>
                </Stack>
            </PageCard>
        </Stack>
    );
};
