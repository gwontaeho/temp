import { Stack, Typography } from "@mui/material";
import { hasCookie } from "cookies-next";
import { useSelector } from "react-redux";
import Image from "next/image";

import { Header, Footer } from "@/components/common";
import { Nav, FVC, SVC } from "@/components/index";
import empty from "@/public/empty.png";

export default function Home() {
    const { examineeId } = useSelector((state) => state.main);

    const styles = {
        card: {
            bgcolor: "#f5f5f5",
            borderRadius: 1.5,
            boxShadow: "0px 3px 6px #0000001A",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
        },
    };

    return (
        <Stack minHeight="100vh" width={1920}>
            <Header />
            <Stack direction="row" flex={1}>
                <Nav />
                <Stack flex={1}>
                    <Stack component="main" bgcolor="spirokit.bg" p={3} spacing={5} flex={1}>
                        {!!examineeId ? (
                            <>
                                <FVC />
                                <SVC />
                            </>
                        ) : (
                            <Stack {...styles.card}>
                                <Image priority src={empty} alt="logo" width={250} />
                                <Typography fontSize={30} sx={{ opacity: 0.4 }}>
                                    환자를 먼저 선택해주세요
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                    <Footer />
                </Stack>
            </Stack>
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const accessToken = hasCookie("accessToken", { req, res });

    if (!accessToken) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
