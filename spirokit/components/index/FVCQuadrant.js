import { Stack, Typography, Divider } from "@mui/material";

export const FVCQuadrant = ({ cData }) => {
    const { x, y } = cData?.response?.quadrant || {};

    const styles = {
        center: {
            alignItems: "center",
            justifyContent: "center",
        },
        label: {
            textAlign: "center",
            wordBreak: "keep-all",
            position: "absolute",
            opacity: 0.8,
        },
    };

    return (
        <Stack>
            <Typography variant="subtitle1" height={48}>
                결과
            </Typography>
            <Stack
                sx={{ boxShadow: "0px 3px 6px  #0000001A", borderRadius: 1.5, border: "1px solid", borderColor: "spirokit.border" }}
                width={400}
                height={400}
                position="relative"
            >
                <Divider sx={{ position: "absolute", bottom: `${70}%`, width: "100%", bgcolor: "spirokit.red.1", opacity: 0.6 }} />
                <Divider orientation="vertical" sx={{ position: "absolute", left: `${80}%`, bgcolor: "spirokit.red.1", opacity: 0.6 }} />

                <Stack direction="row" flex={3}>
                    <Stack flex={8} {...styles.center}>
                        <Typography sx={{ ...styles.label }} variant="body2">
                            제한성환기장애
                            <br />
                            (restrictive)
                        </Typography>
                    </Stack>
                    <Stack flex={2} {...styles.center}>
                        <Typography sx={{ ...styles.label }} variant="body2">
                            정상
                            <br />
                            (normal)
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" flex={7}>
                    <Stack flex={8} {...styles.center}>
                        <Typography sx={{ ...styles.label }} variant="body2">
                            혼합형환기장애
                            <br />
                            (Mixed)
                        </Typography>
                    </Stack>
                    <Stack flex={2} {...styles.center}>
                        <Typography sx={{ ...styles.label }} variant="body2">
                            폐쇄성
                            <br />
                            환기장애
                            <br />
                            (obstructive)
                        </Typography>
                    </Stack>
                </Stack>

                {!!x && !!y && (
                    <Stack
                        width={10}
                        height={10}
                        borderRadius="50%"
                        bgcolor="spirokit.red.1"
                        position="absolute"
                        left={`${x}%`}
                        bottom={`${y}%`}
                        sx={{ transform: "translateY(50%) translateX(-50%)", opacity: 0.8, zIndex: 2 }}
                    >
                        <Stack
                            sx={{
                                border: "1px solid",
                                borderColor: "spirokit.red.1",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 1.5,
                                width: 100,
                                height: 50,
                                bgcolor: "#fff",
                                position: "absolute",
                                bottom: "calc(100% + 10px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <Typography variant="caption">{`(${x}, ${y})`}</Typography>
                        </Stack>
                        <Stack
                            sx={{
                                position: "absolute",
                                width: 10,
                                height: 10,
                                bgcolor: "#fff",
                                borderRight: "1px solid",
                                borderBottom: "1px solid",
                                borderColor: "spirokit.red.1",
                                transform: "rotate(45deg)",
                                bottom: "calc(100% + 5px)",
                            }}
                        />
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};
