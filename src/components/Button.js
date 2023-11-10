import classNames from "classnames";

export const Button = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={classNames("px-2 py-1 h-7 w-full border shadow rounded bg-bg", className)}>
      {children}
    </button>
  );
};
