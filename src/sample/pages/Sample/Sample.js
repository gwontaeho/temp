import { useNavigate } from "react-router-dom";
import { useForm, useFetch, useWijmo } from "@/hooks";
import { Group, Layout, Wijmo, Navigation, PageHeader, Button } from "@/components";
import { OPTIONS, SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

/**
 * 샘플 리스트 페이지
 */
export const Sample = () => {
  const navigate = useNavigate();

  const { schema, handleSubmit, isSubmitted } = useForm({ defaultSchema: SCHEMA_FORM });
  const { grid, page, size } = useWijmo({ defaultSchema: SCHEMA_GRID });

  const { data, fetchData } = useFetch({
    api: () => APIS.getComponentGroups(page, size),
    enabled: isSubmitted,
    key: [page, size],
  });

  return (
    <Layout>
      <Navigation base="/page/sample" nodes={[{ label: "List" }]} />
      <PageHeader title="Sample List" description="Sample List Page Description" />

      <form onSubmit={handleSubmit(fetchData)}>
        <Group>
          <Group.Body>
            <Group.Row>
              <Group.Control {...schema.con1} />
              <Group.Control {...schema.con2} options={OPTIONS} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema._con34} controlSize={10} />
            </Group.Row>
          </Group.Body>
          <Layout.Right>
            <Button onClick={() => navigate("/page/sample/regist")}>등록</Button>
            <Button type="submit">검색</Button>
          </Layout.Right>
        </Group>
      </form>

      <Group>
        <Group.Header>Search Result</Group.Header>
        <Wijmo {...grid} data={data} />
      </Group>
    </Layout>
  );
};
