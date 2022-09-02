import { Stack, Typography, IconButton } from "@mui/material";
import { Icon } from "../assets/icons";

export const ViewTitle = (props) => {
    const { icon, title, onClick } = props;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Icon name={icon} size={24} {...(onClick && { onClick })} style={{ cursor: onClick && "pointer" }} />

            <Typography variant="_title">{title}</Typography>
        </Stack>
    );
};
