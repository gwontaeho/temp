import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider, IconButton } from "@mui/material";

import { ViewTitle } from "../../components/";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const NoticeDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="notice" title="공지사항" />
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <IconButton onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="body2">업데이트</Typography>
                    <Typography flex={1} fontWeight="bold">
                        제목
                    </Typography>
                    <Typography variant="body2">2022.22.22</Typography>
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
