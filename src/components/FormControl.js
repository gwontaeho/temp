import "react-datepicker/dist/react-datepicker.css";

import { forwardRef } from "react";
import { Controller } from "react-hook-form";
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
    case "passsword":
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
    default:
      return <InputText ref={ref} {...rest} />;
  }
});

const InputText = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;

  const cn = "input" + (className ? ` ${className}` : "");
  return (
    <div className="w-full space-y-1">
      <input ref={ref} {...rest} type="text" className={cn} />
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputNumber = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;

  const cn = "input" + (className ? ` ${className}` : "");
  return (
    <div className="w-full space-y-1">
      <input ref={ref} {...rest} type="number" className={cn} />
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputPassword = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;

  const cn = "input" + (className ? ` ${className}` : "");
  return (
    <div className="w-full space-y-1">
      <input ref={ref} {...rest} type="password" className={cn} />
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const Textarea = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;

  const cn = "input h-14 overflow-hidden" + (className ? ` ${className}` : "");
  return <textarea ref={ref} {...rest} className={cn} />;
});

const Select = forwardRef((props, ref) => {
  const { options, className, ...rest } = props;
  console.log(options);

  const cn = "input" + (className ? ` ${className}` : "");
  return (
    <select ref={ref} {...rest} className={cn}>
      {Array.isArray(options) &&
        options.map(({ label, value }) => {
          return (
            <option key={uuid()} value={value}>
              {label}
            </option>
          );
        })}
    </select>
  );
});

const Checkbox = forwardRef((props, ref) => {
  const { options, ...rest } = props;
  return (
    <div className="flex flex-wrap">
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
});

const Radio = forwardRef((props, ref) => {
  const { options, ...rest } = props;
  return (
    <div className="flex flex-wrap">
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
});

const InputDate = forwardRef((props, ref) => {
  const { name, invalid, control, rules, className } = props;

  const cn = "input" + (className ? ` ${className}` : "");

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className={cn} selected={value} onChange={onChange} />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputTime = forwardRef((props, ref) => {
  const { name, invalid, control, rules, className } = props;

  const cn = "input" + (className ? ` ${className}` : "");

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              className={cn}
              dateFormat="HH:mm"
              timeIntervals={5}
              showTimeSelect
              showTimeSelectOnly
              selected={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputDateTime = forwardRef((props, ref) => {
  const { name, invalid, control, rules, className } = props;
  const cn = "input" + (className ? ` ${className}` : "");

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className={cn} timeIntervals={5} showTimeSelect selected={value} onChange={onChange} />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputBetween = forwardRef((props, ref) => {
  const { id, schema, options, setValue } = props;
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
      <div className="flex-1">
        <FormControl {...entries[0][1]} className="rounded-r-none" />
      </div>
      <div className="flex items-center justify-center h-7 w-5 bg-header border-y">-</div>
      <div className="flex-1">
        <FormControl {...entries[1][1]} className={`rounded-l-none${options ? " rounded-r-none" : ""}`} />
      </div>
      {options && (
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
