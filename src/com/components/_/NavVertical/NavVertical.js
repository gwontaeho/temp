import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import classNames from "classnames";
import { Collapse, Icon } from "@/com/components";
import { Routes } from "@/com/routes/Routes";

const NavItem = (props) => {
  const { children, depth_1, _base = "", base = "", to = "", name } = props;
  const __base = _base + base;

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(Array.isArray(children) && location.pathname.startsWith(depth_1.base + __base));

  const handleClick = () => {
    if (children) return setOpen((prev) => !prev);
    navigate(depth_1.base + __base + to);
  };

  const current = !Array.isArray(children) && location.pathname === depth_1.base + __base + to;

  return (
    <li className="font-mono">
      <button className="h-8 px-2 text-lg flex w-full items-center justify-between" onClick={handleClick}>
        <p className={classNames({ "text-blue": current })}>{name}</p>
        {children && <Icon icon="down" size="xs" className={classNames("transition", { "rotate-180": open })} />}
      </button>
      {Array.isArray(children) && (
        <Collapse open={open}>
          <ul className="pl-4">
            {children.map((child) => {
              return <NavItem key={uuid()} depth_1={depth_1} _base={__base} {...child} />;
            })}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

export const NavVertical = () => {
  const location = useLocation();

  const depth_1 = Routes.find(({ base }) => location.pathname.startsWith(base));
  const depth_2 = depth_1?.children;

  return (
    <nav className="hidden fixed pt-20 top-0 w-60 h-full lg:block">
      {!depth_2 && <span className="p-2">depth 1 미 선택</span>}
      {depth_2 && (
        <ul className="p-2">
          {depth_2.map((child) => {
            return <NavItem key={uuid()} depth_1={depth_1} {...child} />;
          })}
        </ul>
      )}
    </nav>
  );
};
