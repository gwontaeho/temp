import { Layout, Group, Table, FormControl, Button } from "@/components";

export const GroupEx = () => {
  return (
    <Layout>
      <Group>
        <Group.Header>그룹헤더</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control label="group control + label" />
          </Group.Row>
          <Group.Row>
            <Group.Col label="group col + label"></Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Label label="group label" />
            <Group.Col colSize={10}>
              <FormControl.Group>
                <FormControl />
                <FormControl />
                <FormControl type="select" options={[{ label: "a", value: "a" }]} />
                <FormControl type="date" />
              </FormControl.Group>
            </Group.Col>
          </Group.Row>
        </Group.Body>
      </Group>
      <Group>
        <Group.Body>
          <Table border={false}>
            <Table.Tr>
              <Table.Td>
                <a href="#Group">Group</a>
              </Table.Td>
              <Table.Td>
                <a>Group.Header</a>
              </Table.Td>
              <Table.Td>
                <a>Group.Body</a>
              </Table.Td>
              <Table.Td>
                <a>Group.Row</a>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <a>Group.Col</a>
              </Table.Td>
              <Table.Td>
                <a>Group.Label</a>
              </Table.Td>
              <Table.Td>
                <a>Group.Control</a>
              </Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>
    </Layout>
  );
};
