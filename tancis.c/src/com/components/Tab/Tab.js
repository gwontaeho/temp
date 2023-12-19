import { useState, Children, cloneElement } from "react";
import classNames from "classnames";
import uuid from "react-uuid";

export const Tab = (props) => {
  const { children, tab } = props;
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <div className="border-b">
        {tab.map((t, i) => {
          return (
            <button
              key={uuid()}
              className={classNames("h-10 px-4 text-lg font-semibold", { "text-blue": current === i })}
              onClick={() => setCurrent(i)}>
              {t}
            </button>
          );
        })}
      </div>
      <div>{Children.map(children, (child, i) => cloneElement(child, { isCurrent: current === i }))}</div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, isCurrent } = props;
  return <div hidden={!isCurrent}>{children}</div>;
};

Tab.Panel = TabPanel;
