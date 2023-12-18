import { Typography, Stack, Pagination, Select, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function QnaDetail() {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h2">
                    {SubscriptionIcon()}
                    <label style={{ marginLeft: "0.8rem" }}>문의</label>
                </Typography>
            </Stack>
            <MainCard>
                <Stack minHeight="70vh" justifyContent="space-between">
                    <Stack spacing={5}>
                        <Stack direction="row" alignItems="center" spacing={5} height={80} borderBottom="1px solid #eee">
                            <Typography variant="caption">사용문의</Typography>
                            <Typography variant="caption" flex={1}>
                                환불 가능한가요?
                            </Typography>
                            <Typography variant="caption">2020.20.20</Typography>
                            <Typography variant="caption">아이콘</Typography>
                        </Stack>
                        <Typography>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum soluta hic praesentium autem sequi! Modi, hic eligendi?
                            Tempora doloremque vitae sit dolorum delectus! Quae recusandae nostrum reprehenderit dolores perspiciatis!
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography variant="caption">첨부파일</Typography>
                            <Typography variant="caption">첨부파일명.jpg</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="caption">응답완료</Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo sit ipsam exercitationem quia. Voluptatibus nesciunt dolor
                                vel at eum distinctio quaerat voluptatem aliquid, libero, porro nihil, maxime dolorum. Doloremque.
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Pagination />
                        <Select>
                            <MenuItem></MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </MainCard>
        </Stack>
    );
}
