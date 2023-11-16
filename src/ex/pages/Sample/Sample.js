import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Group, Flex, Wijmo } from "@/components";
import { useForm, useFetch, useWijmo } from "@/hooks";
import { OPTIONS, SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

export const Sample = () => {
  const navigate = useNavigate();

  const [con, setCon] = useState({});
  const { grid, page, size } = useWijmo({ defaultSchema: SCHEMA_GRID });
  const { schema, handleSubmit, isSubmitted } = useForm({ defaultSchema: SCHEMA_FORM });

  const { data, fetchData, isSuccess } = useFetch({
    api: () => APIS.getComponentGroups(page, size),
    enabled: isSubmitted,
    key: [page, size],
  });

  const onSubmit = (data) => {
    setCon(data);
    fetchData();
  };

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group>
          <Group.Header>목록페이지</Group.Header>
          <Group.Body>
            <Group.Row>
              <Group.Control {...schema.con1} />
              <Group.Control {...schema.con2} options={OPTIONS} />
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
              <Group.Button type="submit">검색</Group.Button>
            </Group.Right>
          </Group.Footer>
        </Group>
      </form>

      <Group>
        <Wijmo {...grid} data={data} />
      </Group>

      {isSuccess && (
        <div className="flex justify-center space-x-8">
          <div>검색조건 1 : {con.con1}</div>
          <div>검색조건 2 : {con.con2}</div>
          <div>
            검색조건 3 :
            {con.con3 &&
              con.con4 &&
              ` ${dayjs(con.con3).format("YYYY-MM-DD")} ~ ${dayjs(con.con4).format("YYYY-MM-DD")}`}
          </div>
        </div>
      )}
    </Flex>
  );
};
