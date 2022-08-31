import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider, Button, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Qna = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="_title">문의</Typography>
                <Button variant="contained" size="small" onClick={() => navigate("/support/qna/create")}>
                    문의하기
                </Button>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                {[0, 1, 2].map((v, i) => {
                    return (
                        <Stack key={v} spacing={3} onClick={() => navigate("/support/qna/1")}>
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Typography variant="body2">업데이트</Typography>
                                <Typography flex={1} fontWeight="bold">
                                    제목
                                </Typography>
                                <Typography variant="body2">날짜</Typography>
                                <IconButton>
                                    <ChevronRightIcon />
                                </IconButton>
                            </Stack>
                            {i !== 2 && <Divider />}
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};
