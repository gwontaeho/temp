import { Stack, TextField, Typography, Button } from "@mui/material";
import { Card } from "components";

const Page = () => {
    return (
        <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
            <Card>
                <TextField label="id" fullWidth sx={{ mb: 3 }} />
                <TextField label="password" fullWidth sx={{ mb: 3 }} />
                <Button variant="contained" fullWidth>
                    로그인
                </Button>
            </Card>
        </Stack>
    );
};

export default Page;
