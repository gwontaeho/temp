import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider, Button, IconButton, Chip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ViewTitle } from "../../components/";
export const QnaDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="qna" title="문의내용" />
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <IconButton onClick={() => navigate(-1)}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography flex={1} fontWeight="bold">
                            제목
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <IconButton onClick={() => navigate("/support/qna/create")}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <Typography variant="body2">2022.22.22</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip label="사용문의" />
                </Stack>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, sed beatae. Numquam perferendis ab necessitatibus nostrum aut quae
                    quod et ea earum dignissimos iusto excepturi nobis, quaerat molestias odio blanditiis.
                </Typography>
                <Typography>첨부파일</Typography>
                <Stack bgcolor="#f2f3f7" p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <SubdirectoryArrowRightIcon />
                        <Typography>응답완료</Typography>
                    </Stack>
                    <Typography>Lorem</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
