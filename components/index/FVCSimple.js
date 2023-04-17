import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIds } from "@/redux/mainSlice";

export const FVCSimple = ({ simple }) => {
    const dispatch = useDispatch();
    const type = "FVC";
    const { fvc } = useSelector((state) => state.main);
    const selectedIds = fvc?.selectedIds;

    return (
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
    );
};
