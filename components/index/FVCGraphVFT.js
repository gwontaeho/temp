import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, Divider } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";

import { getGraphs } from "@/apis";

const colors = ["#0180BE", "#869FF0", "#53D9E8", "#04A283", "#6CDCB6", "#FFB98B", "#FF7C7C", "#EB8DEB", "#C3CAD2", "#606060"];

export const FVCGraphVFT = ({ simple }) => {
    const type = "FVC";
    const { examineeId, date, fvc } = useSelector((state) => state.main);
    const selectedIds = fvc.selectedIds;

    const { data } = useQuery({
        queryKey: ["graphs", type, examineeId, date],
        queryFn: () => getGraphs({ examineeId, type, graphType: "volume-flow,time-volume", date }),
        enabled: !!examineeId && !!date,
    });

    const graphs = data?.response || [];

    const vfs = graphs
        .filter((v) => v.graphType === "volume-flow" && selectedIds.includes(v.measurementId))
        .map((v) => ({ id: v.measurementId, data: v.graph, i: simple.findIndex((vv) => vv.measurementId === v.measurementId) }));

    const tvs = graphs
        .filter((v) => v.graphType === "time-volume" && selectedIds.includes(v.measurementId))
        .map((v) => ({ id: v.measurementId, data: v.graph, i: simple.findIndex((vv) => vv.measurementId === v.measurementId) }));

    const initMaxY = 1.4;
    const initMinY = -0.8;
    const initMaxX = 1.6;

    const getMaxRatio = () => {
        const map = vfs.map((v) => v.data).flat();

        const ratioMaxY = map.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
        const ratioMinY = map.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
        const ratioMaxX = map.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"] / initMaxX;
        return Math.max(ratioMaxY, ratioMinY, ratioMaxX);
    };

    const maxY = Math.ceil(initMaxY * getMaxRatio());
    const minY = Math.floor(initMinY * getMaxRatio());
    const maxX = Math.ceil(initMaxX * getMaxRatio());

    const mid = Math.abs(minY) / (Math.abs(minY) + maxY);

    const mapTv = tvs.map((v) => v.data).flat();
    const maxTvX = Math.ceil(mapTv.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"]);
    const maxTvY = Math.ceil(mapTv.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"]);

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
            boxShadow: "0px 3px 6px  #0000001A",
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: "spirokit.border",
            height: 400,
            position: "relative",
        },
    };

    return (
        <>
            <Stack flex={1}>
                <Typography variant="subtitle1" height={48}>
                    볼륨 / 플로우
                </Typography>
                <Stack {...styles.card}>
                    <ResponsiveLine
                        colors={(v) => colors[v.i % 10]}
                        data={vfs}
                        margin={{ top: 30, right: 25, bottom: 60, left: 50 }}
                        xScale={{ type: "linear", min: 0, max: maxX }}
                        yScale={{ type: "linear", min: minY, max: maxY }}
                        curve="natural"
                        axisBottom={{
                            tickValues: getTicks(maxX),
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
                        gridXValues={getTicks(maxX)}
                        gridYValues={getTicks(maxY, minY)}
                        theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
                    />
                    <Typography variant="caption" color="primary" sx={{ position: "absolute", p: 1 }}>
                        Flow(l/s)
                    </Typography>
                    <Typography variant="caption" color="primary" sx={{ position: "absolute", bottom: 0, right: 0, p: 1 }}>
                        Volume(V)
                    </Typography>
                    <Divider
                        sx={{
                            position: "absolute",
                            left: 50,
                            bottom: `calc((100% - 90px) * ${mid} + 59px)`,
                            bgcolor: "#5DC5D5",
                            width: "calc(100% - 75px)",
                            height: "2px",
                        }}
                    />
                </Stack>
            </Stack>
            <Stack flex={1}>
                <Typography variant="subtitle1" height={48}>
                    볼륨 / 타임
                </Typography>
                <Stack {...styles.card}>
                    <ResponsiveLine
                        colors={(v) => colors[v.i % 10]}
                        data={tvs}
                        margin={{ top: 30, right: 25, bottom: 60, left: 50 }}
                        xScale={{ type: "linear", min: 0, max: maxTvX }}
                        yScale={{ type: "linear", min: 0, max: maxTvY }}
                        curve="natural"
                        axisBottom={{
                            tickValues: getTicks(maxTvX),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".2f",
                        }}
                        axisLeft={{
                            tickValues: getTicks(maxTvY),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".2f",
                        }}
                        lineWidth={1}
                        enablePoints={false}
                        gridXValues={getTicks(maxTvX)}
                        gridYValues={getTicks(maxTvY)}
                        theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
                    />
                    <Typography variant="caption" color="primary" sx={{ position: "absolute", p: 1 }}>
                        Volume(V)
                    </Typography>
                    <Typography variant="caption" color="primary" sx={{ position: "absolute", bottom: 0, right: 0, p: 1 }}>
                        Time(s)
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};
