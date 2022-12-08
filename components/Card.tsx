import { Stack } from "@mui/material";

export const Card = (props: any) => {
    const { children, ...rest } = props;
    return (
        <Stack border="1px solid #ddd" borderRadius={1} p={3} sx={{ ":hover": { boxShadow: 2, transition: "0.1s" } }} {...rest}>
            {children}
        </Stack>
    );
};
