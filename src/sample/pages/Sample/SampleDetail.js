import { useNavigate, useParams } from "react-router-dom";
import { useWijmo, useFetch } from "@/hooks";
import { Wijmo, Group, Layout, Button, Navigation, PageHeader, Tab } from "@/components";
import { SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

/**
 * 샘플 상세 페이지
 */
export const SampleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const grid1 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });
  const grid2 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });
  const grid3 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });

  const {
    data: [group, components],
  } = useFetch({
    api: [() => APIS.getComponentGroup(id), () => APIS.getComponents(id)],
    enabled: true,
  });

  console.log(group);

  return (
    <Layout>
      <Navigation base="/page/sample" nodes={[{ path: "/", label: "List" }, { label: "Detail" }]} />
      <PageHeader title="Sample Detail" description="Sample Detail Description" />

      <Group>
        <Group.Body>
          <Group.Row>
            <Group.Col label="id">{group.id}</Group.Col>
          </Group.Row>
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
        <Tab tab={["첫번째", "두번째", "세번째"]}>
          <Tab.Panel>
            <Wijmo {...grid1.grid} data={components} />
          </Tab.Panel>
          <Tab.Panel>
            <Wijmo {...grid2.grid} data={components} />
          </Tab.Panel>
          <Tab.Panel>
            <Wijmo {...grid3.grid} data={components} />
          </Tab.Panel>
        </Tab>
      </Group>
    </Layout>
  );
};
