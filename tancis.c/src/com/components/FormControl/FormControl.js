import "react-datepicker/dist/react-datepicker.css";
import "./FormControl.css";

import { forwardRef, memo, useState, FC } from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import classNames from "classnames";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { Icon, Tooltip } from "@/com/components";

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

const CONTROLS = (ref, props) => ({
  text: <InputText {...props} ref={ref} />,
  number: <InputNumber {...props} ref={ref} />,
  password: <InputPassword {...props} ref={ref} />,
  select: <Select {...props} ref={ref} />,
  radio: <Radio {...props} ref={ref} />,
  checkbox: <Checkbox {...props} ref={ref} />,
  textarea: <Textarea {...props} ref={ref} />,
  date: <InputDate {...props} ref={ref} />,
  time: <InputTime {...props} ref={ref} />,
  datetime: <InputDateTime {...props} ref={ref} />,
  file: <InputFile {...props} ref={ref} />,
  between: <InputBetween {...props} ref={ref} />,
});

/**
 * @typedef {object} _formControlProps
 * @property {keyof CONTROLS} type
 * @property {keyof SIZES} size
 * @property {object} leftText
 * @property {object} leftButton
 * @property {object} rightText
 * @property {object} rightButton
 * @property {array} options
 * @typedef {_formControlProps & formattedInputProps} formControlProps
 */

/**
 * @type FC<formControlProps>
 */
const FormControl = forwardRef((props, ref) => {
  const {
    type = "text",
    size = "full",
    edit = true,
    invalid,
    getValues,
    button,
    leftText,
    leftButton,
    rightText,
    rightButton,
    setValue,
    ...rest
  } = props;

  const isBetween = type === "between";
  const hasLeftButton = Boolean(leftButton && edit);
  const hasRightButton = Boolean(rightButton && edit);
  const hasRightText = Boolean(rightText);

  const Control = () => {
    let inputProps = isBetween ? { ...rest, edit, setValue, hasRightButton, hasLeftButton } : rest;

    return (
      <Tooltip enabled={!isBetween && !!invalid} text="invalid field" size="full">
        {CONTROLS(ref, inputProps)[type]}
      </Tooltip>
    );
  };

  const LeftButton = () => {
    if (!hasLeftButton) return;
    return (
      <button type="button" className="button border-r-0 rounded-r-none" onClick={leftButton.onClick}>
        {leftButton.icon && <Icon icon={leftButton.icon} size="xs" />}
        {leftButton.text && <span>{leftButton.text}</span>}
      </button>
    );
  };

  const RightText = () => {
    if (!hasRightText || isBetween) return;
    return <span className="absolute right-0 px-1">{rightText}</span>;
  };

  const RightButton = () => {
    if (!hasRightButton) return;
    return (
      <button type="button" className="button border-l-0 rounded-l-none" onClick={rightButton.onClick}>
        {rightButton.icon && <Icon icon={rightButton.icon} size="xs" />}
        {rightButton.text && <span>{rightButton.text}</span>}
      </button>
    );
  };

  const InvalidMessage = () => {
    if (!edit || !invalid) return;
    return <div className="text-invalid text-sm">invalid field</div>;
  };

  const Text = () => {
    if (edit || isBetween) return;

    let value = getValues([props.name]);
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
        {hasRightText && <span>{rightText}</span>}
      </div>
    );
  };

  return (
    <div className={classNames("space-y-1", SIZES[size], { "[&_.input]:border-invalid": invalid })}>
      <Text />
      <div
        className={classNames("flex w-full", {
          "[&_.input]:rounded-r-none": hasRightButton,
          "[&_.input]:rounded-l-none": hasLeftButton,
          hidden: !isBetween && !edit,
        })}>
        <LeftButton />
        <div className={classNames("w-full relative flex items-center")}>
          <Control />
          <RightText />
        </div>
        <RightButton />
      </div>
      <InvalidMessage />
    </div>
  );
});

