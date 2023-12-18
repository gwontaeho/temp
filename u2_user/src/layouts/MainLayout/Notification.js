import { useState } from "react";
import { Stack, Typography, Divider, Drawer, Avatar, IconButton, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../redux/features/notification/notificationSlice";
import AlramNew from "../../assets/icons/img_alarm_new.png";
import AlramDone from "../../assets/icons/img_alarm_done.png";
import { Icon } from "../../assets/icons/";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Detail = ({ setDetail }) => {
    return (
        <Stack p={3} spacing={3}>
            <Typography variant="body2" fontWeight="bold">
                발신번호가 등록되었습니다.
            </Typography>
            <Typography variant="body2">문자 발신번호가 1577-1338으로 등록되었습니다. 등록된 발신번호로 등록예약해보세요.</Typography>
            <Typography variant="body2">2022.07.15 오전 10:00</Typography>
            <Button variant="outlined" sx={{ alignSelf: "center" }}>
                상세 보기
            </Button>
        </Stack>
    );
};

const List = ({ setDetail }) => {
    return (
        <Stack>
            {[0, 1, 2, 3, 4, 5].map((v) => {
                const read = !!v;
                return (
                    <Stack key={v} onClick={() => setDetail(true)} bgcolor={!read && "#eee"}>
                        <Stack direction="row" p={3} spacing={3} sx={{ cursor: "pointer", ":hover": { bgcolor: "#f2f3f7" } }}>
                            <Avatar src={read ? AlramDone : AlramNew} />
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

export const Notification = () => {
    const open = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const [detail, setDetail] = useState(false);

    useEffect(() => {
        setDetail(false);
    }, [open]);

    return (
        <>
            <IconButton onClick={() => dispatch(toggle())}>
                <Icon name="alarm" size={24} />
                <Typography
                    variant="caption"
                    color="#fff"
                    sx={{
                        lineHeight: 1.5,
                        position: "absolute",
                        top: 0,
                        right: "100%",
                        width: "15px",
                        height: "15px",
                        bgcolor: "red",
                        borderRadius: "100%",
                    }}
                >
                    1
                </Typography>
            </IconButton>
            <Drawer
                open={open.open}
                anchor="right"
                onClose={() => dispatch(toggle())}
                elevation={0}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                PaperProps={{ style: { height: "calc(100vh - 80px)", marginTop: "80px", overflowY: "overlay", width: 400 } }}
            >
                <Stack>
                    <Stack direction="row" p={3} justifyContent="space-between" alignItems="center">
                        {detail ? <Typography onClick={() => setDetail(false)}>뒤로</Typography> : <Typography>알림</Typography>}
                        <IconButton onClick={() => dispatch(toggle())}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>
                    {detail ? <Detail setDetail={setDetail} /> : <List setDetail={setDetail} />}
                </Stack>
            </Drawer>
        </>
    );
};
