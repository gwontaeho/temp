import "react-datepicker/dist/react-datepicker.css";
import "./FormControl.css";

import { forwardRef, memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";
import uuid from "react-uuid";
import { Button, Icon } from "@/components";

export const FormControl = forwardRef((props, ref) => {
  const { type, invalid, getValues, edit, ...inputProps } = props;

  useEffect(() => {
    if (type === "between") return;
    if (!getValues) return;
    const controlElement = document.getElementById(props.id);
    const textElement = document.getElementById(`${props.id}.text`);

    if (!controlElement) return;
    if (edit === false) {
      controlElement.classList.add("hidden");
      const value = getValues(props.name);
      if (!value) return;
      textElement.innerHTML = value;
    } else {
      controlElement.classList.remove("hidden");
    }
  }, [edit]);

  let control;
  switch (type) {
    case "text":
      control = <InputText ref={ref} {...inputProps} />;
      break;
    case "number":
      control = <InputNumber ref={ref} {...inputProps} />;
      break;
    case "password":
      control = <InputPassword ref={ref} {...inputProps} />;
      break;
    case "select":
      control = <Select ref={ref} {...inputProps} />;
      break;
    case "radio":
      control = <Radio ref={ref} {...inputProps} />;
      break;
    case "checkbox":
      control = <Checkbox ref={ref} {...inputProps} />;
      break;
    case "textarea":
      control = <Textarea ref={ref} {...inputProps} />;
      break;
    case "date":
      control = <InputDate ref={ref} {...inputProps} />;
      break;
    case "time":
      control = <InputTime ref={ref} {...inputProps} />;
      break;
    case "datetime":
      control = <InputDateTime ref={ref} {...inputProps} />;
      break;
    case "between":
      control = <InputBetween ref={ref} edit={edit} {...inputProps} />;
      break;
    case "file":
      control = <InputFile ref={ref} {...inputProps} />;
      break;
    default:
      control = <InputText ref={ref} {...inputProps} />;
      break;
  }

  return (
    <div className="flex flex-col w-full space-y-1">
      {type !== "between" && edit === false && <span id={`${props.id}.text`} className="break-all" />}
      {control}
      {invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputText = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;
  const cn = classNames("input", { [className]: className });

  return <input {...rest} ref={ref} type="text" className={cn} />;
});

const InputNumber = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;
  const cn = classNames("input", { [className]: className });

  return <input {...rest} ref={ref} type="number" className={cn} />;
});

const InputPassword = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;
  const cn = classNames("input", { [className]: className });

  return <input {...rest} ref={ref} type="password" autoComplete="off" className={cn} />;
});

const Textarea = forwardRef((props, ref) => {
  const { invalid, className, ...rest } = props;
  const cn = classNames("input h-14 overflow-hidden", { [className]: className });

  return <textarea {...rest} ref={ref} className={cn} />;
});

const Select = forwardRef((props, ref) => {
  const { invalid, size = "full", options, className, id, ...rest } = props;
  const cn = classNames("input appearance-none", { [className]: className });

  return (
    <div id={id} className="relative flex items-center">
      <select {...rest} ref={ref} className={cn}>
        <Select.Options options={options} />
      </select>
      <Icon icon="down" size="sm" className="absolute right-1 pointer-events-none" />
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
  const { id, invalid, options, ...rest } = props;

  return (
    <div id={id} className="flex flex-wrap">
      {Array.isArray(options) &&
        options.map(({ label, value }) => {
          return (
            <div key={uuid()} className={classNames("flex items-center h-7 space-x-1 mr-3")}>
              <input ref={ref} {...rest} type="checkbox" value={value} />
              {label && <label>{label}</label>}
            </div>
          );
        })}
    </div>
  );
});

const Radio = forwardRef((props, ref) => {
  const { id, invalid, options, ...rest } = props;

  return (
    <div id={id} className="flex flex-wrap">
      {Array.isArray(options) &&
        options.map(({ label, value }) => {
          return (
            <div key={uuid()} className={classNames("flex items-center h-7 space-x-1 mr-3")}>
              <input ref={ref} {...rest} type="radio" value={value} />
              {label && <label>{label}</label>}
            </div>
          );
        })}
    </div>
  );
});

const InputDate = forwardRef((props, ref) => {
  const { id, name, invalid, control, rules, className, ...rest } = props;
  const cn = classNames("input", { [className]: className });

  return (
    <div id={id} className="[&>div]:w-full">
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker selected={value} onChange={onChange} className={cn} />
          )}
        />
      ) : (
        <ReactDatePicker {...rest} className={cn} />
      )}
    </div>
  );
});

const InputTime = forwardRef((props, ref) => {
  const { id, name, invalid, control, rules, className } = props;
  const cn = classNames("input", { [className]: className });
  const dateFormat = "HH:mm";

  return (
    <div id={id} className="[&>div]:w-full">
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              dateFormat={dateFormat}
              timeIntervals={5}
              showTimeSelect
              showTimeSelectOnly
              selected={value}
              onChange={onChange}
              className={cn}
            />
          )}
        />
      ) : (
        <ReactDatePicker dateFormat={dateFormat} timeIntervals={5} showTimeSelect showTimeSelectOnly className={cn} />
      )}
    </div>
  );
});

const InputDateTime = forwardRef((props, ref) => {
  const { id, edit, name, invalid, control, rules, className, ...rest } = props;
  const cn = classNames("input", { [className]: className });
  return (
    <div id={id} className="[&>div]:w-full">
      {control ? (
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
              className={cn}
            />
          )}
        />
      ) : (
        <ReactDatePicker {...rest} timeIntervals={5} showTimeSelect dateFormat="MM/dd/yyyy HH:mm" className={cn} />
      )}
    </div>
  );
});

const InputBetween = forwardRef((props, ref) => {
  const { edit, id, schema, options, setValue } = props;
  const entries = Object.entries(schema);
  const isEditFalse = edit === false;

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
    <div className={classNames("w-full flex", { "items-center": isEditFalse })}>
      <div className={classNames({ "flex-1": !isEditFalse })}>
        <FormControl edit={edit} {...entries[0][1]} className={classNames("rounded-r-none")} />
      </div>
      <div className={classNames("flex items-center justify-center h-7 w-5", { "bg-header border-y": !isEditFalse })}>
        -
      </div>
      <div className={classNames({ "flex-1": !isEditFalse })}>
        <FormControl
          edit={edit}
          {...entries[1][1]}
          className={classNames("rounded-l-none", { "rounded-r-none": options })}
        />
      </div>
      {!isEditFalse && options && (
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

const InputFile = forwardRef((props, ref) => {
  const { getValues, edit, invalid, className, ...rest } = props;

  return <input ref={ref} {...rest} type="file" className={classNames("input", { [className]: className })} />;
});
