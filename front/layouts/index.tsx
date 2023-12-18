import { ReactNode, useEffect } from "react";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const theme = createTheme({
    components: { MuiTextField: { defaultProps: { size: "small" } } },
});

type Props = {
    children?: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isSigned = status === "authenticated";
    const isAdmin = session?.role === "admin";

    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <Stack component="header" direction="row" alignItems="center" justifyContent="space-between" p={5}>
                    <Stack>
                        <Link href="/">로고</Link>
                    </Stack>
                    <Stack>
                        <Link href="/">123</Link>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        {isSigned ? (
                            <>
                                {isAdmin ? (
                                    <button onClick={() => router.push("/admin")}>admin</button>
                                ) : (
                                    <button onClick={() => router.push("/user")}>user</button>
                                )}
                                <button onClick={() => signOut()}>signOut</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => router.push("/signin")}>signin</button>
                                <button onClick={() => router.push("/signup")}>signup</button>
                            </>
                        )}
                    </Stack>
                </Stack>
                <Stack component="main">{children}</Stack>
                <Stack component="footer"></Stack>
            </Stack>
        </ThemeProvider>
    );
};

export const SubLayout = ({ children }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <Stack alignItems="center" justifyContent="center" height="100vh">
                {children}
            </Stack>
        </ThemeProvider>
    );
};

export const AdminLayout = ({ children }: Props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" || session?.role === "user") router.replace("/");
    }, [session, status]);

    if (status !== "authenticated" || session?.role !== "admin") return null;

    return (
        <MainLayout>
            <Stack direction="row" p={5} spacing={5}>
                <Stack>nav</Stack>
                <Stack flex={1}>{children}</Stack>
            </Stack>
        </MainLayout>
    );
};
