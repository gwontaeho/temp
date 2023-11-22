import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFetch, useWijmo, useModal } from "@/hooks";
import { Group, Layout, Wijmo, Navigation, PageHeader, Button } from "@/components";
import { OPTIONS, SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

/**
 * 샘플 리스트 페이지
 */
export const Sample = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [condition, setCondition] = useState({});

  const { schema, handleSubmit, isSubmitted } = useForm({ defaultSchema: SCHEMA_FORM });

  const { grid, page, size, setPage, getChecked } = useWijmo({ defaultSchema: SCHEMA_GRID });

  const { data, fetch } = useFetch({
    api: () => APIS.getComponentGroups(page, size, condition),
    enabled: isSubmitted,
    key: [page, size, condition],
  });

  const dcg = useFetch({ api: APIS.deleteComponentGroup });

  const handleClickDelete = () => {
    if (!getChecked().length) return;
    showModal({
      message: "선택한 항목을 삭제하시겠습니까?",
      onConfirm: handleConfirmDelete,
    });
  };

  const handleConfirmDelete = async () => {
    const dcgFetches = getChecked().map((_) => dcg.fetch(_.id));
    await Promise.all(dcgFetches);
    fetch();
  };

  const onSubmit = (data) => {
    setPage(0);
    setCondition(data);
  };

  return (
    <Layout>
      <Navigation base="/page/sample" nodes={[{ label: "List" }]} />
      <PageHeader title="Sample List" description="Sample List Page Description" />

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Layout.Right>
          <Button onClick={handleClickDelete}>삭제</Button>
        </Layout.Right>
        <Wijmo {...grid} data={data} />
      </Group>
    </Layout>
  );
};
