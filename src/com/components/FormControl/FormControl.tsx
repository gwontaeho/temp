import "react-datepicker/dist/react-datepicker.css";
import "./FormControl.css";

import React, { Children, forwardRef, memo, useState } from "react";

import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { Icon, IconProps, IconsType, Tooltip } from "@/com/components";

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
  | "between";

type FormControlButtonProps = {
  icon: IconsType;
  onClick: () => void;
};

type FormControlTextProps = {
  text: string;
};

const FormControlButtonLeft = (props: FormControlButtonProps) => {
  const { icon, onClick } = props;
  return (
    <button type="button" className="button border-r-0 rounded-r-none" onClick={onClick}>
      <Icon icon={icon} size="xs" />
    </button>
  );
};

const FormControlButtonRight = (props: FormControlButtonProps) => {
  const { icon, onClick } = props;
  return (
    <button type="button" className="button border-l-0 rounded-l-none" onClick={onClick}>
      <Icon icon={icon} size="xs" />
    </button>
  );
};

const FormControlTextRight = (props: FormControlTextProps) => {
  const { text } = props;
  return <span className="absolute right-0 px-1">{text}</span>;
};

const FormControlInvalidMessage = () => {
  return <div className="text-invalid text-sm">invalid field</div>;
};

type FormControlTextModeProps = {
  type: FormControlType;
  name: string;
  getValues: (name?: string) => string;
};

const FormControlTextMode = (props: FormControlTextModeProps) => {
  const { type, name, getValues } = props;

  let value = getValues(name);
  switch (type) {
    case "date":
      value = dayjs(value).format("YYYY/MM/DD");
      break;
    case "time":
      value = dayjs(value).format("HH:mm");
      break;
    case "datetime":
      value = dayjs(value).format("YYYY/MM/DD");
      break;
  }

  return (
    <div className="space-x-1">
      <span className="break-all">{value}</span>
    </div>
  );
};

type FormControlEditModeProps = InputDateProps & {
  type: FormControlType;
  options?: FormControlOptionsType;
};

const FormControlEditMode = forwardRef<
  HTMLInputElement | HTMLScriptElement | HTMLTextAreaElement,
  FormControlEditModeProps
