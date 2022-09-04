import { useNavigate } from "react-router-dom";
import { Typography, Stack, Divider, Button, IconButton, Chip, Pagination, Select } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ViewTitle } from "../../components/";

const Item = ({ i }) => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3} onClick={() => navigate("/support/qna/1")}>
            <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="body2">업데이트</Typography>
                <Stack direction="row" flex={1} alignItems="center" spacing={2}>
                    <Typography fontWeight="bold">제목</Typography>
                    <Chip label="응답대기" />
                </Stack>
                <Typography variant="body2">2022.12.12</Typography>
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
            {i !== 2 && <Divider />}
        </Stack>
    );
};

export const Qna = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="qna" title="문의" />
                <Button onClick={() => navigate("/support/qna/create")} color="_gray">
                    문의하기
                </Button>
            </Stack>
            <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={5}>
                <Stack spacing={3}>
                    {[0, 1, 2].map((v, i) => {
                        return <Item key={i} i={i} />;
                    })}
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Pagination />
                    <Select></Select>
                </Stack>
            </Stack>
        </Stack>
    );
};
