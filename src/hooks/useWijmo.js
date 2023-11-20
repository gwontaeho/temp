import { useRef, useState } from "react";

export const useWijmo = ({ defaultSchema }) => {
  const gridRef = useRef({});

  const schema = defaultSchema;

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const getData = () => {
    return gridRef.current.control.collectionView.sourceCollection;
  };
  const getCheckedIndex = () => {
    return gridRef.current.control.rows.filter((r) => r.isSelected).map((r) => r.dataIndex);
  };
  const getChecked = () => {
    return gridRef.current.control.rows.filter((r) => r.isSelected).map((r) => r.dataItem);
  };
  const addRow = () => {
    gridRef.current.control.collectionView.addNew();
  };
  const removeRow = (index) => {
    if (index === undefined) return;
    gridRef.current.control.collectionView.removeAt(index);
  };
  const removeChecked = () => {
    getCheckedIndex()
      .sort((a, b) => b - a)
      .forEach((index) => {
        gridRef.current.control.collectionView.removeAt(index);
      });
  };

  const pagination = { page, setPage, size, setSize };

  const grid = { gridRef, schema, pagination, addRow, removeChecked };

  return { grid, getData, getChecked, getCheckedIndex, addRow, removeRow, removeChecked, page, size };
};
