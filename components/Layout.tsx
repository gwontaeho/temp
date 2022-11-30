import { Divider, Stack } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Nav = () => {
    return (
        <Stack component="nav" width={200} height="100vh">
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="testtest" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="testtest" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="testtest" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack>
    );
};

const Main = () => {
    return (
        <Stack component="main" p={5}>
            asdasdas
        </Stack>
    );
};

export default ({ children }) => {
    return (
        <Stack direction="row">
            <Nav />
            <Divider orientation="vertical" flexItem />
            <Main>{children}</Main>
        </Stack>
    );
};
