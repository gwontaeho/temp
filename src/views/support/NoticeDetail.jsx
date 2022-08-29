import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider } from "@mui/material";

export const NoticeDetail = () => {
    const navigate = useNavigate();

    console.log("a");

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">공지사항</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                <Stack direction="row" spacing={3}>
                    <Typography>아이콘</Typography>
                    <Typography>업데이트</Typography>
                    <Typography flex={1}>제목</Typography>
                    <Typography>날짜</Typography>
                </Stack>
                <Divider />
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptate delectus qui consectetur. Iure, labore illo! Placeat laboriosam
                    quam obcaecati voluptatibus ea nam illum veniam id, consequatur laborum pariatur ipsum.
                </Typography>
            </Stack>
        </Stack>
    );
};