const InputText = forwardRef((props, ref) => {
  return <FormattedInput {...props} ref={ref} autoComplete="off" className="input" />;
});

const InputNumber = forwardRef((props, ref) => {
  return <FormattedInput {...props} ref={ref} inputMode="numeric" autoComplete="off" className="input" />;
});

const InputPassword = forwardRef((props, ref) => {
  return <input {...props} ref={ref} type="password" autoComplete="off" className="input" />;
});

const Textarea = forwardRef((props, ref) => {
  return <textarea {...props} ref={ref} className="input overflow-hidden" />;
});

const Select = forwardRef((props, ref) => {
  const { options, ...rest } = props;
  return (
    <div className="relative flex w-full items-center">
      <select {...rest} ref={ref} className="input appearance-none pr-5">
        <Select.Options options={options} />
      </select>
      <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
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
  const { id, options, ...rest } = props;
  return (
    <div id={id} className="flex flex-wrap w-fit">
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
});

const InputDate = (props) => {
  const { name, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);
            return (
              <ReactDatePicker
                {...rest}
                autoComplete="off"
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
          autoComplete="off"
          selected={selected}
          onChange={setSelected}
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
          portalId="root"
        />
      )}
    </div>
  );
};

const InputTime = forwardRef((props, ref) => {
  const { name, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();
  const dateFormat = "HH:mm";

  return (
    <div className="w-full [&>div]:w-full">
      <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);
            return (
              <ReactDatePicker
                {...rest}
                autoComplete="off"
                dateFormat={dateFormat}
                timeIntervals={5}
                showTimeSelect
                showTimeSelectOnly
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
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
      )}
    </div>
  );
});

const InputDateTime = forwardRef((props, ref) => {
  const { edit, name, invalid, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);
            return (
              <ReactDatePicker
                {...rest}
                autoComplete="off"
                timeIntervals={5}
                showTimeSelect
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                dateFormat="MM/dd/yyyy HH:mm"
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
          autoComplete="off"
          selected={selected}
          onChange={setSelected}
          timeIntervals={5}
          showTimeSelect
          dateFormat="MM/dd/yyyy HH:mm"
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      )}
    </div>
  );
});

