import { useState } from "react";
import { Grid, Group, Flex } from "@/components";
import { useForm, useGrid, useFetch, useTheme, useModal, useToast } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

export const Sample = () => {
  const navigate = useNavigate();

  const { schema, getValues, handleSubmit, trigger } = useForm({ defaultSchema: SCHEMA_FORM });
  const { grid, page, size } = useGrid({ defaultSchema: SCHEMA_GRID({ navigate }) });

  const componentGroups = useFetch({
    api: () => APIS.getComponentGroups(page, size),
    enabled: true,
    key: [page, size],
  });

  console.log(componentGroups.data);

  return (
    <Flex>
      <Group>
        <Group.Header>Search Example</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control {...schema.con1} />
            <Group.Control {...schema.con2} />
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
          </Group.Right>
        </Group.Footer>
      </Group>

      <Group>
        <Group.Body>
          <Grid {...grid} data={componentGroups.data} />
        </Group.Body>
      </Group>
    </Flex>
  );
};
