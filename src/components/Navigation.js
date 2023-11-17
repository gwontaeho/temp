import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { Icon } from "@/components";

export const Navigation = ({ base = "/", nodes = [] }) => {
  return (
    <ul className="flex items-center space-x-2">
      <li>
        <Link to={base}>
          <Icon icon="home" size="md" />
        </Link>
      </li>
      {nodes.map(({ path, label }, i) => {
        return (
          <li key={uuid()} className="space-x-2 text-lg">
            <span>/</span>
            <Link to={base + path}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