const InputBetween = forwardRef((props, ref) => {
  const { edit, schema, options, setValue, hasLeftButton, hasRightButton } = props;
  const [begin, end] = Object.entries(schema);

  const Begin = () => {
    const schema = { name: begin[0], ...begin[1] };
    return (
      <div
        className={classNames("[&_.input]:rounded-r-none [&_.button]:rounded-r-none", {
          "[&_.button]:rounded-l-none": hasLeftButton,
          "flex-1": edit,
        })}>
        <FormControl {...schema} />
      </div>
    );
  };

  const End = () => {
    const schema = { name: end[0], ...end[1] };
    return (
      <div
        className={classNames("[&_.input]:rounded-l-none [&_.button]:rounded-l-none", {
          "[&_.button]:rounded-r-none": options || hasRightButton,
          "[&_.input]:rounded-r-none": options,
          "flex-1": edit,
        })}>
        <FormControl {...schema} />
      </div>
    );
  };

  const Buttons = () => {
    if (!options || !edit) return;

    const handleClickButton = (unit, value) => {
      if (!setValue) return;
      const isAdd = value > 0;
      const today = new Date();
      if (isAdd) {
        setValue(begin[0], today);
        setValue(end[0], dayjs(today).add(value, unit).toDate());
      } else {
        setValue(begin[0], dayjs(today).add(value, unit).toDate());
        setValue(end[0], today);
      }
    };

    return (
      <div className="flex">
        {BETWEEN_BUTTON_OPTIONS[options].map(({ label, unit, value }) => {
          return (
            <button
              key={uuid()}
              onClick={() => handleClickButton(unit, value)}
              type="button"
              className={classNames("button bg-header text-sm border-l-0 rounded-none", {
                "last:rounded-r": !hasRightButton,
              })}>
              {label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classNames("w-full flex")}>
      <Begin />
      <div
        className={classNames("flex items-center justify-center w-5", {
          "h-7 bg-header border-y": edit,
        })}>
        -
      </div>
      <End />
      <Buttons />
    </div>
  );
});

const BETWEEN_BUTTON_OPTIONS = {
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
  const { invalid, ...rest } = props;

  return (
    <input
      {...rest}
      ref={ref}
      type="file"
      className="file h-7 border rounded w-full file:h-full file:outline-none file:bg-header file:border-none file:text-text cursor-pointer"
    />
  );
});

const FormControlGroup = ({ children }) => {
  return (
    <div
      className={classNames(
        "overflow-hidden flex border divide-x rounded [&_.input]:border-none [&_.input]:rounded-none [&_.button]:border-none [&_.button]:rounded-none"
      )}>
      {children}
    </div>
  );
};

/**
 * @typedef formattedInputProps
 * @property {string} mask
 * @property {boolean} exact
 * @property {function} onBlur
 * @property {function} onFocus
 * @property {function} onChange
 * @property {function} onValueChange
 * @property {(string|number)} value
 * @property {('upper'|'lower')} letterCase
 * @property {boolean} thousandSeparator
 * @property {number} decimalScale
 */

/**
 * @type FC<formattedInputProps>
 */
export const FormattedInput = forwardRef((props, ref) => {
  const {
    thousandSeparator = false,
    exact = true,
    decimalScale,
    onChange,
    onValueChange,
    letterCase,
    mask,
    ...rest
  } = props;

  const LETTER_SET = ["a", "A", "0", "*"];
  const REG_NUMBER = /^[0-9]+$/;

  const handleChange = (e) => {
    if (letterCase === "lower") e.target.value = e.target.value.toLowerCase();
    if (letterCase === "upper") e.target.value = e.target.value.toUpperCase();

    let values = { value: e.target.value };

    if (thousandSeparator || decimalScale) values = handleNumber(e);
    if (!(thousandSeparator || decimalScale) && mask) values = handleMask(e);

    if (onValueChange) onValueChange(values);
    if (onChange) onChange(e);
  };

  const handleNumber = (e) => {
    if (decimalScale > 0) {
      if (isNaN(Number(e.target.value.replaceAll(",", "")))) e.target.value = e.target.value.replaceAll(/[\D]/g, "");
      const int = e.target.value.split(".")[0];
      const dec = e.target.value.split(".")[1]?.replaceAll(",", "").slice(0, decimalScale);
      e.target.value = int + (dec !== undefined ? "." + dec : "");
    }

    if (thousandSeparator) {
      if (isNaN(Number(e.target.value.replaceAll(",", "")))) e.target.value = e.target.value.replaceAll(/[\D]/g, "");
      const int = e.target.value.split(".")[0];
      const dec = e.target.value.split(".")[1]?.replaceAll(",", "");
      e.target.value = Number(int.replaceAll(",", "")).toLocaleString() + (dec !== undefined ? "." + dec : "");
    }

    return { value: Number(e.target.value.replaceAll(",", "")), formattedValue: e.target.value };
  };

  const handleMask = (e) => {
    const oldValue = e.target.value;
    let maskedValueArray = mask.split("");
    let oldValueArray = oldValue.split("");
    let newValueArray = [];
    let formattedValueArray = [];
    const maxFormattedLength = maskedValueArray.length;
    const maxLength = maskedValueArray.filter((_) => LETTER_SET.includes(_)).length;

    for (let i = 0; i < oldValueArray.length; i++) {
      let skip = 0;
      for (let j = i + skip; !LETTER_SET.includes(maskedValueArray[i + skip]) && i + skip < maxFormattedLength; j++) {
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
    return { value, formattedValue };
  };

  return <input {...rest} ref={ref} onChange={handleChange} />;
});

const Compound = Object.assign({}, FormControl, { Group: FormControlGroup });

export { Compound as FormControl };
