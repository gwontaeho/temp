import { Typography, Stack, Pagination, Select, MenuItem, Divider } from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

const NoticeList = () => {
    return (
        <MainCard>
            <Stack minHeight="50vh" justifyContent="space-between"></Stack>
        </MainCard>
    );
};

export default function NoticeDetail() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>공지사항</label>
            </Typography>
            <MainCard>
                <Stack direction="row" alignItems="center" borderBottom="1px solid #eee" spacing={5} height={80} o>
                    <Typography variant="caption">뒤로가기</Typography>
                    <Typography variant="caption">업데이트</Typography>
                    <Typography variant="caption" flex={1}>
                        U2알리미 업데이트 안내
                    </Typography>
                    <Typography variant="caption">2020.20.20</Typography>
                    <Typography variant="caption">아이콘</Typography>
                </Stack>

                <Typography mt={5}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugit corporis vel maxime explicabo facilis alias sapiente pariatur voluptas
                    repudiandae dolores tempore blanditiis placeat libero optio quo, qui cum. A.
                </Typography>
            </MainCard>
        </Stack>
    );
}
