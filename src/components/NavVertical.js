import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { MAIN_ROUTES } from "@/routes/MainRoutes";

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
    <li
      aria-expanded={open}
      className={`overflow-hidden ${location.pathname === to ? "text-w" : ""}`}
      style={{ height: open ? "fit-content" : "2rem" }}>
      <button className="h-8 px-2 text-lg flex w-full items-center justify-between" onClick={handleClick}>
        <p>{name}</p>
        {children && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>
      {Array.isArray(children) && (
        <ul className="pl-2">
          {children.map((child) => {
            return <NavItem key={uuid()} {...child} />;
          })}
        </ul>
      )}
    </li>
  );
};

export const NavVertical = () => {
  return (
    <nav className="hidden fixed pt-20 top-0 w-60 border-r h-full lg:block">
      <ul className="p-2">
        {MAIN_ROUTES.map((child) => {
          return <NavItem key={uuid()} {...child} />;
        })}
      </ul>
    </nav>
  );
};
