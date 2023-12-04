import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect } from "react";
import { useController, Control } from "react-hook-form";
import classNames from "classnames";
import { Icon, IconsType, Tooltip } from "@/com/components";
import {
  InputText,
  InputNumber,
  InputPassword,
  Textarea,
  Select,
  Checkbox,
  Radio,
  InputFile,
  InputDate,
  InputTime,
  InputDatetime,
  InputDaterange,
  InputRange,
} from "@/com/components/_";

type FormControlType =
  | "text"
  | "number"
  | "password"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea"
  | "date"
  | "time"
  | "datetime"
  | "file"
  | "daterange"
  | "timerange"
  | "range";

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
  12: "w-full",
  fit: "w-fit",
  full: "w-full",
};

export type FormControlOptionsType = {
  label: string;
  value: string;
}[];

type FormControlTextModeProps = {
  type?: FormControlType;
  name?: string;
  edit?: boolean;
  value?: any;
};

type FormControlEditModeProps = {
  type?: FormControlType;
  name?: string;
  value?: any;
  edit?: boolean;
  rightText?: string;
  options?: FormControlOptionsType;
  leftButton?: { icon: IconsType; onClick: () => void };
  rightButton?: { icon: IconsType; onClick: () => void };
  setValue?: () => void;
  onChange?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
};

type FormControlMainProps = FormControlEditModeProps &
  FormControlTextModeProps & {
    size?: keyof typeof SIZES;
    invalid?: boolean;
    control?: any;
  };

export type FormControlProps = FormControlMainProps;

const FormControlTextMode = (props: FormControlTextModeProps) => {
  const { type, name, value, edit = true } = props;

  const [text, setText] = React.useState<string>();

  if (edit) return null;
  return <span className="break-all">{value}</span>;
};

const FormControlEditMode = React.forwardRef<any>((props: FormControlEditModeProps, ref) => {
  const { edit = true, rightButton, leftButton, rightText, setValue, ...rest } = props;

  return (
    <div
      className={classNames("flex w-full", {
        "[&_.input]:rounded-r-none": rightButton,
        "[&_.input]:rounded-l-none": leftButton,
        hidden: !edit,
      })}>
      {leftButton && (
        <button type="button" onClick={leftButton.onClick} className="button border-r-0 rounded-r-none">
          <Icon icon={leftButton.icon} size="xs" />
        </button>
      )}
      <div className={"w-full relative flex items-center"}>
        {(() => {
          switch (props.type) {
            case "text":
              return <InputText {...rest} ref={ref} />;
            case "number":
              return <InputNumber {...rest} ref={ref} />;
            case "password":
              return <InputPassword {...rest} ref={ref} />;
            case "select":
              return <Select {...rest} ref={ref} />;
            case "radio":
              return <Radio {...rest} ref={ref} />;
            case "checkbox":
              return <Checkbox {...rest} ref={ref} />;
            case "textarea":
              return <Textarea {...rest} ref={ref} />;
            case "file":
              return <InputFile {...rest} ref={ref} />;
            case "date":
              return <InputDate {...rest} />;
            case "time":
              return <InputTime {...rest} />;
            case "datetime":
              return <InputDatetime {...rest} />;
            case "daterange":
              return <InputDaterange {...props} />;
            case "range":
              return <InputRange {...props} />;
            default:
              return <InputText {...rest} ref={ref} />;
          }
        })()}
        {rightText && <span className="absolute right-0 px-1">{rightText}</span>}
      </div>
      {rightButton && (
        <button type="button" className="button border-l-0 rounded-l-none" onClick={rightButton.onClick}>
          <Icon icon={rightButton.icon} size="xs" />
        </button>
      )}
    </div>
  );
});

const WithController = (props: { children: React.ReactElement; name: string; control: Control }) => {
  const { children, name, control } = props;
  const { field } = useController({ name, control });
  return React.cloneElement(children, field);
};

const FormControlMain = React.forwardRef((props: FormControlMainProps, ref) => {
  const { size = "full", invalid } = props;

  const textModeProps = {
    type: props.type,
    name: props.name,
    value: props.value,
    edit: props.edit,
  };

  return (
    <div className={classNames(SIZES[size])}>
      <FormControlTextMode {...textModeProps} />
      <Tooltip enabled={Boolean(invalid)} size="full" text="invalid field">
        <FormControlEditMode ref={ref} {...props} />
      </Tooltip>
      {invalid && <div className="text-invalid text-sm mt-1">invalid field</div>}
    </div>
  );
});

export const FormControl = React.forwardRef((props: FormControlProps, ref) => {
  console.log(props);
  const { control, ...rest } = props;
  if (props.name && control)
    return (
      <WithController name={props.name} control={props.control}>
        <FormControlMain ref={ref} {...rest} />
      </WithController>
    );
  return <FormControlMain ref={ref} {...props} />;
});
