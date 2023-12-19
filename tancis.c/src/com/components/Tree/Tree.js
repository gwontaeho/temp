import { useRef, useState } from "react";
import classNames from "classnames";
import uuid from "react-uuid";
import { Collapse, Icon } from "@/com/components";

const TreeItem = (props) => {
  const { children, name, parent, _key } = props;

  const childrenRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleCheck = (e) => {
    if (!e.target.checked) {
      parent.forEach((_) => {
        document.getElementsByName(_)[0].indeterminate = true;
      });
    }

    if (children) {
      Array.from(childrenRef.current.getElementsByTagName("input")).forEach((_) => {
        _.checked = e.target.checked;
        _.indeterminate = false;
      });
    }
  };

  return (
    <li className="font-mono">
      <button
        className={classNames("h-7 flex items-center space-x-1.5", { "ml-[1.125rem]": !children })}
        onClick={handleClick}>
        {children && <Icon icon="right" size="xs" className={classNames("transition")} />}
        <input
          name={_key}
          type="checkbox"
          className="w-3"
          onClick={(e) => e.stopPropagation()}
          onChange={handleCheck}
        />
        <p>{name}</p>
      </button>
      {Array.isArray(children) && (
        <Collapse open={open}>
          <ul ref={childrenRef} className="pl-[1.125rem]">
            {children.map((child) => {
              return <TreeItem _key={child.key} {...child} />;
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

  const dataWithKey = (data, parent = []) => {
    return data.map((_) => {
      let withKey = { ..._ };
      const key = uuid();
      withKey.key = key;
      withKey.parent = parent;
      if (_.children) withKey.children = dataWithKey(_.children, [...parent, key]);
      return withKey;
    });
  };

  return (
    <ul className="w-fit">
      {dataWithKey(data)?.map((child) => {
        return <TreeItem _key={child.key} {...child} />;
      })}
    </ul>
  );
};
