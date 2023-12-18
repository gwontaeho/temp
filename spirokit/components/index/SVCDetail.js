import { Stack, Typography, List, ListItem, ListItemButton } from "@mui/material";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

import { setSelectedIds } from "@/redux/mainSlice";
import { ResultList } from "@/components/common";

export const SVCDetail = ({ simple, pre, post }) => {
    const type = "SVC";
    const dispatch = useDispatch();
    const { svc } = useSelector((state) => state.main);
    const selectedIds = svc?.selectedIds;

    const styles = {
        card: {
            bgcolor: "#fff",
            p: 3,
            borderRadius: 1.5,
            spacing: 3,
            boxShadow: "0px 3px 6px #0000001A",
        },
    };

    return (
        <Stack direction="row" {...styles.card}>
            <List
                sx={{
                    mt: 6,
                    bgcolor: "#fff",
                    boxShadow: "0px 3px 6px  #0000001A",
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: "spirokit.border",
                    width: 240,
                    p: 0,
                    height: 400,
                    overflow: "auto",
                    ".MuiTypography-root": { fontSize: 14 },
                }}
            >
                <ListItem sx={{ bgcolor: "spirokit.bg", position: "sticky", top: 0, zIndex: 1 }}>
                    <Typography flex={2} textAlign="center">
                        검사 시간
                    </Typography>
                    <Typography flex={3} textAlign="center">
                        기관지 확장제
                    </Typography>
                </ListItem>
                {simple.map(({ date, measurementId, medicationState }) => {
                    const selected = selectedIds.includes(measurementId);
                    const handleClick = () => {
                        if (selected) dispatch(setSelectedIds({ selectedIds: selectedIds.filter((v) => v !== measurementId), type }));
                        else dispatch(setSelectedIds({ selectedIds: [...selectedIds, measurementId], type }));
                    };

                    return (
                        <ListItem disablePadding key={measurementId}>
                            <ListItemButton selected={selected} onClick={handleClick}>
                                <Typography flex={2} textAlign="center">
                                    {dayjs(date).format("HH:mm")}
                                </Typography>
                                <Typography flex={3} textAlign="center">
                                    {medicationState}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Stack flex={1}>
                <Typography variant="subtitle1" height={48}>
                    Pre
                </Typography>
                <ResultList data={pre} />
            </Stack>

            <Stack flex={1}>
                <Typography variant="subtitle1" height={48}>
                    Post
                </Typography>
                <ResultList data={post} />
            </Stack>
        </Stack>
    );
};
