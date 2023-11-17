import { forwardRef } from "react";
import classNames from "classnames";
import { FormControl } from "@/components/FormControl";
import { Button } from "@/components/Button";

const SPAN_VARIANTS = {
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

export const Group = ({ children, form, onSubmit, size = "full" }) => {
  const cn = classNames("shadow rounded bg-card p-4 space-y-4", {
    "w-full": size === "full",
    "w-fit": size === "fit",
  });

  if (form)
    return (
      <form onSubmit={onSubmit} className={cn}>
        {children}
      </form>
    );

  return <div className={cn}>{children}</div>;
};

const GroupHeader = ({ children }) => {
  return <div className="w-full text-lg font-semibold">{children}</div>;
};

const GroupTable = ({ children, form, onSubmit }) => {
  if (form)
    return (
      <form onSubmit={onSubmit} className="w-full border divide-y overflow-auto">
        {children}
      </form>
    );

  return <div className="w-full border divide-y overflow-auto">{children}</div>;
};

const GroupSection = ({ children }) => {
  return <div className="w-full flex">{children}</div>;
};

const GroupRow = ({ children }) => {
  return <div className="w-full flex flex-col min-h-[2.5rem] sm:grid sm:grid-cols-12 sm:divide-x">{children}</div>;
};

const GroupLabel = ({ children, labelSize = 2, required }) => {
  const colSpan = SPAN_VARIANTS[labelSize];
  return (
    <div className={classNames("font-semibold relative flex items-center p-1 break-all bg-header", colSpan)}>
      {children}
      {required && <span className="text-invalid absolute top-1 right-1">*</span>}
    </div>
  );
};

const GroupControl = forwardRef((props, ref) => {
  const defaultControlSize = props.type === "between" && props.options ? 10 : 4;
  const { label, labelSize, controlSize = defaultControlSize, required, ...rest } = props;
  const colSpan = SPAN_VARIANTS[controlSize];
  return (
    <>
      {typeof label === "string" && (
        <GroupLabel required={required} labelSize={labelSize}>
          {label}
        </GroupLabel>
      )}
      <div className={classNames("p-1 flex items-center w-full", colSpan, { "bg-header": label === true })}>
        <FormControl ref={ref} {...rest} />
      </div>
    </>
  );
});

const GroupCol = ({ children, label, labelSize, colSize = 4 }) => {
  const colSpan = SPAN_VARIANTS[colSize];
  return (
    <>
      {label && <GroupLabel labelSize={labelSize}>{label}</GroupLabel>}
      <div className={classNames("p-1 flex items-center space-x-1", colSpan)}>{children}</div>
    </>
  );
};

Group.Header = GroupHeader;
Group.Table = GroupTable;
Group.Row = GroupRow;
Group.Col = GroupCol;
Group.Label = GroupLabel;
Group.Control = GroupControl;
Group.Section = GroupSection;
