import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import uuid from "react-uuid";
import "react-datepicker/dist/react-datepicker.css";

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
    case "datebetween":
      return <InputDateBetween ref={ref} {...rest} />;
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
  const { name, invalid, control, rules } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className="input" selected={value} onChange={onChange} />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputTime = forwardRef((props, ref) => {
  const { name, invalid, control, rules } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              className="input"
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
  const { name, invalid, control, rules } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className="input" timeIntervals={5} showTimeSelect selected={value} onChange={onChange} />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});

const InputDateBetween = forwardRef((props, ref) => {
  const { name, invalid, control, rules } = props;

  return (
    <div className="w-full space-y-1">
      <div className="[&>div]:w-full">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className="input" timeIntervals={5} showTimeSelect selected={value} onChange={onChange} />
          )}
        />
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker className="input" timeIntervals={5} showTimeSelect selected={value} onChange={onChange} />
          )}
        />
      </div>
      {invalid && <div className="text-invalid text-sm">입력해주세요</div>}
    </div>
  );
});
