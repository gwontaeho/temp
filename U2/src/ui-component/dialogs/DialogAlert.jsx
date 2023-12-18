import { makeStyles } from "@mui/styles";
import { Dialog as MuiDialog, DialogTitle as MuiDialogTitle, DialogContent, DialogActions as MuiDialogActions, Button, IconButton } from "@mui/material";
import { CloseIcon } from "../icons/icons";

const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: "5rem",
        margin: "1.4rem 0 0.6rem",
        padding: "0 4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontWeight: 500,
        lineHeight: "2rem",
        whiteSpace: "pre-line",
        "& > span": {
            color: theme.palette.error.main,
        },
    },
    action: {
        padding: "1rem 4rem 2rem",
        "& > button": {
            height: "3rem",
            maxWidth: "20rem",
        },
    },
}));

export default function DialogAlert({
    title = "",
    children,
    hasClose = true,
    onClose,
    okText = "확인",
    cancelText = "취소",
    hasCancel = false,
    maxWidth = "sm",
}) {
    const classes = useStyles();

    return (
        <MuiDialog open={true} maxWidth={maxWidth}>
            <MuiDialogTitle>
                {title}
                {hasClose && (
                    <IconButton
                        onClick={() => onClose(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            p: 1.8,
                        }}
                    >
                        {CloseIcon({ selected: false })}
                    </IconButton>
                )}
            </MuiDialogTitle>

            <DialogContent className={classes.content}>{children}</DialogContent>

            <MuiDialogActions className={classes.action}>
                {hasCancel && (
                    <Button size="large" fullWidth onClick={() => onClose(false)}>
                        {cancelText}
                    </Button>
                )}
                <Button size="large" color="primary" fullWidth onClick={() => onClose(true)}>
                    {okText}
                </Button>
            </MuiDialogActions>
        </MuiDialog>
    );
}
