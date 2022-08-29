import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider, Button } from "@mui/material";

export const QnaDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">문의</Typography>
                <Button variant="contained" onClick={() => navigate("/support/qna/create")}>
                    문의하기
                </Button>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={3}>
                        <Typography>업데이트</Typography>
                        <Typography flex={1}>제목</Typography>
                        <Typography>날짜</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                    <Divider />
                </Stack>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, sed beatae. Numquam perferendis ab necessitatibus nostrum aut quae
                    quod et ea earum dignissimos iusto excepturi nobis, quaerat molestias odio blanditiis.
                </Typography>
                <Typography>첨부파일</Typography>
                <Stack bgcolor="#f2f3f7" p={3} spacing={3}>
                    <Typography>답변완료</Typography>
                    <Typography>Lorem</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
