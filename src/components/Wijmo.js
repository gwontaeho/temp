import "@grapecity/wijmo.styles/wijmo.css";
import "./Wijmo.css";

import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Pagination } from "@/components/Pagination";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import * as wjCore from "@grapecity/wijmo";

import { Selector } from "@grapecity/wijmo.grid.selector";
import {
  InputDate,
  InputTime,
  InputDateTime,
  InputNumber,
  InputMask,
  ComboBox,
  InputDateRange,
  MultiSelect,
} from "@grapecity/wijmo.input";
import { Button } from "./Button";

export const Wijmo = ({ gridRef, schema, pagination, addRow, removeChecked, data }) => {
  // schema
  const head = schema.head;
  const body = schema.body;

  // pagination
  const isInnerPagination = schema.options?.pagination === "inner";

  const originContent = data?.content || [];
  const originTotalCount = isInnerPagination ? originContent.length : data?.totCnt || 0;
  const [itemsSource, setItemsSource] = useState();
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    setItemsSource(_.cloneDeep(originContent));
  }, [data]);

  useEffect(() => {
    setTotalCount(originTotalCount);
  }, [isInnerPagination, data]);

  const headerLayoutDefinition = () => {
    return head.map((_) => {
      return {
        cells: _.map((__) => {
          const cells = { ...__ };
          return cells;
        }),
      };
    });
  };

  const layoutDefinition = () => {
    return body.map((_) => {
      return {
        ..._,
        cells: _.cells.map(({ type, mask, options, ...__ }, i) => {
          const cells = { ...__ };
          const itemsSource = options;
          const displayMemberPath = "label";
          if (i === 0) cells.width = "*";
          // cells.width = "*";
          // cells.isReadOnly = true;
          // cells.cellTemplate = (ctx, _) => {
          //   return `<input id=77 value=${ctx.value} />`;
          // };

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

  const initialized = (multiRow) => {
    let init = true;
    if (schema.options?.checkbox) new Selector(multiRow);

    multiRow.headerLayoutDefinition = headerLayoutDefinition();
    multiRow.layoutDefinition = layoutDefinition();

    multiRow.collectionView.collectionChanged.addHandler((_) => {
      if (init) return;
      const { pageSize, sourceCollection } = _;
      if (!isInnerPagination) return;

      setTotalCount((prev) => {
        const next = sourceCollection.length;
        const lastPageItemCount = prev % pageSize || pageSize;
        if (prev < next) {
          const greater = next - prev > pageSize - lastPageItemCount;
          if (greater) return next;
        }
        if (prev > next) {
          const less = prev - next >= lastPageItemCount;
          if (less) return next;
        }
        return prev;
      });
    });

    if (isInnerPagination) multiRow.collectionView.pageSize = pagination.size;

    gridRef.current.multiRow = multiRow;
    init = false;
  };

  const handleChangePage = (nextPage) => {
    if (isInnerPagination) {
      gridRef.current.multiRow.collectionView.moveToPage(nextPage);
    } else pagination.setPage(nextPage);
  };

  const handleChangeSize = (nextSize) => {
    if (isInnerPagination) {
      console.log(nextSize);
      gridRef.current.multiRow.collectionView.pageSize = nextSize;
    } else pagination.setSize(nextSize);
    handleChangePage(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 justify-end">
        <Button onClick={addRow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Button>
        <Button onClick={removeChecked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </Button>
      </div>
      <wjGrid.MultiRow
        isReadOnly={!!schema.options?.isReadOnly}
        allowAddNew={true}
        allowDelete={true}
        itemsSource={itemsSource}
        initialized={initialized}
      />
      {schema.options?.pagination && (
        <Pagination
          page={pagination.page}
          size={pagination.size}
          onChangePage={handleChangePage}
          onChangeSize={handleChangeSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};
