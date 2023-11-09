import { Grid, Group, Flex } from "@/components";
import { useForm, useGrid, useFetch, useTheme, useModal, useToast } from "@/hooks";
import { SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SearchExService";
import { useState } from "react";

export const SearchEx = () => {
  const { theme } = useTheme();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const { schema, getValues } = useForm({ defaultSchema: SCHEMA_FORM });
  const { grid, page, size } = useGrid({ defaultSchema: SCHEMA_GRID });

  const options = useFetch({
    key: [theme.lang],
    api: [() => APIS.getOption(theme.lang), () => APIS.getOption(theme.lang), () => APIS.getOption(theme.lang)],
    enabled: true,
  });

  const code = useFetch({ api: APIS.getCode, enabled: true });

  const test = () => {
    code.fetchData();
  };

  const [optiona, optionb, optionc] = options.data;
  const gridData = code.data;

  return (
    <Flex>
      <Group>
        <Group.Header>Search Example</Group.Header>
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
            <Group.Control {...schema.checkbox_1} options={optiona.content} />
            <Group.Control {...schema.radio_1} options={optionb.content} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textarea_1} />
            <Group.Control {...schema.radio_1} options={optionc.content} />
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
          <Grid {...grid} data={gridData} />
        </Group.Body>
      </Group>

      <Group>
        <Group.Body>
          <Group.Row>
            <Group.Col label="dqwd">a</Group.Col>
            <Group.Col>a</Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Col label="dqwd">a</Group.Col>
            <Group.Col>a</Group.Col>
          </Group.Row>
        </Group.Body>
      </Group>

      <Group>
        <Group.Row>a</Group.Row>
        <Group.Row>a</Group.Row>
        <Group.Row>a</Group.Row>
      </Group>
    </Flex>
  );
};
