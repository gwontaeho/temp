import uuid from "react-uuid";
import { MAIN_ROUTES } from "@/routes/MainRoutes";
import { FormControl } from "./FormControl";

export const ROUTES = [
  {
    name: "MY포탈",
    children: [
      {
        name: "example p1",
        to: "/1",
      },
      {
        name: "example p1",
        to: "/1",
      },
      {
        name: "example p1",
        to: "/1",
      },
      {
        name: "example p1",
        to: "/1",
      },
    ],
  },
  {
    name: "화물",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
  {
    name: "통관",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
  {
    name: "징수",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
  {
    name: "위험관리",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
  {
    name: "포털관리",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
  {
    name: "시스템관리",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
];

const NavItem = (props) => {
  const { name, children } = props;
  return (
    <li className="group">
      <button className="flex items-center space-x-1">
        <p>{name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 transition group-hover:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className="pt-2 w-max absolute hidden group-hover:block">
        <ul className="rounded bg-header p-4 grid grid-cols-2 gap-4">
          {children.map((child) => {
            const { name } = child;
            return <li key={uuid()}>{name}</li>;
          })}
        </ul>
      </div>
    </li>
  );
};

export const NavTop = () => {
  return (
    <nav className="hidden items-center lg:flex">
      <ul className="font-mono flex space-x-4">
        {ROUTES.map((child) => {
          return <NavItem key={uuid()} {...child} />;
        })}
      </ul>
    </nav>
  );
};
