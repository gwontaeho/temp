import { FC } from "react";
import classNames from "classnames";

/**
 * @typedef {object} LayoutProps
 * @property {('col'|'row')} direction
 */

/**
 * @type FC<LayoutProps>
 */
export const Layout = (props) => {
  const { children, direction } = props;
  const isRow = direction === "row";

  return (
    <div
      className={classNames("flex", {
        "flex-col space-y-4": !isRow,
        "space-x-4": isRow,
      })}>
      {children}
    </div>
  );
};

const LayoutLeft = ({ children }) => {
  return <div className="w-full max-w-fit flex space-x-1">{children}</div>;
};

const LayoutRight = ({ children }) => {
  return <div className="w-full flex justify-end space-x-1">{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
