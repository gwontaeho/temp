import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Routes } from "@/com/routes/Routes";
import { Icon } from "@/com/components/Icon/Icon";

const NavItem = (props) => {
  const { name, children, path, base } = props;
  const depth_1 = path || base;

  return (
    <li className="group">
      <button className="flex items-center space-x-1">
        <p>{name}</p>
        <Icon icon="down" size="xs" className="transition group-hover:rotate-180" />
      </button>
      <div className="pt-2 w-max absolute hidden group-hover:block">
        <ul className="rounded bg-header p-4 grid grid-cols-2 gap-1 [&>li:hover]:underline">
          <li className="col-span-2">
            <Link to={depth_1} className="block p-2 font-semibold">
              {name}
            </Link>
          </li>
          {children.map((child) => {
            const { name, path, base } = child;
            const depth_2 = path || base;
            return (
              <li key={uuid()}>
                <Link to={depth_1 + depth_2} className="block w-40 py-2 px-4">
                  {name}
                </Link>
              </li>
            );
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
        {Routes.map((child) => {
          return <NavItem key={uuid()} {...child} />;
        })}
      </ul>
    </nav>
  );
};
