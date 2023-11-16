import "react-datepicker/dist/react-datepicker.css";
import "./FormControl.css";

import { forwardRef, memo, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";
import uuid from "react-uuid";
import { Button } from "./Button";

export const FormControl = forwardRef((props, ref) => {
  const { type, ...rest } = props;

  switch (type) {
    case "text":
      return <InputText ref={ref} {...rest} />;
    case "number":
      return <InputNumber ref={ref} {...rest} />;
    case "password":
      return <InputPassword ref={ref} {...rest} />;
    case "select":
      return <Select ref={ref} {...rest} />;
    case "radio":
      return <Radio ref={ref} {...rest} />;
    case "checkbox":
      return <Checkbox ref={ref} {...rest} />;
    case "textarea":
      return <Textarea ref={ref} {...rest} />;
    case "date":
      return <InputDate ref={ref} {...rest} />;
    case "time":
      return <InputTime ref={ref} {...rest} />;
    case "datetime":
      return <InputDateTime ref={ref} {...rest} />;
    case "between":
      return <InputBetween ref={ref} {...rest} />;
    case "file":
      return <InputFile ref={ref} {...rest} />;
    default:
      return <InputText ref={ref} {...rest} />;
  }
});

const InputFile = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      <input ref={ref} {...rest} type="file" className={classNames("input", { [className]: className })} />
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputText = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      <input
        {...rest}
        ref={ref}
        type="text"
        data-edit={edit}
        {...(edit === false && { readOnly: true })}
        className={classNames("input", { [className]: className })}
      />
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputNumber = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      <input
        {...rest}
        ref={ref}
        type="number"
        data-edit={edit}
        {...(edit === false && { readOnly: true })}
        className={classNames("input", { [className]: className })}
      />
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputPassword = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      <input
        {...rest}
        ref={ref}
        type="password"
        data-edit={edit}
        {...(edit === false && { readOnly: true })}
        className={classNames("input", { [className]: className })}
      />
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const Textarea = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      <textarea
        {...rest}
        ref={ref}
        data-edit={edit}
        {...(edit === false && { readOnly: true })}
        className={classNames("input h-14 overflow-hidden", { [className]: className })}
      />
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const Select = forwardRef((props, ref) => {
  const { getValues, edit, invalid, size = "full", options, className, ...rest } = props;

  return (
    <div className={classNames("space-y-1", { "w-fit": size === "fit", "w-full": size === "full" })}>
      <div className="relative flex items-center">
        <select
          {...rest}
          ref={ref}
          data-edit={edit}
          {...(edit === false && { readOnly: true })}
          className={classNames("input appearance-none", {
            "pointer-events-none": edit === false,
            [className]: className,
          })}>
          <Select.Options options={options} />
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3 absolute right-1 pointer-events-none">
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

Select.Options = memo(({ options }) => {
  return (
    Array.isArray(options) &&
    options.map(({ label, value }) => {
      return (
        <option key={uuid()} value={value}>
          {label}
        </option>
      );
    })
  );
});

const Checkbox = forwardRef((props, ref) => {
  const { getValues, edit, id, invalid, options, ...rest } = props;

  const [_value, _setValue] = useState([]);

  useEffect(() => {
    if (!edit === false) return;
    const value = getValues(props.name);
    if (value) _setValue(value);
  }, [edit]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap">
        {Array.isArray(options) &&
          options.map(({ label, value }) => {
            return (
              <div
                key={uuid()}
                className={classNames("flex items-center h-7 space-x-1 mr-3", { hidden: edit === false })}>
                <input ref={ref} {...rest} type="checkbox" value={value} />
                {label && <label>{label}</label>}
              </div>
            );
          })}
        {edit === false && <span>{_value.join(", ")}</span>}
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const Radio = forwardRef((props, ref) => {
  const { getValues, edit, id, invalid, options, ...rest } = props;

  const [_value, _setValue] = useState([]);

  useEffect(() => {
    if (!edit === false) return;
    const value = getValues(props.name);
    if (value) _setValue(value);
  }, [edit]);

  return (
    <div className="w-ful">
      <div className="flex flex-wrap">
        {Array.isArray(options) &&
          options.map(({ label, value }) => {
            return (
              <div
                key={uuid()}
                className={classNames("flex items-center h-7 space-x-1 mr-3", { hidden: edit === false })}>
                <input ref={ref} {...rest} type="radio" value={value} />
                {label && <label>{label}</label>}
              </div>
            );
          })}
        {edit === false && <span className="p-1">{_value}</span>}
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputDate = forwardRef((props, ref) => {
  const { getValues, edit, name, invalid, control, rules, className } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              selected={value}
              onChange={onChange}
              {...(edit === false && { readOnly: true })}
              className={classNames("input", {
                "bg-transparent border-transparent focus:border-transparent": edit === false,
                [className]: className,
              })}
            />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputTime = forwardRef((props, ref) => {
  const { getValues, edit, name, invalid, control, rules, className } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              dateFormat="HH:mm"
              timeIntervals={5}
              showTimeSelect
              showTimeSelectOnly
              selected={value}
              onChange={onChange}
              {...(edit === false && { readOnly: true })}
              className={classNames("input", {
                "bg-transparent border-transparent focus:border-transparent": edit === false,
                [className]: className,
              })}
            />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputDateTime = forwardRef((props, ref) => {
  const { getValues, edit, name, invalid, control, rules, className } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              timeIntervals={5}
              showTimeSelect
              selected={value}
              onChange={onChange}
              dateFormat="MM/dd/yyyy HH:mm"
              {...(edit === false && { readOnly: true })}
              className={classNames("input", {
                "bg-transparent border-transparent focus:border-transparent": edit === false,
                [className]: className,
              })}
            />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputBetween = forwardRef((props, ref) => {
  const { getValues, edit, id, schema, options, setValue } = props;
  const entries = Object.entries(schema);

  const handleClickButton = (unit, value) => {
    const isAdd = value > 0;
    const today = new Date();
    if (isAdd) {
      setValue(entries[0][0], today);
      setValue(entries[1][0], dayjs(today).add(value, unit).toDate());
    } else {
      setValue(entries[0][0], dayjs(today).add(value, unit).toDate());
      setValue(entries[1][0], today);
    }
  };

  return (
    <div className="w-full flex">
      <div className={classNames({ "flex-1": edit !== false })}>
        <FormControl
          {...entries[0][1]}
          edit={edit}
          className={classNames("rounded-r-none", { "w-20": edit === false })}
        />
      </div>
      <div className={classNames("flex items-center justify-center h-7 w-5", { "bg-header border-y": edit !== false })}>
        -
      </div>
      <div className={classNames({ "flex-1": edit !== false })}>
        <FormControl
          {...entries[1][1]}
          edit={edit}
          className={classNames("rounded-l-none", { "w-20": edit === false, "rounded-r-none": options })}
        />
      </div>
      {edit !== false && options && (
        <div className="flex [&>button]:bg-header [&>button]:text-sm [&>button]:border-l-0 [&>button]:rounded-none last:[&>button]:rounded-r">
          {InputBetweenOptions[options].map(({ label, unit, value }) => {
            return (
              <Button key={id + "." + label} onClick={() => handleClickButton(unit, value)}>
                {label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
});

const InputBetweenOptions = {
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