>((props: FormControlEditModeProps, ref) => {
  switch (props.type) {
    case "text":
      return <InputText {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "number":
      return <InputNumber {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "password":
      return <InputPassword {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "select":
      return <Select {...props} ref={ref as React.ForwardedRef<HTMLSelectElement>} />;
    case "radio":
      return <Radio {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "checkbox":
      return <Checkbox {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "textarea":
      return <Textarea {...props} ref={ref as React.ForwardedRef<HTMLTextAreaElement>} />;
    case "file":
      return <InputFile {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
    case "date":
      return <InputDate {...props} />;
    case "time":
      return <InputTime {...props} />;
    case "datetime":
      return <InputDateTime {...props} />;
    // case "between":
    //   return <InputBetween {...props} />;
    default:
      return <InputText {...props} ref={ref as React.ForwardedRef<HTMLInputElement>} />;
  }
});

type FormControlProps = {
  type?: FormControlType;
  size?: keyof typeof SIZES;
  name?: string;
  leftButton?: FormControlButtonProps;
  rightButton?: FormControlButtonProps;
  rightText?: string;
  options?: FormControlOptionsType;
  edit?: boolean;
  invalid?: boolean;
  getValues: () => void;
  setValue: () => void;
};

type FormControlContainerProps = {
  children?: React.ReactNode;
  size: keyof typeof SIZES;
};

const FormControlContainer = (props: FormControlContainerProps) => {
  const { children, size } = props;
  return <div className={classNames("space-y-1", SIZES[size])}>{children}</div>;
};

type FormControlSectionProps = {
  children?: React.ReactNode;
  hasRightButton: boolean;
  hasLeftButton: boolean;
  isBetween: boolean;
  isTextMode: boolean;
};

const FormControlSection = (props: FormControlSectionProps) => {
  const { children, hasRightButton, hasLeftButton, isBetween, isTextMode } = props;
  return (
    <div
      className={classNames("flex w-full", {
        "[&_.input]:rounded-r-none": hasRightButton,
        "[&_.input]:rounded-l-none": hasLeftButton,
        hidden: !isBetween && isTextMode,
      })}>
      {children}
    </div>
  );
};

type FormControlMainProps = {
  children?: React.ReactNode;
};

const FormControlMain = (props: FormControlMainProps) => {
  const { children } = props;
  return <div className={classNames("w-full relative flex items-center")}>{children}</div>;
};

const FormControl = React.forwardRef<React.FC, FormControlProps>((props, ref) => {
  const {
    type = "text",
    name,
    size = "full",
    edit = true,
    invalid,
    leftButton,
    rightText,
    rightButton,
    getValues,
    setValue,
    ...rest
  } = props;

  const isBetween = type === "between";
  const hasLeftButton = Boolean(leftButton && edit);
  const hasRightButton = Boolean(rightButton && edit);
  const hasRightText = Boolean(rightText);
  const isTextMode = edit === false;

  const sectionProps = { hasRightButton, hasLeftButton, isBetween, isTextMode };
  const textModeProps = { type, name, getValues };
  const editModeProps = { type, hasLeftButton, hasRightButton, ...rest };

  return (
    <FormControlContainer size={size}>
      <FormControlSection {...sectionProps}>
        {leftButton && <FormControlButtonLeft {...leftButton} />}

        <FormControlMain>
          {/* {isTextMode && <FormControlTextMode {...textModeProps} />} */}
          <FormControlEditMode {...editModeProps} />
          {rightText && <FormControlTextRight text={rightText} />}
        </FormControlMain>

        {rightButton && <FormControlButtonRight {...rightButton} />}
      </FormControlSection>

      {invalid && <FormControlInvalidMessage />}
    </FormControlContainer>
  );
});

const InputText = forwardRef<HTMLInputElement, FormattedInputProps>(
  (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <FormattedInput {...props} ref={ref} autoComplete="off" className="input" />;
  }
);

const InputNumber = forwardRef<HTMLInputElement, FormattedInputProps>(
  (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <FormattedInput {...props} ref={ref} inputMode="numeric" autoComplete="off" className="input" />;
  }
);

const InputPassword = forwardRef<HTMLInputElement, FormattedInputProps>(
  (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref} type="password" autoComplete="off" className="input" />;
  }
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return <textarea {...props} ref={ref} className="input overflow-hidden" />;
  }
);

type FormControlOptionsType = { label: string; value: string }[];

type SelectOptionsProps = {
  options?: FormControlOptionsType;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & SelectOptionsProps & {};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const { options, ...rest } = props;
    return (
      <div className="relative flex w-full items-center">
        <select {...rest} ref={ref} className="input appearance-none pr-5">
          {Array.isArray(options) &&
            options.map(({ label, value }) => {
              return (
                <option key={uuid()} value={value}>
                  {label}
                </option>
              );
            })}
        </select>
        <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
      </div>
    );
  }
);

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options?: FormControlOptionsType;
};

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (props: CheckBoxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { options, ...rest } = props;
    return (
      <div className="flex flex-wrap w-fit">
        {Array.isArray(options) &&
          options.map(({ label, value }) => {
            return (
              <div key={uuid()} className="flex items-center h-7 space-x-1 mr-3">
                <input ref={ref} {...rest} type="checkbox" value={value} />
                {label && <label>{label}</label>}
              </div>
            );
          })}
      </div>
    );
  }
);

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options?: FormControlOptionsType;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { id, options, ...rest } = props;
    return (
      <div id={id} className="flex flex-wrap w-fit">
        {Array.isArray(options) &&
          options.map(({ label, value }) => {
            return (
              <div key={uuid()} className="flex items-center h-7 space-x-1 mr-3">
                <input ref={ref} {...rest} type="radio" value={value} />
                {label && <label>{label}</label>}
              </div>
            );
          })}
      </div>
    );
  }
);

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (props: InputFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        {...props}
        ref={ref}
        type="file"
        className="file h-7 border rounded w-full file:h-full file:outline-none file:bg-header file:border-none file:text-text cursor-pointer"
      />
    );
  }
);

type InputDateProps = {
  name?: string;
  control?: any;
  rules?: any;
};

