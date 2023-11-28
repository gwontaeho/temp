import axios from "axios";
import { useWijmo, useFetch } from "@/com/hooks";
import { Group } from "@/com/components";
import { Wijmo } from "@/com/components/Wijmo.v2/Wijmo.v2";
import uuid from "react-uuid";

const instance = axios.create({
  baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
  getComponentGroups: (page, size) => instance.get("/com/componentGroups", { params: { page, size } }),
  getComponentGroup: (id) => instance.get(`/com/componentGroups/${id}`),
  getComponents: (grpId) => instance.get(`/com/componentGroups/${grpId}/components`),
  createComponentGroup: (data) => instance.post("/com/componentGroups", data),
};

const schema = {
  __grid__: "grid",
  options: { checkbox: true, pagination: "inner" },
  head: [
    { cells: [{ header: "a", colspan: 3 }, { header: "a" }, { header: "b" }, { header: "c" }] },
    { cells: [{ header: "d" }] },
    { header: "E", cells: [{ header: "e" }] },
  ],
  body: [
    {
      colspan: 3,
      cells: [{ binding: "id", colspan: 3 }],
    },
    {
      cells: [{ binding: "a" }],
    },
  ],
};

const getMockData = () => {
  return {
    page: 0,
    size: 10,
    totCnt: 99,
    content: Array(10)
      .fill(null)
      .map((_) => ({
        id: uuid(),
        a: Math.random() * 1000,
      })),
  };
};

export const ExWijmo = () => {
  const { grid, getData, getChecked, getCheckedIndex, addRow, removeRow, removeChecked, page, size } = useWijmo({
    defaultSchema: schema,
  });

  const { data, fetch } = useFetch({
    api: () => APIS.getComponentGroups(),
    // api: () => APIS.getComponentGroups(page, size),
    enabled: true,
    // key: [page, size],
  });

  console.log(getMockData());

  return (
    <Group>
      <Wijmo {...grid} data={getMockData()} />

      <div className="space-x-2">
        <button onClick={() => console.log(getData())}>데이터 가져오기</button>
        <button onClick={() => console.log(getChecked())}>check 가져오기</button>
        <button onClick={() => console.log(getCheckedIndex())}>index 가져오기</button>
        <button onClick={() => addRow()}>add</button>
        <button onClick={() => removeRow(1)}>remove at</button>
        <button onClick={() => removeChecked()}>checked 삭제</button>
        <button onClick={() => fetch()}>refetch</button>
      </div>
    </Group>
  );
};
