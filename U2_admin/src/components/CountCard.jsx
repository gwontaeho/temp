import { Stack, Typography } from "@mui/material";

export const CountCard = (props) => {
    const { label, count, color } = props;
    return (
        <Stack direction="row" bgcolor="_bg.main" p={1}>
            <Stack direction="row" spacing={5}>
                <Typography variant="caption">{label}</Typography>
                <Typography variant="caption" fontWeight="bold">
                    {count}
                </Typography>
            </Stack>
        </Stack>
    );
};
