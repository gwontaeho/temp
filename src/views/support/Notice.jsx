import { Typography, Stack, Pagination, Select, MenuItem, Divider } from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

const NoticeList = () => {
    return (
        <MainCard>
            <Stack minHeight="50vh" justifyContent="space-between">
                <Stack sx={{ "&>*:not(:last-child)": { borderBottom: "1px solid #eee" } }}>
                    {[0, 1, 2].map((v) => {
                        return (
                            <Stack key={v} direction="row" alignItems="center" spacing={5} height={80}>
                                <Typography variant="caption">업데이트</Typography>
                                <Typography variant="caption" flex={1}>
                                    U2알리미 업데이트 안내
                                </Typography>
                                <Typography variant="caption">2020.20.20</Typography>
                                <Typography variant="caption">아이콘</Typography>
                            </Stack>
                        );
                    })}
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Pagination />
                    <Select>
                        <MenuItem></MenuItem>
                    </Select>
                </Stack>
            </Stack>
        </MainCard>
    );
};

const NoticeDetail = () => {
    return (
        <MainCard>
            <Stack minHeight="50vh" spacing={3}>
                <Stack direction="row" alignItems="center" spacing={5}>
                    <Typography variant="caption">업데이트</Typography>
                    <Typography variant="caption" flex={1}>
                        U2알리미 업데이트 안내
                    </Typography>
                    <Typography variant="caption">2020.20.20</Typography>
                </Stack>
                <Divider />
                <Stack>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt ad nobis, veritatis dolorem doloribus commodi! Debitis dolores
                        mollitia unde rerum nam praesentium doloribus, dolorem quo quos officiis repellat nisi iste?
                    </Typography>
                </Stack>
            </Stack>
        </MainCard>
    );
};

export default function Notice() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>공지사항</label>
            </Typography>
            <NoticeList />
        </Stack>
    );
}
