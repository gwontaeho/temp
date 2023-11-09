import { useState } from "react";
import uuid from "react-uuid";
import classNames from "classnames";
import { Collapse } from "./Collapse";

const TreeItem = (props) => {
  const { children, name } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li className="font-mono">
      <button className="h-6 flex items-center space-x-2" onClick={handleClick}>
        {children && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames("w-3 h-3 transition", { "rotate-90": open })}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        )}
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
