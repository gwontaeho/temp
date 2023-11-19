import { FormControl, Layout, Table, Group } from "@/components";

export const TableEx = () => {
    return (
        <Layout>
            <Group>
                <Group.Header>Table 예제</Group.Header>
                <Table>
                    <Table.Tr>
                        <Table.Th required={true}>
                            <FormControl />
                        </Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td rowSpan={2}></Table.Td>
                        <Table.Td>
                            <FormControl />
                        </Table.Td>
                        <Table.Td>
                            <FormControl type="date" />
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            <FormControl type="select" />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th required={true}></Table.Th>
                        <Table.Td required={true}>table example</Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                </Table>
            </Group>
        </Layout>
    );
};
