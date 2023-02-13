import { Stack, ButtonGroup, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { getCookie } from "cookies-next";

import { getInquiries, acceptInquiry, rejectInquiry } from "@/apis";

export default function inquiries() {
    const { data, refetch } = useQuery({
        queryKey: ["inquiries"],
        queryFn: getInquiries,
    });

    const { mutate: acceptMutate } = useMutation({
        mutationFn: (variables) => acceptInquiry(variables),
        onSettled: refetch,
    });

    const { mutate: rejectMutate } = useMutation({
        mutationFn: (variables) => rejectInquiry(variables),
        onSettled: refetch,
    });

    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
        {
            field: "company_name",
            headerName: "업체명",
            width: 150,
        },
        {
            field: "phone",
            headerName: "연락처",
            width: 150,
        },
        {
            field: "accept",
            headerName: "승인",
            width: 150,
            sortable: false,
            renderCell: ({ row }) => {
                const { id, company_name } = row;

                const handleClickAccept = () => {
                    const result = confirm("업체등록을 승인합니다");
                    if (result) acceptMutate({ id, company_name });
                };

                const handleClickReject = () => {
                    const result = confirm("업체등록을 거부합니다");
                    if (result) rejectMutate({ id });
                };
                return (
                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={handleClickAccept}>승인</Button>
                        <Button onClick={handleClickReject}>거부</Button>
                    </ButtonGroup>
                );
            },
        },
    ];

    if (!data) return null;

    return (
        <Stack p={5} height={500} width={800}>
            <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
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
