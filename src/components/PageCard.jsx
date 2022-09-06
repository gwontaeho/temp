import { Stack } from "@mui/material";

export const PageCard = (props) => {
    const { children } = props;

    return (
        <Stack {...props} bgcolor="#fff" p={3} borderRadius={3}>
            {children}
        </Stack>
    );
};
