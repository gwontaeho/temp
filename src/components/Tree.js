import { useState } from "react";
import classNames from "classnames";
import uuid from "react-uuid";
import { Collapse, Icon } from "@/components";

const TreeItem = (props) => {
  const { children, name } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li className="font-mono">
      <button
        className={classNames("h-7 flex items-center space-x-1.5", { "ml-[1.125rem]": !children })}
        onClick={handleClick}>
        {children && <Icon icon="right" size="xs" className={classNames("transition", { "rotate-90": open })} />}
        <input type="checkbox" className="w-3" onClick={(e) => e.stopPropagation()} />
        <p>{name}</p>
      </button>
      {Array.isArray(children) && (
        <Collapse open={open}>
          <ul className="pl-[1.125rem]">
            {children.map((child) => {
              return <TreeItem key={uuid()} {...child} />;
            })}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

/**
 * @typedef treeProps
 * @property {Array} data
 */

/**
 * @param {treeProps} props
 */
export const Tree = (props) => {
  const { data } = props;

  return (
    <ul className="w-fit">
      {data?.map((child) => {
        return <TreeItem key={uuid()} {...child} />;
      })}
    </ul>
  );
};
