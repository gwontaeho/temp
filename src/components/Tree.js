import { useState } from "react";
import uuid from "react-uuid";
import classNames from "classnames";
import { Collapse, Icon } from "@/components";

const TreeItem = (props) => {
  const { children, name } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li className="font-mono">
      <button className="h-6 flex items-center space-x-2" onClick={handleClick}>
        {children && <Icon icon="right" size="sm" className={classNames("transition", { "rotate-90": open })} />}
        <input type="checkbox" className="w-2.5" onClick={(e) => e.stopPropagation()} />
        <p>{name}</p>
      </button>

      {Array.isArray(children) && (
        <Collapse open={open}>
          <ul className="pl-5">
            {children.map((child) => {
              return <TreeItem key={uuid()} {...child} />;
            })}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

export const Tree = (props) => {
  const { data = [] } = props;

  return (
    <ul className="w-fit">
      {data.map((child) => {
        return <TreeItem key={uuid()} {...child} />;
      })}
    </ul>
  );
};
