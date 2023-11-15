import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import classNames from "classnames";
import { Collapse } from "@/components/Collapse";

export const ROUTES = [
  {
    name: "component ex",
    children: [
      {
        name: "form",
        to: "/form",
      },
      {
        name: "grid",
        to: "/grid",
      },
      {
        name: "tab",
        to: "/tab",
      },
      {
        name: "tree",
        to: "/tree",
      },
      {
        name: "wijmo",
        to: "/wijmo",
      },
    ],
  },
  {
    name: "page ex",
    children: [
      {
        name: "sample page",
        to: "/page/sample",
      },
    ],
  },
];

const NavItem = (props) => {
  const { name, to, children } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(Array.isArray(children) && children.some((child) => child.to === location.pathname));

  const handleClick = () => {
    if (children) return setOpen((prev) => !prev);
    navigate(to);
  };

  return (
    <li className="font-mono">
      <button className="h-8 px-2 text-lg flex w-full items-center justify-between" onClick={handleClick}>
        <p>{name}</p>
        {children && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames("w-3 h-3 transition", { "rotate-180": open })}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>
      {Array.isArray(children) && (
        <Collapse open={open}>
          <ul className="pl-2">
            {children.map((child) => {
              return <NavItem key={uuid()} {...child} />;
            })}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

export const NavVertical = () => {
  return (
    <nav className="hidden fixed pt-20 top-0 w-60 border-r h-full lg:block">
      <ul className="p-2">
        {ROUTES.map((child) => {
          return <NavItem key={uuid()} {...child} />;
        })}
      </ul>
    </nav>
  );
};
