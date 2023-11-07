import { forwardRef } from "react";
import { FormControl } from "./FormControl";
import { Button } from "./Button";

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

export const Group = ({ children }) => {
  return <div className="w-full shadow rounded bg-card p-4 space-y-4">{children}</div>;
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

const GroupLabel = (props) => {
  const { children, labelSize = 2, required } = props;

  const colSpan = spanVariants[labelSize];

  return (
    <div
      className={`${colSpan} relative flex items-center p-1 break-all bg-header sm:border-x first:border-l-0 last:border-r-0`}>
      {children}
      {required && <span className="text-invalid absolute top-1 right-1">*</span>}
    </div>
  );
};

const GroupControl = forwardRef((props, ref) => {
  const { label, labelSize, controlSize = 4, required, ...rest } = props;

  const colSpan = spanVariants[controlSize];

  return (
    <>
      {label && (
        <GroupLabel required={required} labelSize={labelSize}>
          {label}
        </GroupLabel>
      )}
      <div className={`${colSpan} p-1 flex items-center`}>
        <FormControl ref={ref} {...rest} />
      </div>
    </>
  );
});

const GroupButton = (props) => {
  const { children, size = 2, ...rest } = props;

  const colSpan = spanVariants[size];

  return (
    <div className={`${colSpan} p-1 flex items-center [&>button]:w-full`}>
      <Button {...rest}>{children}</Button>
    </div>
  );
};

const GroupCol = ({ children }) => {
  return <div>{children}</div>;
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
Group.Control = GroupControl;
Group.Label = GroupLabel;
Group.Col = GroupCol;
Group.Button = GroupButton;
Group.Left = GroupLeft;
Group.Right = GroupRight;
