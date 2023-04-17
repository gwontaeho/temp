import { Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";

import logo from "@/public/logo.svg";

export const Header = () => {
    return (
        <Stack direction="row" minHeight={80} height={80} alignItems="center" justifyContent="space-between" px={5}>
            <Link href="/">
                <Image priority src={logo} alt="logo" width={160} />
            </Link>
            <Link href="/settings">
                <Button variant="text" startIcon={<SettingsOutlinedIcon />}>
                    설정
                </Button>
            </Link>
        </Stack>
    );
};
