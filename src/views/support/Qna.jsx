import { Typography, Stack, Pagination, Select, MenuItem } from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function Qna() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>문의</label>
            </Typography>
            <MainCard>
                <Stack minHeight="50vh" justifyContent="space-between">
                    <Stack sx={{ "&>*:not(:last-child)": { borderBottom: "1px solid #eee" } }}>
                        {[0, 1, 2].map((v) => {
                            return (
                                <Stack key={v} direction="row" alignItems="center" spacing={5} height={80}>
                                    <Typography variant="caption">사용문의</Typography>
                                    <Typography variant="caption" flex={1}>
                                        환불 가능한가요?
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
        </Stack>
    );
}
