import { useNavigate } from "react-router-dom";
import { Typography, Stack, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Qna = () => {
    const navigate = useNavigate();
    return (
        <Stack direction="row" bgcolor="#fff" borderRadius={3} p={3} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={10} alignItems="center">
                <Typography fontWeight="bold">문의내역</Typography>
                <Typography fontWeight="bold">환불 가능한가요?</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">22-05-14</Typography>
                <IconButton onClick={() => navigate("/support/qna")}>
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};