const InputDate = (props: InputDateProps) => {
  const { name, control, rules } = props;
  const [selected, setSelected] = useState<Date | null>();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {!name || !control ? (
        <ReactDatePicker
          autoComplete="off"
          selected={selected}
          onChange={setSelected}
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
          portalId="root"
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            return (
              <ReactDatePicker
                autoComplete="off"
                selected={value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      )}
    </div>
  );
};

const InputTime = (props: InputDateProps) => {
  const { name, control, rules } = props;
  const [selected, setSelected] = useState<Date | null>();
  const dateFormat = "HH:mm";

  return (
    <div className="w-full [&>div]:w-full">
      <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {!name || !control ? (
        <ReactDatePicker
          autoComplete="off"
          selected={selected}
          onChange={setSelected}
          dateFormat={dateFormat}
          timeIntervals={5}
          showTimeSelect
          showTimeSelectOnly
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            return (
              <ReactDatePicker
                autoComplete="off"
                dateFormat={dateFormat}
                timeIntervals={5}
                showTimeSelect
                showTimeSelectOnly
                selected={value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      )}
    </div>
  );
};

const InputDateTime = (props: InputDateProps) => {
  const { name, control, rules } = props;
  const [selected, setSelected] = useState<Date | null>();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {!name || !control ? (
        <ReactDatePicker
          autoComplete="off"
          selected={selected}
          onChange={setSelected}
          timeIntervals={5}
          showTimeSelect
          dateFormat="MM/dd/yyyy HH:mm"
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            return (
              <ReactDatePicker
                autoComplete="off"
                timeIntervals={5}
                showTimeSelect
                selected={value}
                onChange={onChange}
                dateFormat="MM/dd/yyyy HH:mm"
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      )}
    </div>
  );
};

type InputBetweenProps = {
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  edit?: boolean;
  button?: keyof typeof BETWEEN_BUTTON_OPTIONS;
  schema?: { [key: string]: FormControlProps };
  setValue?: (name: string, value: any) => void;
};

// const InputBetween = (props: InputBetweenProps) => {
//   const { edit, schema, button, setValue, hasLeftButton, hasRightButton } = props;
//   const [begin, end] = Object.entries(schema);

//   const Begin = () => {
//     const schema = { name: begin[0], ...begin[1] };
//     return (
//       <div
//         className={classNames("[&_.input]:rounded-r-none [&_.button]:rounded-r-none", {
//           "[&_.button]:rounded-l-none": hasLeftButton,
//           "flex-1": edit,
//         })}>
//         <FormControl {...schema} />
//       </div>
//     );
//   };

//   const End = () => {
//     const schema = { name: end[0], ...end[1] };
//     return (
//       <div
//         className={classNames("[&_.input]:rounded-l-none [&_.button]:rounded-l-none", {
//           "[&_.button]:rounded-r-none": button || hasRightButton,
//           "[&_.input]:rounded-r-none": button,
//           "flex-1": edit,
//         })}>
//         <FormControl {...schema} />
//       </div>
//     );
//   };

//   const Buttons = () => {
//     if (!button || !edit) return;

//     const handleClickButton = (unit: BetweenButtonOptionUnitType, value: number) => {
//       if (!setValue) return;
//       const isAdd = value > 0;
//       const today = new Date();
//       if (isAdd) {
//         setValue(begin[0], today);
//         setValue(end[0], dayjs(today).add(value, unit).toDate());
//       } else {
//         setValue(begin[0], dayjs(today).add(value, unit).toDate());
//         setValue(end[0], today);
//       }
//     };

//     return (
//       <div className="flex">
//         {BETWEEN_BUTTON_OPTIONS[button].map(({ label, unit, value }) => {
//           return (
//             <button
//               key={uuid()}
//               onClick={() => handleClickButton(unit, value)}
//               type="button"
//               className={classNames("button bg-header text-sm border-l-0 rounded-none", {
//                 "last:rounded-r": !hasRightButton,
//               })}>
//               {label}
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className={classNames("w-full flex")}>
//       <Begin />
//       <div
//         className={classNames("flex items-center justify-center w-5", {
//           "h-7 bg-header border-y": edit,
//         })}>
//         -
//       </div>
//       <End />
//       <Buttons />
//     </div>
//   );
// };

type BetweenButtonOptionUnitType = "M" | "w" | "d" | "h";
type BetweenButtonOptionType = {
  unit: BetweenButtonOptionUnitType;
  label: string;
  value: number;
};
type BetweenButtonOptionsType = { [key: string]: BetweenButtonOptionType[] };

const BETWEEN_BUTTON_OPTIONS: BetweenButtonOptionsType = {
  date1: [
    { label: "-3M", unit: "M", value: -3 },
    { label: "-1M", unit: "M", value: -1 },
    { label: "-1W", unit: "w", value: -1 },
    { label: "0", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
    { label: "+1M", unit: "M", value: 1 },
    { label: "+3M", unit: "M", value: 3 },
  ],
  date2: [
    { label: "+1D", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
    { label: "+1M", unit: "M", value: 1 },
    { label: "+2M", unit: "M", value: 2 },
    { label: "+3M", unit: "M", value: 3 },
    { label: "+6M", unit: "M", value: 6 },
    { label: "+12M", unit: "M", value: 12 },
  ],
  date3: [
    { label: "-1M", unit: "M", value: -1 },
    { label: "-1W", unit: "w", value: -1 },
    { label: "Today", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
  ],
  time1: [
    { label: "-3H", unit: "h", value: -3 },
    { label: "-2H", unit: "h", value: -2 },
    { label: "-1H", unit: "h", value: -1 },
    { label: "+1H", unit: "h", value: 1 },
    { label: "+2H", unit: "h", value: 2 },
    { label: "+3H", unit: "h", value: 3 },
  ],
};

type ValuesType = {
  value?: string;
  formattedValue?: string;
};

type FormattedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask?: string;
  exact?: boolean;
  decimalScale?: number;
  thousandSeparator?: boolean;
  letterCase?: "upper" | "lower";
  onValueChange?: (values?: ValuesType) => void;
};

export const FormattedInput = React.forwardRef<HTMLInputElement, FormattedInputProps>(
  (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      mask,
      exact = true,
      decimalScale,
      thousandSeparator = false,
      letterCase,
      onValueChange,
      onChange,
      ...rest
    } = props;

    const SET_LETTER = ["a", "A", "0", "*"];
    const REG_NUMBER = /^[0-9]+$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v: ValuesType = { value: e.target.value, formattedValue: "" };
      handleLowerCase(e, v);
      handleUpperCase(e, v);
      handleDecimalScale(e, v);
      handleThousandSeparator(e, v);
      handleMask(e, v);
      if (onValueChange) onValueChange(v);
      if (onChange) onChange(e);
    };

    const handleLowerCase = (e: React.ChangeEvent<HTMLInputElement>, v: ValuesType) => {
      if (letterCase !== "lower") return;
      e.target.value = e.target.value.toLowerCase();
      v.value = e.target.value;
      v.formattedValue = e.target.value;
    };

    const handleUpperCase = (e: React.ChangeEvent<HTMLInputElement>, v: ValuesType) => {
      if (letterCase !== "upper") return;
      e.target.value = e.target.value.toUpperCase();
      v.value = e.target.value;
      v.formattedValue = e.target.value;
    };

    const handleDecimalScale = (e: React.ChangeEvent<HTMLInputElement>, v: ValuesType) => {
      if (decimalScale === undefined) return;
      if (isNaN(Number(e.target.value.replaceAll(",", "")))) e.target.value = e.target.value.replaceAll(/[\D]/g, "");
      const int = e.target.value.split(".")[0];
      const dec = e.target.value.split(".")[1]?.replaceAll(",", "").slice(0, decimalScale);
      e.target.value = int + (dec !== undefined ? "." + dec : "");
      v.value = e.target.value.replaceAll(",", "");
      v.formattedValue = e.target.value;
    };

    const handleThousandSeparator = (e: React.ChangeEvent<HTMLInputElement>, v: ValuesType) => {
      if (!thousandSeparator) return;
      if (isNaN(Number(e.target.value.replaceAll(",", "")))) e.target.value = e.target.value.replaceAll(/[\D]/g, "");
      const int = e.target.value.split(".")[0];
      const dec = e.target.value.split(".")[1]?.replaceAll(",", "");
      e.target.value = Number(int.replaceAll(",", "")).toLocaleString() + (dec !== undefined ? "." + dec : "");
      v.value = e.target.value.replaceAll(",", "");
      v.formattedValue = e.target.value;
    };

    const handleMask = (e: React.ChangeEvent<HTMLInputElement>, v: ValuesType) => {
      if (decimalScale !== undefined || thousandSeparator) return;
      if (mask === undefined) return;
      const oldValue = e.target.value;
      let maskedValueArray = mask.split("");
      let oldValueArray = oldValue.split("");
      let newValueArray = [];
      let formattedValueArray = [];
      const maxFormattedLength = maskedValueArray.length;
      const maxLength = maskedValueArray.filter((_) => SET_LETTER.includes(_)).length;

      for (let i = 0; i < oldValueArray.length; i++) {
        let skip = 0;
        for (let j = i + skip; !SET_LETTER.includes(maskedValueArray[i + skip]) && i + skip < maxFormattedLength; j++) {
          if (maskedValueArray[i] === oldValueArray[i]) break;
          formattedValueArray[j] = maskedValueArray[j];
          skip++;
        }
        let letter = oldValueArray[i];
        const letterType = maskedValueArray[i + skip];
        const isNumber = REG_NUMBER.test(letter);
        const shouldUpperString = letterType === "A";
        const shouldLowerString = letterType === "a";
        const shouldNumber = letterType === "0";
        if (shouldNumber && !isNumber) break;
        if ((shouldUpperString || shouldLowerString) && isNumber) break;
        if (shouldUpperString) letter = letter.toUpperCase();
        if (shouldLowerString) letter = letter.toLowerCase();
        if (maskedValueArray[i] !== letter) newValueArray.push(letter);
        formattedValueArray[i + skip] = letter;
      }

      let value = newValueArray.join("");
      let formattedValue = formattedValueArray.join("");
      value = exact ? value.substring(0, maxLength) : value;
      formattedValue = exact ? formattedValue.substring(0, maxFormattedLength) : formattedValue;
      e.target.value = formattedValue;
      v.value = value;
      v.formattedValue = formattedValue;
    };

    return <input {...rest} ref={ref} onChange={handleChange} />;
  }
);

const Compound = Object.assign(
  {},
  FormControl
  //  { Group: FormControlGroup }
);

export { Compound as FormControl };
