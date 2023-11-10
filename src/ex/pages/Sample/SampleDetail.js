import { useNavigate, useParams } from "react-router-dom";
import { Grid, Group, Flex } from "@/components";
import { useGrid, useFetch } from "@/hooks";
import { SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

export const SampleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { grid } = useGrid({ defaultSchema: SCHEMA_GRID_COMPONENTS() });

  const {
    data: [group, components],
  } = useFetch({
    api: [() => APIS.getComponentGroup(id), () => APIS.getComponents(id)],
    enabled: true,
  });

  return (
    <Flex>
      <Group>
        <Group.Header>Search Example</Group.Header>
        <Group.Body>
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
        </Group.Body>
        <Group.Footer>
          <Group.Left>
            <Group.Button onClick={() => navigate("/page/sample")}>목록</Group.Button>
          </Group.Left>
          <Group.Right>
            <Group.Button onClick={() => navigate(`/page/sample/${id}/update`)}>수정</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>
      <Group>
        <Group.Body>
          <Grid {...grid} data={components} />
        </Group.Body>
      </Group>
    </Flex>
  );
};
