import { Typography, Stack, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { toggle } from "../../../redux/features/notification/notificationSlice";

export const Notification = () => {
    const dispatch = useDispatch();
    return (
        <Stack direction="row" bgcolor="#fff" borderRadius={3} p={3} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={10} alignItems="center">
                <Typography fontWeight="bold">최근알림</Typography>
                <Typography>발신번호가 등록되었습니다</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">22-05-14</Typography>
                <IconButton onClick={() => dispatch(toggle())}>
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};
