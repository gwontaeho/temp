import { Stack, Typography, List, ListItem, Divider } from "@mui/material";

export const ResultList = ({ data }) => {
    return (
        <List
            sx={{
                bgcolor: "#fff",
                boxShadow: "0px 3px 6px  #0000001A",
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "spirokit.border",
                p: 0,
                height: 400,
                overflowY: "overlay",
                ".MuiTypography-root": { fontSize: 12, textAlign: "center" },
            }}
        >
            <ListItem sx={{ bgcolor: "spirokit.bg", position: "sticky", top: 0, zIndex: 1 }}>
                <Stack flex={1.5} />
                <Typography flex={1}>측정</Typography>
                <Typography flex={1}>예측값</Typography>
                <Typography flex={1}>%</Typography>
                <Typography flex={1.5}>정상범위</Typography>
                <Typography flex={1.5} px={1}>
                    Z SCORE
                </Typography>
            </ListItem>
            {data.map(({ title, meas, pred, per, rangeStart, rangeEnd, rangeMin, rangeMax }) => {
                if (!pred) {
                    pred = 5;
                    rangeMin = 0;
                    rangeStart = 3;
                    rangeEnd = 7;
                    rangeMax = 10;
                } else {
                    if (!rangeStart) rangeStart = (pred * 0.7).toFixed(2);
                    if (!rangeEnd) rangeEnd = (pred * 1.3).toFixed(2);
                    if (!rangeMin) rangeMin = (rangeStart * 0.7).toFixed(2);
                    if (!rangeMax) rangeMax = (rangeEnd * 1.3).toFixed(2);
                }

                const range = !!rangeStart || !!rangeEnd ? `${rangeStart}~${rangeEnd}` : "-";
                const length = rangeMax - rangeMin;
                const a = rangeStart - rangeMin;
                const b = pred - rangeStart;
                const c = rangeEnd - pred;
                const d = rangeMax - rangeEnd;
                let point = ((meas - rangeMin) / length) * 100;

                const hasPoint = !!meas && !isNaN(point);
                if (point > 100) point = 100;
                if (point < 0) point = 0;

                return (
                    <ListItem key={title}>
                        <Typography flex={1.5} style={{ textAlign: "left" }}>
                            {title}
                        </Typography>
                        <Typography flex={1}>{meas || "-"}</Typography>
                        <Typography flex={1}>{pred || "-"}</Typography>
                        <Typography flex={1}>{per || "-"}</Typography>
                        <Typography flex={1.5}>{range}</Typography>
                        <Stack flex={1.5} height={20} px={1}>
                            {hasPoint && (
                                <Stack direction="row" border="1px solid #000" flex={1} position="relative" borderRadius="6px">
                                    <Stack flex={a} bgcolor="#6A6C64" sx={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }} />
                                    <Stack flex={b} bgcolor="#C1C4C4" />
                                    <Divider orientation="vertical" sx={{ bgcolor: "#000" }} />
                                    <Stack flex={c} bgcolor="#C1C4C4" />
                                    <Stack flex={d} bgcolor="#6A6C64" sx={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} />
                                    <Stack
                                        sx={{
                                            position: "absolute",
                                            width: 5,
                                            height: 5,
                                            bgcolor: "#000",
                                            top: "50%",
                                            transform: "translateY(-50%) translateX(-50%)",
                                            left: `${point}%`,
                                            borderRadius: "50%",
                                        }}
                                    />
                                </Stack>
                            )}
                        </Stack>
                    </ListItem>
                );
            })}
        </List>
    );
};
