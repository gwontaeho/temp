import classNames from "classnames";

export const Flex = ({ children, direction }) => {
  const isRow = direction === "row";
  return (
    <div
      className={classNames("flex", {
        "flex-col": !isRow,
        "space-y-4": !isRow,
        "space-x-4": isRow,
      })}>
      {children}
    </div>
  );
};
