import classNames from "classnames";

export const Button = ({ type = "button", children, size = "fit", ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      className={classNames("button", {
        "w-full": size === "full",
        "w-fit": size === "fit",
      })}>
      {children}
    </button>
  );
};
