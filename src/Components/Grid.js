import { Children } from "react";

const colsVariants = {
  1: " grid-cols-1",
  2: " grid-cols-2",
  3: " grid-cols-3",
  4: " grid-cols-4",
  5: " grid-cols-5",
  6: " grid-cols-6",
  7: " grid-cols-7",
  8: " grid-cols-8",
  9: " grid-cols-9",
  10: " grid-cols-10",
  11: " grid-cols-11",
  12: " grid-cols-12",
};

const spanVariants = {
  1: " col-span-1",
  2: " col-span-2",
  3: " col-span-3",
  4: " col-span-4",
  5: " col-span-5",
  6: " col-span-6",
  7: " col-span-7",
  8: " col-span-8",
  9: " col-span-9",
  10: " col-span-10",
  11: " col-span-11",
  12: " col-span-12",
};

export const Grid = ({ children, cols, border }) => {
  const isArray = Array.isArray(cols) && cols.every((col) => Number.isInteger(Number(col)));
  const colsCount = isArray ? cols.reduce((prev, curr) => prev + curr) : cols;

  const childrenWithMap = Children.map(children, (child, index) => {
    if (child.type?.name === "Grid") return child;

    const spanClassName = (isArray && spanVariants[cols[index]]) || "";
    const className = "bg-gray-200 min-h-[3rem]" + spanClassName;

    return <div className={className}>{child}</div>;
  });

  const colsClassName = colsVariants[colsCount] || "";
  const className = "grid gap-[1px] bg-gray-300" + colsClassName;

  return <div className={className}>{childrenWithMap}</div>;
};
