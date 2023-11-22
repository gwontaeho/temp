import { useNavigate } from "react-router-dom";
import { useForm, useFetch, useWijmo, useModal, useCondition } from "@/com/hooks";
import { Group, Layout, Wijmo, Navigation, PageHeader, Button } from "@/com/components";
import { OPTIONS, SCHEMA_FORM, SCHEMA_GRID, APIS, SCHEMA_GRID_COMPONENTS } from "./SampleService";

export const Sample = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const { condition, setCondition } = useCondition();
  const _form = useForm({ defaultSchema: SCHEMA_FORM, values: condition });
  const _wijmo = useWijmo({ defaultSchema: SCHEMA_GRID });
  const _wijmo2 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });

  const gcg = useFetch({ api: APIS.getComponentGroup });
  const gcs = useFetch({ api: APIS.getComponents });
  const dcg = useFetch({ api: APIS.deleteComponentGroup });
  const gcgs = useFetch({
    api: () => APIS.getComponentGroups(_wijmo.page, _wijmo.size, condition),
    enabled: condition,
    key: [_wijmo.page, _wijmo.size, condition],
  });

  const handleClickDelete = () => {
    if (!_wijmo.getChecked().length) return;
    showModal({
      message: "선택한 항목을 삭제하시겠습니까?",
      onConfirm: handleDelete,
    });
  };

  const handleDelete = async () => {
    const dcgFetches = _wijmo.getChecked().map((_) => dcg.fetch(_.id));
    await Promise.all(dcgFetches);
    gcgs.fetch();
  };

  const onSubmit = (data) => {
    _wijmo.setPage(0);
    setCondition(data);
  };

  const handleSelect = (data) => {
    if (!data[0]) return;
    gcg.fetch(data[0].id);
    gcs.fetch(data[0].id);
  };

  return (
    <Layout>
      <Navigation base="/page/sample" nodes={[{ label: "List" }]} />
      <PageHeader title="Sample List" description="Sample List Page Description" />

      <form onSubmit={_form.handleSubmit(onSubmit)}>
        <Group>
          <Group.Body>
            <Group.Row>
              <Group.Control {..._form.schema.con1} />
              <Group.Control {..._form.schema.con2} options={OPTIONS} />
            </Group.Row>
            <Group.Row>
              <Group.Control {..._form.schema._con34} controlSize={10} />
            </Group.Row>
          </Group.Body>
          <Layout.Right>
            <Button onClick={() => console.log(_form.getValues())}>검색조건 조회</Button>
            <Button onClick={() => navigate("/sample/pages/regist")}>등록</Button>
            <Button type="submit">검색</Button>
          </Layout.Right>
        </Group>
      </form>

      <Group>
        <Layout.Right>
          <Button onClick={handleClickDelete}>삭제</Button>
        </Layout.Right>
        <Wijmo {..._wijmo.grid} data={gcgs.data} onSelect={handleSelect} />
      </Group>

      {gcg.isSuccess && (
        <Group>
          <Group.Body>
            <Group.Row>
              <Group.Col label="id">{gcg.data.id}</Group.Col>
            </Group.Row>
            <Group.Row>
              <Group.Col label="text">{gcg.data.textField}</Group.Col>
              <Group.Col label="password">{gcg.data.passwordField}</Group.Col>
            </Group.Row>
            <Group.Row>
              <Group.Col label="integer">{gcg.data.integerField}</Group.Col>
              <Group.Col label="select">{gcg.data.selectField}</Group.Col>
            </Group.Row>
            <Group.Row>
              <Group.Col label="date">{gcg.data.dateField}</Group.Col>
              <Group.Col label="radio">{gcg.data.radioField}</Group.Col>
            </Group.Row>
            <Group.Row>
              <Group.Col label="textarea">{gcg.data.textareaField}</Group.Col>
            </Group.Row>
          </Group.Body>
          {gcs.isSuccess && <Wijmo {..._wijmo2.grid} data={gcs.data} />}
        </Group>
      )}
    </Layout>
  );
};
