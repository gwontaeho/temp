import { forwardRef } from "react";
import classNames from "classnames";
import { FormControl } from "@/components/FormControl";
import { Button } from "@/components/Button";

const spanVariants = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export const Group = ({ children, size = "full" }) => {
  return (
    <div
      className={classNames("shadow rounded bg-card p-4 space-y-4", {
        "w-full": size === "full",
        "w-fit": size === "fit",
      })}>
      {children}
    </div>
  );
};

const GroupHeader = ({ children }) => {
  return <div className="w-full text-2xl font-semibold">{children}</div>;
};

const GroupBody = ({ children }) => {
  return <div className="w-full overflow-auto">{children}</div>;
};

const GroupFooter = ({ children }) => {
  return <div className="w-full flex">{children}</div>;
};

const GroupRow = ({ children }) => {
  return (
    <div className="w-full flex flex-col min-h-[2.5rem] border-x first:border-t last:border-b sm:grid sm:grid-cols-12 sm:border-b">
      {children}
    </div>
  );
};

const GroupLabel = ({ children, labelSize = 2, required }) => {
  const colSpan = spanVariants[labelSize];
  return (
    <div
      className={classNames(
        "font-semibold relative flex items-center p-1 break-all bg-header sm:border-x first:border-l-0 last:border-r-0",
        colSpan
      )}>
      {children}
      {required && <span className="text-invalid absolute top-1 right-1">*</span>}
    </div>
  );
};

const GroupControl = forwardRef((props, ref) => {
  const defaultControlSize = props.type === "between" && props.options ? 10 : 4;
  const { label, labelSize, controlSize = defaultControlSize, required, ...rest } = props;
  const colSpan = spanVariants[controlSize];
  return (
    <>
      {label && (
        <GroupLabel required={required} labelSize={labelSize}>
          {label}
        </GroupLabel>
      )}
      <div className={classNames("p-1 flex items-center", colSpan)}>
        <FormControl ref={ref} {...rest} />
      </div>
    </>
  );
});

const GroupCol = ({ children, label, labelSize, colSize = 4 }) => {
  const colSpan = spanVariants[colSize];

  return (
    <>
      {label && <GroupLabel labelSize={labelSize}>{label}</GroupLabel>}
      <div className={classNames("p-1 flex items-center", colSpan)}>{children}</div>
    </>
  );
};

const GroupButton = ({ children, size = 2, ...rest }) => {
  const colSpan = spanVariants[size];

  return (
    <div className={classNames("p-1 flex items-center [&>button]:w-full", colSpan)}>
      <Button {...rest}>{children}</Button>
    </div>
  );
};

const GroupLeft = ({ children }) => {
  return <div className="flex flex-1 items-center">{children}</div>;
};

const GroupRight = ({ children }) => {
  return <div className="flex flex-1 items-center justify-end">{children}</div>;
};

Group.Header = GroupHeader;
Group.Body = GroupBody;
Group.Footer = GroupFooter;
Group.Row = GroupRow;
Group.Col = GroupCol;
Group.Label = GroupLabel;
Group.Control = GroupControl;
Group.Button = GroupButton;
Group.Left = GroupLeft;
Group.Right = GroupRight;
