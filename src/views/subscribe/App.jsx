import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Dialog, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

import { PageCard, PageTitle } from "../../components";

const Item = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontWeight="bold">U2알리미</Typography>
                <Typography variant="body2">U174</Typography>
                <Chip label="사용중" />
                <IconButton size="small" onClick={() => navigate("/subscribe/app/update")}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            <Typography variant="body2">검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>요금제</TableCell>
                            <TableCell>금액</TableCell>
                            <TableCell>구독단위</TableCell>
                            <TableCell>기간</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate("/subscribe/app/plan/create")}>요금제 추가</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1].map((v) => {
                            return <Row key={v} />;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

const Row = () => {
    const navigate = useNavigate();

    const DeleteButton = () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <IconButton onClick={() => setOpen(true)}>
                    <CloseIcon />
                </IconButton>
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                    <Stack p={3} spacing={3}>
                        <Typography>요금제 삭제</Typography>
                    </Stack>
                </Dialog>
            </>
        );
    };

    return (
        <TableRow>
            <TableCell onClick={() => navigate("/subscribe/app/plan")}>요금제</TableCell>
            <TableCell>금액</TableCell>
            <TableCell>구독단위</TableCell>
            <TableCell>기간</TableCell>
            <TableCell>
                <IconButton onClick={() => navigate("/subscribe/app/plan/update")}>
                    <EditIcon />
                </IconButton>
                <DeleteButton />
            </TableCell>
        </TableRow>
    );
};

export const App = () => {
    return (
        <Stack spacing={3}>
            <PageTitle>앱 / 요금제 관리</PageTitle>
            <PageCard spacing={5}>
                {[0, 1].map((v) => {
                    return <Item key={v} />;
                })}
            </PageCard>
        </Stack>
    );
};
