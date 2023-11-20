import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { Icon } from "@/components";

export const Navigation = ({ base = "/", nodes = [] }) => {
  return (
    <ul className="h-6 flex items-center space-x-2 text-blue">
      <li>
        <Link to={base}>
          <Icon icon="home" size="sm" />
        </Link>
      </li>
      {nodes.map(({ path, label }) => {
        return (
          <li key={uuid()} className="space-x-2 text-lg">
            <span>/</span>
            {path ? <Link to={base + path}>{label}</Link> : <span>{label}</span>}
          </li>
        );
      })}
    </ul>
  );
};
