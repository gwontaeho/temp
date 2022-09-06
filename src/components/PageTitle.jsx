import { Stack, Typography } from "@mui/material";

export const PageTitle = (props) => {
    const { children } = props;

    return (
        <Stack>
            <Typography>{children}</Typography>
        </Stack>
    );
};
