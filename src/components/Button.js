import classNames from "classnames";

export const Button = ({ children, size = "fit", ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className={classNames("px-2 py-1 h-7 border shadow rounded bg-bg", {
        "w-full": size === "full",
        "w-fit": size === "fit",
      })}>
      {children}
    </button>
  );
};
