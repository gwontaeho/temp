import { useNavigate } from "react-router-dom";
import { Grid, Group, Flex } from "@/components";
import { useForm, useGrid, useFetch, useModal, useToast } from "@/hooks";
import { SCHEMA_FORM_REGIST, SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

const options1 = [
  { label: "s1", value: "s1" },
  { label: "s2", value: "s2" },
  { label: "s3", value: "s3" },
];

const option2 = [
  { label: "r1", value: "r1" },
  { label: "r2", value: "r2" },
  { label: "r3", value: "r3" },
];

export const SampleRegist = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const { schema, handleSubmit } = useForm({ defaultSchema: SCHEMA_FORM_REGIST });
  const { grid } = useGrid({ defaultSchema: SCHEMA_GRID_COMPONENTS() });

  const { fetchData } = useFetch({
    api: APIS.createComponentGroup,
    onSuccess: () => {
      showToast();
      navigate("/page/sample");
    },
  });

  const handleRegist = () => {
    handleSubmit((data) => {
      console.log(data);
      showModal({ message: "그룹을 등록", onConfirm: () => fetchData(data) });
    })();
  };

  return (
    <Flex>
      <Group>
        <Group.Header>Search Example</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control {...schema.textField} />
            <Group.Control {...schema.passwordField} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.integerField} />
            <Group.Control {...schema.selectField} options={options1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.dateField} />
            <Group.Control {...schema.radioField} options={option2} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textareaField} />
          </Group.Row>
        </Group.Body>
        <Group.Footer>
          <Group.Left>
            <Group.Button onClick={() => navigate("/page/sample")}>목록</Group.Button>
            <Group.Button>초기화</Group.Button>
          </Group.Left>
          <Group.Right>
            <Group.Button onClick={handleRegist}>저장</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>
      <Group>
        <Group.Body>
          <Grid {...grid} />
        </Group.Body>
      </Group>
    </Flex>
  );
};
