import { useRef, useState } from "react";

export const useWijmo = ({ defaultSchema }) => {
  const gridRef = useRef();
  const contentRef = useRef();

  const schema = defaultSchema;

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const getData = () => {
    return gridRef.current.control.collectionView.sourceCollection;
  };

  const getPageData = () => {
    return gridRef.current.control.collectionView.items;
  };

  const getChecked = () => {
    return gridRef.current.control.rows.filter((r) => r.isSelected).map((r) => r.dataItem);
  };

  const getCheckedIndex = () => {
    return gridRef.current.control.rows.filter((r) => r.isSelected).map((r) => r.dataIndex);
  };

  const addRow = () => {
    gridRef.current.control.collectionView.addNew();
    const lastIndex = gridRef.current.control.collectionView.sourceCollection.length - 1;
    gridRef.current.control.collectionView.sourceCollection[lastIndex] = { _grid_content_index: "_" + lastIndex };
  };

  const removeRow = (index = 0) => {
    const pageIndex = gridRef.current.control.collectionView.pageIndex;
    contentRef.current = contentRef.current.filter((_, i) => i !== pageIndex * size + index);
    gridRef.current.control.collectionView.removeAt(index);
  };

  const removeChecked = () => {
    getCheckedIndex()
      .sort((a, b) => b - a)
      .forEach((index) => {
        const pageIndex = gridRef.current.control.collectionView.pageIndex;
        contentRef.current = contentRef.current.filter((_, i) => i !== pageIndex * size + index);
        gridRef.current.control.collectionView.removeAt(index);
      });
  };

  const grid = { gridRef, contentRef, schema, page, setPage, size, setSize, addRow, removeChecked };

  return {
    grid,
    getData,
    getPageData,
    getChecked,
    getCheckedIndex,
    addRow,
    removeRow,
    removeChecked,
    page,
    size,
    setPage,
    setSize,
  };
};
