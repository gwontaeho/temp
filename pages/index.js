import { Stack } from "@mui/material";
import { getCookie } from "cookies-next";

export default function Home() {
    return <Stack px={10} p={5}></Stack>;
}

export const getServerSideProps = ({ req, res }) => {
    const token = getCookie("token", { req, res });
    if (!token) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
