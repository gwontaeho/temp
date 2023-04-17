import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { ResultList } from "@/components/common";
import { getDetailResult } from "@/apis";

export const FVCDetail = ({ cData }) => {
    const type = "FVC";
    const { examineeId, date } = useSelector((state) => state.main);

    const c = cData?.response;
    const postId = c?.postId;
    const preId = c?.preId;

    const { data } = useQuery({
        queryKey: ["detail", type, examineeId, date],
        queryFn: () => getDetailResult({ examineeId, type, date, measurementIds: [postId, preId].filter(Boolean) }),
        enabled: !!examineeId && !!date && !!cData,
    });

    const pre = (data?.response || []).find((v) => v.medicationState === "PRE")?.results || [];
    const post = (data?.response || []).find((v) => v.medicationState === "POST")?.results || [];

    return (
        <>
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
        </>
    );
};
