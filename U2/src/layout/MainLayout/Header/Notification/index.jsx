import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Badge as MuiBadge, IconButton, Stack, Drawer, Typography, Avatar, Divider } from "@mui/material";
import { withStyles } from "@mui/styles";

import { sampleIcon } from "../../../../ui-component/icons/icons";

const StyledBadge = withStyles(() => ({
    badge: {
        right: 5,
        top: 11,
        backgroundColor: "red",
        color: "#FFF",
    },
}))(MuiBadge);

const NotificationList = ({ setDetail }) => {
    return (
        <Stack>
            {[0, 1, 2, 3, 4, 5].map(() => {
                return (
                    <>
                        <Stack
                            direction="row"
                            p={3}
                            spacing={3}
                            onClick={() => setDetail((prev) => ({ ...prev, state: true }))}
                            sx={{ cursor: "pointer", ":hover": { bgcolor: "#eeeeee88" } }}
                        >
                            <Avatar />
                            <Stack spacing={1}>
                                <Typography variant="caption">발신번호가 등록되었습니다</Typography>
                                <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                    </>
                );
            })}
        </Stack>
    );
};

const NotificationDetail = () => {
    return (
        <Stack p={3} spacing={3}>
            <Typography variant="caption">발신번호가 등록되었습니다.</Typography>
            <Typography variant="caption">문자 발신번호가 1577-1338으로 등록되었습니다. 등록된 발신번호로 등록예약해보세요.</Typography>
            <Typography variant="caption">2022.07.15 오전 10:00</Typography>
        </Stack>
    );
};

const NotificationDialog = ({ open, setOpen }) => {
    const [detail, setDetail] = useState({ data: {}, state: true });

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            anchor="right"
            elevation={0}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
            PaperProps={{ style: { height: "calc(100vh - 70px)", marginTop: "70px", overflowY: "overlay" } }}
        >
            <Stack sx={{ height: "90vh", width: 400 }}>
                <Stack p={3} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography onClick={() => detail.state && setDetail((prev) => ({ ...prev, state: false }))}>{detail.state ? "뒤로" : "알림"}</Typography>
                    <Typography onClick={() => setOpen(false)}>닫기</Typography>
                </Stack>
                {detail.state ? <NotificationDetail /> : <NotificationList setDetail={setDetail} />}
            </Stack>
        </Drawer>
    );
};

export default function Notification() {
    const session = useSelector((state) => state.session);
    const { accountInfo } = session;

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        console.info(accountInfo);
    }, [accountInfo]);

    return (
        <>
            <IconButton onClick={handleClick}>
                <StyledBadge badgeContent={1} onClick={() => setOpen(true)}>
                    {sampleIcon()}
                </StyledBadge>
            </IconButton>

            <NotificationDialog open={open} setOpen={setOpen} />
        </>
    );
}
