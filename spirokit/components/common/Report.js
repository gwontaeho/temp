import { ResponsiveLine } from "@nivo/line";
import { Stack, Typography, Divider } from "@mui/material";
import Image from "next/image";

import Grid from "@mui/material/Unstable_Grid2";
import logo2 from "@/public/logo2.svg";

const Result = ({ results }) => {
    if (results.length < 11) for (let i = 0; results.length < 11; i++) results.push({ key: `result-empty-${i}` });
    return (
        <Stack sx={{ "& div:not(.DIV)": { display: "flex", justifyContent: "center" }, mb: "20px" }}>
            <Grid container columns={7} fontSize={24} alignItems="flex-end" borderBottom={1} fontWeight={600} pb="20px" mb="20px">
                <Grid xs={1} className="DIV">
                    DIV
                </Grid>
                <Grid xs={1}>UNIT</Grid>
                <Grid xs={1}>
                    Pre
                    <br />
                    MEAS
                </Grid>
                <Grid xs={1}>
                    Pre
                    <br />
                    PRED
                </Grid>
                <Grid xs={1}>
                    Pre
                    <br />
                    %PRED
                </Grid>
                <Grid xs={1}>
                    Post
                    <br />
                    MEAS
                </Grid>
                <Grid xs={1}>
                    Post
                    <br />
                    %CHG
                </Grid>
            </Grid>
            {results.map((result) => {
                const { key, title, unit, preMeas, prePred, prePer, postMeas, postChg } = result;
                if (!!key) return <Grid key={key} height={36} />;
                return (
                    <Grid key={title} container columns={7} fontSize={24} fontWeight={500} height={36}>
                        <Grid xs={1} className="DIV">
                            {!!title ? title : "-"}
                        </Grid>
                        <Grid xs={1}>{!!unit ? unit : "-"}</Grid>
                        <Grid xs={1}>{!!preMeas ? preMeas : "-"}</Grid>
                        <Grid xs={1}>{!!prePred ? prePred : "-"}</Grid>
                        <Grid xs={1}>{!!prePer ? prePer : "-"}</Grid>
                        <Grid xs={1}>{!!postMeas ? postMeas : "-"}</Grid>
                        <Grid xs={1}>{!!postChg ? postChg : "-"}</Grid>
                    </Grid>
                );
            })}
        </Stack>
    );
};

