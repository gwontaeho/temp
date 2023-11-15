import { Group, Flex, Wijmo } from "@/components";
import { useForm, useFetch, useModal, useWijmo } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

export const Sample = () => {
  const navigate = useNavigate();

  const { showModal } = useModal();

  const { grid, getData } = useWijmo({ defaultSchema: SCHEMA_GRID });
  const { schema, getValues, handleSubmit, trigger } = useForm({ defaultSchema: SCHEMA_FORM });

  // const { data } = useFetch({
  // api: () => APIS.getComponentGroups(page, size),
  // enabled: true,
  // key: [page, size],
  // });

  console.log("a");

  return (
    <Flex>
      <Group>
        <Group.Header>Search Example</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control {...schema.con1} />
            <Group.Control {...schema.con2} controlSize={2} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema._con34} />
          </Group.Row>
        </Group.Body>
        <Group.Footer>
          <Group.Left>
            <Group.Button>초기화</Group.Button>
          </Group.Left>
          <Group.Right>
            <Group.Button onClick={() => navigate("/page/sample/regist")}>등록</Group.Button>
            <Group.Button onClick={() => trigger()}>검색</Group.Button>
            <Group.Button onClick={() => showModal()}>모달</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>

      <Group>
        <Group.Body>
          <Wijmo {...grid} />
        </Group.Body>
        <Group.Footer>
          <Group.Right>
            <Group.Button onClick={() => console.log(getData())}>데이터 가져오기</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>
    </Flex>
  );
};
