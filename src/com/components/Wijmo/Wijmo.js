import "@grapecity/wijmo.styles/wijmo.css";

import "./_Wijmo.css";

import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Pagination, Icon } from "@/com/components";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from "@grapecity/wijmo.input";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { Button } from "@/com/components";

const defaultData = {
  page: 0,
  size: 0,
  totCnt: 0,
  content: [],
};

export const Wijmo = (props = {}) => {
  const {
    gridRef,
    schema = {},
    size,
    page,
    setSize,
    setPage,
    addRow,
    removeChecked,
    onSelect,
    data = defaultData,
  } = props;
  const navigate = useNavigate();

  const [initialize, setInitialize] = useState(false);

  const [totalCount, setTotalCount] = useState(data.totCnt);

  const contentRef = useRef(data.content);

  useEffect(() => {
    console.log("init");
    if (!gridRef.current) return;
    if (schema.options?.checkbox) new Selector(gridRef.current.control);
    if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;

    gridRef.current.control.selectionMode = "Row";
    gridRef.current.control.allowAddNew = true;
    gridRef.current.control.allowDelete = true;

    gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head);
    gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);

    gridRef.current.control.rowAdded.addHandler(handleRowAdded);
    gridRef.current.control.deletedRow.addHandler(handleDeletedRow);
    gridRef.current.control.formatItem.addHandler(handleFormatItem);
    gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged);
    gridRef.current.control.selectionChanged.addHandler(handleSelectionChanged);

    setInitialize(true);
  }, []);

  console.log("a");

  useEffect(() => {
    if (!gridRef.current) return;
    gridRef.current.control.itemsSource = _.cloneDeep(data.content);
    setTotalCount(data.totCnt);
    setGridSize(gridRef.current.control, size);
    setGridPage(gridRef.current.control, page);
  }, [data]);

  useEffect(() => {
    if (!gridRef.current.collectionView) return;
    setGridPage(gridRef.current.control, page);
  }, [page]);

  useEffect(() => {
    if (!gridRef.current.collectionView) return;
    setGridSize(gridRef.current.control, size);
  }, [size]);

  const handleFormatItem = (s, e) => {
    console.log(s.collectionView.pageSize);
    if (e.panel !== s.cells) return;
    if (s.collectionView.pageSize === 0) return;
    if (s.collectionView.itemCount <= e.row) return;

    const chunkedContent = _.chunk(contentRef.current, s.collectionView.pageSize);
    if (!chunkedContent?.[s.collectionView.pageIndex]?.[e.row]) return e.cell.classList.add("cell-new");

    const originalCellData = chunkedContent?.[s.collectionView.pageIndex]?.[e.row]?.[e.getColumn().binding];
    const currentCellData = e.getRow().dataItem?.[e.getColumn().binding];
    if (originalCellData !== currentCellData) return e.cell.classList.add("cell-changed");
  };

  const handleSelectionChanged = (_) => {
    if (!onSelect) return;
    onSelect(_.selectedItems);
  };

  const handleItemsSourceChanged = (_) => {
    if (!_.collectionView) return;
    _.collectionView.collectionChanged.addHandler((__) => {
      console.log(__.totalItemCount);
      setTotalCount(__.totalItemCount);
    });
  };

  const handleRowAdded = (s, e) => {};

  const handleDeletedRow = (s, e) => {
    const pageIndex = s.collectionView.pageIndex;
    const rowIndex = e.row;
    contentRef.current = contentRef.current.filter((_, i) => i !== pageIndex * size + rowIndex);
  };

  const setGridSize = (grid, nextSize) => {
    grid.collectionView.pageSize = nextSize;
  };

  const setGridPage = (grid, nextPage) => {
    grid.collectionView.moveToPage(nextPage);
  };

  const handleChangePage = (nextPage) => {
    setPage(nextPage);
  };

  const handleChangeSize = (nextSize) => {
    setSize(nextSize);
    handleChangePage(0);
  };

  const headerLayoutDefinition = (head) => {
    return head.map((_) => {
      return {
        ..._,
        cells: _.cells.map((__) => {
          const cells = { ...__, align: "center" };
          return cells;
        }),
      };
    });
  };

  const layoutDefinition = (body) => {
    return body.map((_) => {
      return {
        ..._,
        cells: _.cells.map(({ type, mask, options, link, ...__ }, i) => {
          const cells = { ...__ };
          const itemsSource = options;
          const displayMemberPath = "label";

          if (link) {
            cells.cellTemplate = CellMaker.makeLink({
              click: (e, ctx) => {
                navigate(`/sample/pages/${ctx.value}`);
              },
            });
          }

          switch (type) {
            case "number":
              cells.editor = new InputNumber(document.createElement("div"));
              break;
            case "inputmask":
              cells.editor = new InputMask(document.createElement("div"), { mask });
              break;
            case "select":
              cells.editor = new ComboBox(document.createElement("div"), { itemsSource, displayMemberPath });
              break;
            case "date":
              cells.editor = new InputDate(document.createElement("div"));
              break;
            case "time":
              cells.editor = new InputTime(document.createElement("div"), { step: 5 });
              cells.format = "h:mm tt";
              break;
            case "datetime":
              cells.editor = new InputDateTime(document.createElement("div"));
              cells.format = "g";
              break;
          }
          return cells;
        }),
      };
    });
  };

  return (
    <div className="space-y-4" hidden={!initialize}>
      {(schema.options?.add || schema.options?.remove) && (
        <div className="flex space-x-2 justify-end">
          {/* {schema.options?.import && (
            <Button onClick={addRow}>
              <Icon icon="plus" size="xs" />
            </Button>
          )} */}

          {/* {schema.options?.export && (
            <Button onClick={addRow}>
              <Icon icon="plus" size="xs" />
            </Button>
          )} */}

          {schema.options?.add && (
            <Button onClick={addRow}>
              <Icon icon="plus" size="xs" />
            </Button>
          )}
          {schema.options?.remove && (
            <Button onClick={removeChecked}>
              <Icon icon="minus" size="xs" />
            </Button>
          )}
        </div>
      )}

      <wjGrid.MultiRow ref={gridRef} />

      {schema.options?.pagination && (
        <Pagination
          page={page}
          size={size}
          onChangePage={handleChangePage}
          onChangeSize={handleChangeSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};
