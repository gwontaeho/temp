import { Stack, Grid, Typography, Divider } from "@mui/material";

export const FVCBar = ({ cData }) => {
    const c = cData?.response;
    const compare = c?.compare || [];

    const bars = [
        { title: "FVC (L)", data: compare.find((v) => v.title === "FVC") || {} },
        { title: "FEV1 (L)", data: compare.find((v) => v.title === "FEV1") || {} },
        { title: "FEV1%", data: compare.find((v) => v.title === "FEV1%") || {} },
    ];

    const styles = {
        card: { bgcolor: "#fff", p: 3, borderRadius: 1.5, boxShadow: "0px 3px 6px #0000001A" },
    };

    return (
        <Stack>
            <Grid container spacing={3}>
                {bars.map(({ title, data }) => {
                    let { pre, pred, post, rangeEnd, rangeStart, rangeMax, rangeMin } = data;

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

                    const length = rangeMax - rangeMin;
                    const a = ((rangeStart - rangeMin) / length) * 100;
                    const b = ((rangeEnd - rangeMin) / length) * 100;
                    let pointPre = ((pre - rangeMin) / length) * 100;
                    let pointPost = ((post - rangeMin) / length) * 100;
                    const hasPre = !!pre && !isNaN(pointPre);
                    const hasPost = !!post && !isNaN(pointPost);
                    if (pointPre > 100) pointPre = 100;
                    if (pointPre < 0) pointPre = 0;
                    if (pointPost > 100) pointPost = 100;
                    if (pointPost < 0) pointPost = 0;

                    return (
                        <Grid item xs={6} key={title}>
                            <Stack {...styles.card}>
                                <Typography variant="subtitle1" height={48}>
                                    {title}
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography variant="body2">Pre</Typography>
                                    <Stack
                                        borderRadius={4}
                                        border="1px solid"
                                        borderColor="spirokit.red.1"
                                        bgcolor="spirokit.red.2"
                                        height={32}
                                        position="relative"
                                    >
                                        {!isNaN(a) && (
                                            <Divider orientation="vertical" sx={{ bgcolor: "spirokit.red.1", position: "absolute", left: `${a}%` }} />
                                        )}
                                        {!isNaN(b) && (
                                            <Divider orientation="vertical" sx={{ bgcolor: "spirokit.red.1", position: "absolute", left: `${b}%` }} />
                                        )}
                                        {hasPre && (
                                            <Stack
                                                sx={{
                                                    transform: "translateX(-50%)",
                                                    left: `${pointPre}%`,
                                                    top: `${10}%`,
                                                    position: "absolute",
                                                    width: 10,
                                                    height: 10,
                                                    opacity: 0.8,
                                                }}
                                            >
                                                <Stack
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "primary.main",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 1.5,
                                                        width: 60,
                                                        height: 30,
                                                        bgcolor: "#fff",
                                                        position: "absolute",
                                                        bottom: "100%",
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                    }}
                                                >
                                                    <Typography variant="caption">{pre}</Typography>
                                                </Stack>
                                                <Stack
                                                    sx={{
                                                        position: "absolute",
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "#fff",
                                                        borderRight: "1px solid",
                                                        borderBottom: "1px solid",
                                                        borderColor: "primary.main",
                                                        transform: "rotate(45deg)",
                                                        bottom: 5,
                                                    }}
                                                />
                                            </Stack>
                                        )}
                                        {hasPost && (
                                            <Stack
                                                sx={{
                                                    transform: "translateX(-50%)",
                                                    left: `${pointPost}%`,
                                                    bottom: `${10}%`,
                                                    position: "absolute",
                                                    width: 10,
                                                    height: 10,
                                                    opacity: 0.8,
                                                }}
                                            >
                                                <Stack
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "primary.main",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 1.5,
                                                        width: 60,
                                                        height: 30,
                                                        bgcolor: "#fff",
                                                        position: "absolute",
                                                        top: "100%",
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                    }}
                                                >
                                                    <Typography variant="caption">{post}</Typography>
                                                </Stack>
                                                <Stack
                                                    sx={{
                                                        position: "absolute",
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "#fff",
                                                        borderTop: "1px solid",
                                                        borderLeft: "1px solid",
                                                        borderColor: "primary.main",
                                                        transform: "rotate(45deg)",
                                                        top: 5,
                                                    }}
                                                />
                                            </Stack>
                                        )}
                                    </Stack>
                                    <Typography variant="body2">Post</Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};
