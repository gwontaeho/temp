import { Stack } from "@mui/material";

export const Card = (props: any) => {
    const { children, ...rest } = props;
    return (
        <Stack border="1px solid #ddd" borderRadius={1} p={3} {...rest}>
            {children}
        </Stack>
    );
};
