import { useNavigate, useParams } from "react-router-dom";
import { Wijmo, Group, Layout, Button } from "@/components";
import { useWijmo, useFetch } from "@/hooks";
import { SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

export const SampleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { grid } = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });

  const {
    data: [group, components],
  } = useFetch({
    api: [() => APIS.getComponentGroup(id), () => APIS.getComponents(id)],
    enabled: true,
  });

  return (
    <Layout>
      <Group>
        <Group.Header>Search Example</Group.Header>

        <Group.Table>
          <Group.Row>
            <Group.Col label="text">{group.textField}</Group.Col>
            <Group.Col label="password">{group.passwordField}</Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Col label="integer">{group.integerField}</Group.Col>
            <Group.Col label="select">{group.selectField}</Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Col label="date">{group.dateField}</Group.Col>
            <Group.Col label="radio">{group.radioField}</Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Col label="textarea">{group.textareaField}</Group.Col>
          </Group.Row>
        </Group.Table>

        <Layout direction="row">
          <Layout.Left>
            <Button onClick={() => navigate("/page/sample")}>목록</Button>
          </Layout.Left>
          <Layout.Right>
            <Button onClick={() => navigate(`/page/sample/${id}/update`)}>수정</Button>
          </Layout.Right>
        </Layout>
      </Group>

      <Group>
        <Wijmo {...grid} data={components} />
      </Group>
    </Layout>
  );
};
