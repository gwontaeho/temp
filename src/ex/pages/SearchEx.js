import { Grid, Group, Stack } from "@/components";
import { useForm, useGrid, useFetch, useTheme } from "@/hooks";
import { SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SearchExService";
import { useEffect } from "react";
import { useModal, useToast } from "@/hooks";

export const SearchEx = () => {
  const {
    theme: { lang },
  } = useTheme();

  const { showModal } = useModal();
  const { showToast } = useToast();

  const { schema, getValues } = useForm({ defaultSchema: SCHEMA_FORM });
  const { grid, page, size } = useGrid({ defaultSchema: SCHEMA_GRID });

  const { data, isLoading, isSuccess, isError, fetchData } = useFetch({ api: APIS.getCode });

  const test = () => {
    console.log(getValues());
    fetchData();
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
            <Group.Control
              {...schema.checkbox_1}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
            />
            <Group.Control
              {...schema.radio_1}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
            />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textarea_1} />
            <Group.Control
              {...schema.radio_1}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
            />
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
          <Grid {...grid} data={data} />
        </Group.Body>
      </Group>
    </Stack>
  );
};
