import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { getFev1 } from "@/apis";

export const FVCGraphTrend = () => {
    const { examineeId } = useSelector((state) => state.main);

    const to = dayjs().format("YYYY-MM");
    const from = dayjs(to).subtract(12, "M").format("YYYY-MM");

    const { data } = useQuery({
        queryKey: ["fev1", examineeId],
        queryFn: () => getFev1({ examineeId, from, to }),
        enabled: !!examineeId,
    });

    const pos = (data?.response || []).map((v) => ({ x: v.date, y: v.fev1 }));
    let max = pos.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: 0 })["y"];
    max = Math.ceil(max / 1.25) * 1.25;

    const tickValues = new Array(max / 1.25 + 1).fill(0).map((v, i) => 1.25 * i);

    const styles = {
        card: {
            bgcolor: "#fff",
            p: 3,
            borderRadius: 1.5,
            boxShadow: "0px 3px 6px #0000001A",
        },
    };

    const graphData = [{ id: `trend_${examineeId}`, data: pos }];

    return (
        <Stack {...styles.card}>
            <Typography variant="subtitle1" height={48}>
                FEV1 변화 추이
            </Typography>
            <Stack height={400} sx={{ boxShadow: "0px 3px 6px  #0000001A", borderRadius: 1.5, border: "1px solid", borderColor: "spirokit.border" }}>
                {!!data && (
                    <ResponsiveLine
                        data={graphData}
                        colors="#0180BE"
                        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                        xScale={{ type: "point" }}
                        yScale={{ type: "linear", min: 0, max }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                        }}
                        axisLeft={{
                            tickValues,
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".2f",
                        }}
                        gridYValues={tickValues}
                        lineWidth={1}
                    />
                )}
            </Stack>
        </Stack>
    );
};
