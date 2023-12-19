import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { Icon } from "@/com/components";

export const Page = (props) => {
  const { children } = props;
  return <div className="space-y-4">{children}</div>;
};

Page.Navigation = ({ base = "/", nodes = [] }) => {
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

Page.Header = ({ title, description }) => {
  return (
    <div className="p-4 space-y-1 bg-card rounded shadow">
      {title && <div className="text-xl font-semibold">{title}</div>}
      {description && <p>{description}</p>}
    </div>
  );
};
