import React, { FC, forwardRef } from "react";
import classNames from "classnames";
import { FormControl } from "@/components";

const SIZES = {
  1: "w-1/12",
  2: "w-2/12",
  3: "w-3/12",
  4: "w-4/12",
  5: "w-5/12",
  6: "w-6/12",
  7: "w-7/12",
  8: "w-8/12",
  9: "w-9/12",
  10: "w-10/12",
  11: "w-11/12",
  12: "w-12/12",
};

export const Group = ({ children }) => {
  return <div className="shadow rounded bg-card p-4 space-y-4 w-full">{children}</div>;
};

const GroupHeader = ({ children }) => {
  return <div className="w-full text-lg font-semibold">{children}</div>;
};

const GroupBody = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

const GroupRow = ({ children }) => {
  return <div className="w-full flex min-h-[2.5rem] border-x border-b first:border-t">{children}</div>;
};

/**
 * @typedef {object} GroupColProps
 * @property {number} colSize
 */

/**
 * @type FC<GroupColProps & GroupLabelProps>
 */
const GroupCol = (props) => {
  const { children, label, labelSize, colSize = 4 } = props;
  return (
    <>
      {label && <GroupLabel labelSize={labelSize} label={label} />}
      <div className={classNames("p-1 flex items-center space-x-1", SIZES[colSize])}>{children}</div>
    </>
  );
};

/**
 * @typedef {object} GroupLabelProps
 * @property {boolean} required
 * @property {string} label
 * @property {number} labelSize
 */

/**
 * @type FC<GroupLabelProps & import('@/components/FormControl').FormControlProps>
 */
const GroupLabel = forwardRef((props, ref) => {
  const { required, type, label, labelSize = 2, ...rest } = props;
  return (
    <div
      className={classNames(
        "font-semibold relative flex items-center p-1 break-all bg-header border-x first:border-l-0 last:border-r-0 first:last:border-r",
        SIZES[labelSize]
      )}>
      {type ? <FormControl ref={ref} {...rest} /> : label}
      {required && <span className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": type })}>*</span>}
    </div>
  );
});

/**
 * @typedef {object} GroupControlProps
 * @property {number} controlSize
 */

/**
 * @type FC<GroupControlProps & GroupLabelProps & import('@/components/FormControl').FormControlProps>
 */
const GroupControl = forwardRef((props, ref) => {
  const { required, labelSize, label, controlSize = 4, ...rest } = props;
  return (
    <>
      {label && <GroupLabel label={label} required={required} labelSize={labelSize} />}
      <div className={classNames("p-1 flex items-center", SIZES[controlSize])}>
        <FormControl ref={ref} {...rest} />
      </div>
    </>
  );
});

Group.Header = GroupHeader;
Group.Body = GroupBody;
Group.Row = GroupRow;
Group.Col = GroupCol;
Group.Label = GroupLabel;
Group.Control = GroupControl;
