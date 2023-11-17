import classNames from "classnames";

/**
 *
 * @param {object} props
 * @param {('row'|'col')} props.direction
 * @returns
 */
export const Layout = ({ children, direction }) => {
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

const LayoutLeft = ({ children }) => {
  return <div className="flex space-x-1">{children}</div>;
};

const LayoutRight = ({ children }) => {
  return <div className="justify-end space-x-1">{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
