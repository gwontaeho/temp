import { useState } from "react";
import { Stack, Typography, Divider, Drawer, Avatar } from "@mui/material";
import { useEffect } from "react";

const Detail = ({ setDetail }) => {
    return (
        <Stack p={3} spacing={3}>
            <Typography variant="body2" fontWeight="bold">
                발신번호가 등록되었습니다.
            </Typography>
            <Typography variant="body2">문자 발신번호가 1577-1338으로 등록되었습니다. 등록된 발신번호로 등록예약해보세요.</Typography>
            <Typography variant="body2">2022.07.15 오전 10:00</Typography>
        </Stack>
    );
};

const List = ({ setDetail }) => {
    return (
        <Stack>
            {[0, 1, 2, 3, 4, 5].map((v) => {
                return (
                    <Stack key={v} onClick={() => setDetail(true)}>
                        <Stack direction="row" p={3} spacing={3} sx={{ cursor: "pointer", ":hover": { bgcolor: "#f2f3f7" } }}>
                            <Avatar />
                            <Stack spacing={1}>
                                <Typography variant="body2">발신번호가 등록되었습니다</Typography>
                                <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                    </Stack>
                );
            })}
        </Stack>
    );
};

export const Notification = ({ open, setOpen }) => {
    const [detail, setDetail] = useState(false);

    useEffect(() => {
        setDetail(false);
    }, [open]);

    return (
        <Drawer
            open={open}
            anchor="right"
            onClose={() => setOpen(false)}
            elevation={0}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
            PaperProps={{ style: { height: "calc(100vh - 80px)", marginTop: "80px", overflowY: "overlay", width: 400 } }}
        >
            <Stack>
                <Stack direction="row" p={3} justifyContent="space-between">
                    {detail ? <Typography onClick={() => setDetail(false)}>뒤로</Typography> : <Typography>알림</Typography>}
                    <Typography onClick={() => setOpen(false)}>닫기</Typography>
                </Stack>
                {detail ? <Detail setDetail={setDetail} /> : <List setDetail={setDetail} />}
            </Stack>
        </Drawer>
    );
};
