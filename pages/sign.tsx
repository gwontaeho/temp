import { Stack, TextField, Typography } from "@mui/material";

const Page = () => {
    return (
        <Stack width="100vw" alignItems="center" p={5}>
            <Stack border="1px solid black" width={400} alignItems="center" maxWidth="sm" p={3} spacing={3}>
                <Typography>앙</Typography>
                <TextField label="id" fullWidth />
                <TextField label="password" fullWidth />
            </Stack>
        </Stack>
    );
};

export default Page;
