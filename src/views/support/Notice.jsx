import { useNavigate } from "react-router-dom";
import { Typography, Stack, Divider, IconButton, Pagination, Select } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ViewTitle } from "../../components/";

export const Notice = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="notice" title="공지사항" />
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={5}>
                <Stack spacing={3}>
                    {[0, 1, 2].map((v, i) => {
                        return (
                            <Stack key={v} spacing={3} onClick={() => navigate("/support/notice/1")}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Typography variant="body2">업데이트</Typography>
                                    <Typography flex={1} fontWeight="bold">
                                        제목
                                    </Typography>
                                    <Typography variant="body2">2022.22.22</Typography>
                                    <IconButton>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Stack>
                                {i !== 2 && <Divider />}
                            </Stack>
                        );
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
