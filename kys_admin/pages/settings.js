import { Stack, Switch, FormControlLabel } from "@mui/material";
import { getCookie } from "cookies-next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/apis";

export default function Settings() {
    const { data, refetch } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    const { mutate } = useMutation({
        mutationFn: (variables) => updateSettings(variables),
        onSettled: refetch,
    });

    const mode = (data || []).find((v) => v.type === "test")?.status;

    const handleChangeMode = (e) => {
        mutate({ status: e.target.checked, type: "test" });
    };

    return (
        <Stack px={10} p={5}>
            <FormControlLabel label="테스트 모드" control={<Switch checked={mode} onChange={handleChangeMode} />} />
        </Stack>
    );
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
