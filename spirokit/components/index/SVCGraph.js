import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";

import { getGraphs } from "@/apis";

export const SVCGraph = () => {
    const type = "SVC";
    const { examineeId, date, svc } = useSelector((state) => state.main);
    const selectedIds = svc?.selectedIds;

    const { data } = useQuery({
        queryKey: ["graphs", type, examineeId, date],
        queryFn: () => getGraphs({ examineeId, type, graphType: "time-volume", date }),
        enabled: !!examineeId && !!date,
    });

    const tvs = (data?.response || []).filter((v) => selectedIds.includes(v.measurementId)).map((v) => ({ id: v.measurementId, data: v.graph }));

    const initMaxY = 1.4;
    const initMinY = -0.8;

    const getMaxRatio = () => {
        const map = tvs.map((v) => v.data).flat();
        const ratioMaxY = map.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
        const ratioMinY = map.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
        return Math.max(ratioMaxY, ratioMinY);
    };

    const maxY = Math.ceil(initMaxY * getMaxRatio());
    const minY = Math.floor(initMinY * getMaxRatio());

    const getInterval = (value) => {
        const remainder = value % 10;
        if (remainder === 0) return value / 10;
        if (remainder <= 5) return Math.floor(value / 10) + 0.5;
        return Math.ceil(value / 10);
    };

    const getTicks = (max, min) => {
        const range = max + Math.abs(min);
        const interval = getInterval(!!min ? range : max);
        let a = [];
        for (let i = 0; i < max; i += interval) a.push(i);
        if (!!min) for (let i = -interval; i > minY; i -= interval) a.unshift(i);
        return a;
    };

    const styles = {
        card: {
            bgcolor: "#fff",
            p: 3,
            borderRadius: 1.5,
            boxShadow: "0px 3px 6px #0000001A",
        },
    };

    return (
        <Stack {...styles.card}>
            <Typography variant="subtitle1" height={48}>
                볼륨 / 플로우
            </Typography>
            <Stack height={400} sx={{ boxShadow: "0px 3px 6px  #0000001A", borderRadius: 1.5, border: "1px solid", borderColor: "spirokit.border" }}>
                <ResponsiveLine
                    data={tvs}
                    margin={{ top: 25, right: 25, bottom: 50, left: 50 }}
                    xScale={{ type: "linear", min: 0, max: 60 }}
                    yScale={{ type: "linear", min: minY, max: maxY }}
                    curve="natural"
                    axisBottom={{
                        tickValues: [0, 10, 20, 30, 40, 50, 60],
                        tickSize: 5,
                        tickPadding: 5,
                        format: ".2f",
                    }}
                    axisLeft={{
                        tickValues: getTicks(maxY, minY),
                        tickSize: 5,
                        tickPadding: 5,
                        format: ".2f",
                    }}
                    lineWidth={1}
                    enablePoints={false}
                    gridXValues={[0, 10, 20, 30, 40, 50, 60]}
                    gridYValues={getTicks(maxY, minY)}
                />
            </Stack>
        </Stack>
    );
};