const Info = ({ info }) => {
    const columnLeft = info.slice(0, 9);
    const columnRight = info.slice(9);
    if (columnRight.length < 9)
        for (let i = 0; columnRight.length < 9; i++) {
            columnRight.push({ key: `columnRightEmpty${i}` });
        }

    const styles = {
        row: { "& > div": { pl: "5px" }, height: 32, fontSize: 20, fontWeight: 500, display: "flex" },
    };

    return (
        <Stack direction="row" mb="16px">
            <Grid
                container
                sx={{
                    borderTop: "1px solid #000",
                    borderLeft: "1px solid #000",
                    "& > div > div": {
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                    },
                }}
            >
                {columnLeft.map(({ title, content }) => {
                    return (
                        <Grid key={title} xs={12} sx={styles.row}>
                            <Stack flex={1}>{title}</Stack>
                            <Stack flex={1}>{content}</Stack>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid
                container
                sx={{
                    borderTop: "1px solid #000",
                    "& > div > div": {
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                    },
                }}
            >
                {columnRight.map(({ key, title, content }) => {
                    return (
                        <Grid key={key || title} xs={12} sx={styles.row}>
                            <Stack flex={1}>{title}</Stack>
                            <Stack flex={1}>{content}</Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

const FVC = ({ graphs }) => {
    const colors = ["#FF1E20", "#3B7EA9"];

    const vfs = graphs
        .filter((v) => v.graphType === "volume-flow")
        .map((v) => ({ id: v.measurementId, data: v.graph, sort: v.medicationState === "PRE" ? 0 : 1 }));
    const tvs = graphs
        .filter((v) => v.graphType === "time-volume")
        .map((v) => ({ id: v.measurementId, data: v.graph, sort: v.medicationState === "PRE" ? 0 : 1 }));

    vfs.sort((a, b) => a.sort - b.sort);
    tvs.sort((a, b) => a.sort - b.sort);

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

    return (
        <Stack direction="row">
            <Stack width="50%">
                <Typography fontSize={20} textAlign="center">
                    Volume(L) - Flow(L/s) graph
                </Typography>
                <Stack height={380} position="relative">
                    <ResponsiveLine
                        colors={colors}
                        data={vfs}
                        margin={{ bottom: 40, left: 40, right: 20 }}
                        xScale={{ type: "linear", min: 0, max: maxX }}
                        yScale={{ type: "linear", min: minY, max: maxY }}
                        curve="natural"
                        axisBottom={{
                            tickValues: getTicks(maxX),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".1f",
                        }}
                        axisLeft={{
                            tickValues: getTicks(maxY, minY),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".1f",
                        }}
                        lineWidth={1}
                        enablePoints={false}
                        gridXValues={getTicks(maxX)}
                        gridYValues={getTicks(maxY, minY)}
                        theme={{ axis: { domain: { line: { stroke: "#000" } }, ticks: { text: { fontSize: 16 } } } }}
                    />
                    <Divider
                        sx={{
                            position: "absolute",
                            left: 40,
                            bgcolor: "#000",
                            width: "calc(100% - 60px)",
                        }}
                    />
                    <Divider
                        orientation="vertical"
                        sx={{
                            position: "absolute",
                            right: 20,
                            bgcolor: "#000",
                            height: "calc(100% - 40px)",
                        }}
                    />
                </Stack>
            </Stack>
            <Stack width="50%">
                <Typography fontSize={20} textAlign="center">
                    Time(s) - Volume(L) graph
                </Typography>
                <Stack height={380} position="relative">
                    <ResponsiveLine
                        colors={colors}
                        data={tvs}
                        margin={{ bottom: 40, left: 40, right: 20 }}
                        xScale={{ type: "linear", min: 0, max: maxTvX }}
                        yScale={{ type: "linear", min: 0, max: maxTvY }}
                        curve="natural"
                        axisBottom={{
                            tickValues: getTicks(maxTvX),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".1f",
                        }}
                        axisLeft={{
                            tickValues: getTicks(maxTvY),
                            tickSize: 5,
                            tickPadding: 5,
                            format: ".1f",
                        }}
                        lineWidth={1}
                        enablePoints={false}
                        gridXValues={getTicks(maxTvX)}
                        gridYValues={getTicks(maxTvY)}
                        theme={{ axis: { domain: { line: { stroke: "#000" } }, ticks: { text: { fontSize: 16 } } } }}
                    />
                    <Divider
                        sx={{
                            position: "absolute",
                            left: 40,
                            bgcolor: "#000",
                            width: "calc(100% - 60px)",
                        }}
                    />
                    <Divider
                        orientation="vertical"
                        sx={{
                            position: "absolute",
                            right: 20,
                            bgcolor: "#000",
                            height: "calc(100% - 40px)",
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

const SVC = ({ graphs }) => {
    const colors = ["#FF1E20", "#3B7EA9"];

    const tvs = graphs.map((v) => ({ id: v.measurementId, data: v.graph, sort: v.medicationState === "PRE" ? 0 : 1 }));

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

    return (
        <Stack>
            <Typography fontSize={20} textAlign="center">
                Time(s) - Volume(L) graph
            </Typography>
            <Stack height={380} position="relative">
                <ResponsiveLine
                    colors={colors}
                    data={tvs}
                    margin={{ bottom: 40, left: 40, right: 20 }}
                    xScale={{ type: "linear", min: 0, max: 60 }}
                    yScale={{ type: "linear", min: minY, max: maxY }}
                    curve="natural"
                    axisBottom={{
                        tickValues: [0, 10, 20, 30, 40, 50, 60],
                        tickSize: 5,
                        tickPadding: 5,
                        format: ".1f",
                    }}
                    axisLeft={{
                        tickValues: getTicks(maxY, minY),
                        tickSize: 5,
                        tickPadding: 5,
                        format: ".1f",
                    }}
                    lineWidth={1}
                    enablePoints={false}
                    gridXValues={[0, 10, 20, 30, 40, 50, 60]}
                    gridYValues={getTicks(maxY, minY)}
                    theme={{ axis: { domain: { line: { stroke: "#000" } }, ticks: { text: { fontSize: 16 } } } }}
                />
                <Divider
                    sx={{
                        position: "absolute",
                        left: 40,
                        bgcolor: "#000",
                        width: "calc(100% - 60px)",
                    }}
                />
                <Divider
                    orientation="vertical"
                    sx={{
                        position: "absolute",
                        right: 20,
                        bgcolor: "#000",
                        height: "calc(100% - 40px)",
                    }}
                />
            </Stack>
        </Stack>
    );
};

export const Report = ({ data, type }) => {
    const { info = [], results = [], graphs = [] } = data;

    const title = type === "FVC" ? "Forced Vital Capacity(FVC)" : "Slow Vital Capacity(SVC)";

    return (
        <Stack
        //  width={0} height={0} overflow="hidden"
        >
            <Stack id={`report-${type}`} width={1090} height={1682} minWidth={1090} minHeight={1682} bgcolor="#fff">
                <Image priority src={logo2} alt="logo" width={170} height={170} />
                <Stack px="82px">
                    <Info info={info} />
                    <Stack mb="6px" bgcolor="#ECECEC" height={38} fontSize={24} fontWeight={600} alignItems="center" justifyContent="center">
                        {title}
                    </Stack>
                    <Stack fontSize={28} fontWeight={700} color="#177200">
                        Spriometry (BTPS)
                    </Stack>
                    <Result results={results} />
                    <Stack bgcolor="#ECECEC" height={38} fontSize={24} fontWeight={600} alignItems="center" justifyContent="center">
                        Graph
                    </Stack>
                    <Stack direction="row" spacing="26px" py="26px">
                        <Stack color="#FF1E20" fontSize={24} fontWeight={600}>
                            PRE: RED
                        </Stack>
                        <Stack color="#3B7EA9" fontSize={24} fontWeight={600}>
                            POST: BLUE
                        </Stack>
                    </Stack>
                    {type === "FVC" && <FVC graphs={graphs} />}
                    {type === "SVC" && <SVC graphs={graphs} />}
                </Stack>
            </Stack>
        </Stack>
    );
};
