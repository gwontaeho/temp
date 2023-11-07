import uuid from "react-uuid";
import { MAIN_ROUTES } from "@/routes/MainRoutes";
import { FormControl } from "./FormControl";

const NavItem = (props) => {
  const { name, children } = props;
  return (
    <li className="group">
      <button>{name}</button>
      <ul className="p-4 rounded bg-header absolute hidden  group-hover:block">
        {children.map((child) => {
          const { name } = child;
          return <li key={uuid()}>{name}</li>;
        })}
      </ul>
    </li>
  );
};

export const NavTop = () => {
  return (
    <nav className="flex items-center flex-1 px-4 justify-between">
      <div />
      {/* <ul className="flex space-x-4">
        {MAIN_ROUTES.map((child) => {
          return <NavItem key={uuid()} {...child} />;
        })}
      </ul> */}
    </nav>
  );
};
