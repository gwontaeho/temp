import { useCallback, useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, TextField, Switch, Button, Select, Dialog, IconButton, Divider } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

import { PageCard, PageTitle, CountCard } from "../../components";

const SendButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(true)}>
                알림 수정
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>알림내용을 수정하겠습니까?</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NotificationUpdate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>알림수정</PageTitle>
            <PageCard spacing={5}>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>발송일시</Typography>
                        <Typography>알림명</Typography>
                    </Stack>
                    <Stack>
                        <Typography>대상자</Typography>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Button color="_gray">선택</Button>
                            <Typography>email@email.com</Typography>
                            <Typography>총 51명</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>내용</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack>
                        <Typography>내용</Typography>
                        <Stack py={3} flex={1}>
                            <TextField fullWidth multiline rows={5} />
                        </Stack>
                    </Stack>
                </Stack>
                <SendButton />
            </PageCard>
        </Stack>
    );
};
