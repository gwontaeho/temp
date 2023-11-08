import { Grid, Group, Stack } from "@/components";
import { useForm, useGrid, useFetch, useTheme } from "@/hooks";
import { SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SearchExService";
import { useModal, useToast } from "@/hooks";

export const SearchEx = () => {
  const { theme } = useTheme();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const option1 = useFetch({ api: APIS.getOption });
  const option2 = useFetch({ api: APIS.getOption });
  const option3 = useFetch({ api: APIS.getOption });

  const { schema, getValues } = useForm({ defaultSchema: SCHEMA_FORM });
  const { grid, page, size } = useGrid({ defaultSchema: SCHEMA_GRID(option1.data.content) });

  const code = useFetch({ api: APIS.getCode, enabled: false });

  const test = () => {
    console.log(getValues());
    // code.fetchData();
  };

  return (
    <Stack>
      <Group>
        <Group.Header>Form Example</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control {...schema.text_1} />
            <Group.Control {...schema.number_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.password_1} />
            <Group.Control {...schema.select_1} options={[{ label: "1", value: "1" }]} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.checkbox_1} options={option1.data.content} />
            <Group.Control {...schema.radio_1} options={option2.data.content} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textarea_1} />
            <Group.Control {...schema.radio_1} options={option3.data.content} />
          </Group.Row>
        </Group.Body>
        <Group.Footer>
          <Group.Right>
            <Group.Button onClick={test}>검색</Group.Button>
            <Group.Button onClick={() => showModal({ onConfirm: () => showModal() })}>모달</Group.Button>
            <Group.Button onClick={() => showToast({ onConfirm: () => showToast({ message: "adwqd" }) })}>
              토스트
            </Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>

      <Group>
        <Group.Body>
          <Grid {...grid} data={code.data} />
        </Group.Body>
      </Group>
    </Stack>
  );
};
