import "@grapecity/wijmo.styles/wijmo.css";
import axios from "axios";

import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import * as wjGridA from "@grapecity/wijmo.grid";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate } from "@grapecity/wijmo.input";

import "./style.css";
import { useEffect, useState, useRef } from "react";

const schema = {
  __grid__: "grid",
  head: [
    [{ header: "z" }],
    [
      { header: "a", colspan: 4 },
      { header: "b", colspan: 4 },
      { header: "c" },
      { header: "d" },
      { header: "e" },
      { header: "f" },
    ],
  ],
  body: [
    {
      colspan: 7,
      cells: [
        {
          binding: "a",
          dataMap: [
            { label: "al", value: "av" },
            { label: "bl", value: "bv" },
            { label: "cl", value: "cv" },
          ],
        },
        { binding: "b", format: "d" },
        { binding: "c" },
        { binding: "d" },
        { binding: "e" },
      ],
    },
  ],
};

const Grid = ({ gridRef, schema, data }) => {
  const head = schema.head;
  const body = schema.body;

  useEffect(() => {
    gridRef.current.data = data;
  }, []);

  const headerLayoutDefinition = () => {
    return head.map((_) => ({ cells: _.map((__) => ({ ...__, align: "center" })) }));
  };
  const layoutDefinition = () => {
    return body.map((_) => ({
      ..._,
      cells: _.cells.map((__) => ({
        ...__,
        ...(__.dataMap && { dataMap: new wjGridA.DataMap(__.dataMap, "label", "value") }),
        editor: new InputDate(document.createElement("div")),
      })),
    }));
  };

  const initialized = (multiRow) => {
    new Selector(multiRow);
    multiRow.layoutDefinition = layoutDefinition();

    // console.log(multiRow.columns);

    // multiRow.columns.forEach((col) => {
    //   console.log(col);
    //   col.editor = new InputDate(document.createElement("div"));
    // });

    multiRow.collectionView.collectionChanged.addHandler(({ items }) => (gridRef.current.data = items));

    gridRef.current.multiRow = multiRow;
  };

  return (
    <wjGrid.MultiRow
      allowAddNew={true}
      allowDelete={true}
      itemsSource={data}
      initialized={initialized}
      headerLayoutDefinition={headerLayoutDefinition()}
    />
  );
};

const useGrid = ({ defaultSchema }) => {
  const gridRef = useRef({});

  const schema = defaultSchema;

  const getData = () => {
    return gridRef.current.data;
  };
  const getCheckedIndex = () => {
    return gridRef.current.multiRow.rows.filter((r) => r.isSelected).map((r) => r.dataIndex);
  };
  const getChecked = () => {
    return gridRef.current.multiRow.rows.filter((r) => r.isSelected).map((r) => r.dataItem);
  };
  const addRow = () => {
    gridRef.current.multiRow.collectionView.addNew();
  };
  const removeRow = (index) => {
    if (index === undefined) return;
    gridRef.current.multiRow.collectionView.removeAt(index);
  };
  const removeChecked = () => {
    getCheckedIndex().forEach((index) => {
      gridRef.current.multiRow.collectionView.removeAt(index);
    });
  };

  const grid = { gridRef, schema };

  return { grid, getData, getChecked, getCheckedIndex, addRow, removeRow, removeChecked };
};

export const WijmoGrid = () => {
  const { grid, getData, getChecked, getCheckedIndex, addRow, removeRow, removeChecked } = useGrid({
    defaultSchema: schema,
  });

  return (
    <div className="[&>.wj-multirow]:max-h-max [&>.wj-multirow]:h-[400px]">
      <Grid {...grid} data={[]} />
      <div className="space-x-2">
        <button onClick={() => console.log(getData())}>데이터 가져오기</button>
        <button onClick={() => console.log(getChecked())}>check 가져오기</button>
        <button onClick={() => console.log(getCheckedIndex())}>index 가져오기</button>
        <button onClick={() => addRow()}>add</button>
        <button onClick={() => removeRow(1)}>remove at</button>
        <button onClick={() => removeChecked()}>checked 삭제</button>
      </div>
    </div>
  );
};
