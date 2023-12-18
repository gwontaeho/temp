import { useState, useRef, useEffect, memo, forwardRef } from "react";

export const useInit = ({ defaultSchema = {} }) => {
  const { __form__ } = defaultSchema;
  const [_schema, _setSchema] = useState(defaultSchema);
  const [errors, setErrors] = useState({});

  const [schema, validates] = Object.entries(_schema).reduce(
    (prev, [key, { validate, maxLength, minLength, required, func, ...value }]) => {
      const hasVal = Boolean(validate || maxLength || minLength || required || func);
      let valItems = {};
      if (required) valItems.required = required;
      if (validate) valItems.validate = validate;
      if (maxLength) valItems.maxLength = maxLength;
      if (minLength) valItems.minLength = minLength;
      if (func) valItems.func = func;

      const sch = { ...prev[0], [key]: { ...value, maxLength, name: __form__ + "." + key } };
      const val = { ...prev[1], ...(hasVal && { [key]: valItems }) };
      return [sch, val];
    },
    []
  );

  const getFormValue = (name) => {
    if (!name)
      return Object.keys(schema).reduce((prev, curr) => {
        if (curr == "__form__") return;
        const isCheckbox = schema[curr].type === "checkbox";

        const value = isCheckbox
          ? Array.from(document.getElementsByName(schema[curr].name))
              .filter((node) => node.checked)
              .map((node) => node.value)
          : document.getElementsByName(schema[curr].name)[0]?.value;
        return { ...prev, [curr]: value };
      }, {});

    const isCheckbox = schema[name].type === "checkbox";

    if (isCheckbox)
      return Array.from(document.getElementsByName(schema[name].name))
        .filter((node) => node.checked)
        .map((node) => node.value);

    return document.getElementsByName(schema[name].name)[0].value;
  };

  const setFormValue = (name, value) => {
    const nodes = document.getElementsByName(schema[name].name);

    if (nodes.length > 1) {
      return Array.from(nodes).forEach((node) => {
        const isCheckbox = schema[name].type === "checkbox";
        if (!isCheckbox) return;
        value.includes(node.value) ? (node.checked = true) : (node.checked = false);
      });
    }

    const input = nodes[0];
    if (input) input.value = value;
  };

  const setSchema = (name, schema) => {
    _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...schema } }));
  };

  const setFocus = (name) => {
    const input = document.getElementsByName(schema[name].name)[0];
    if (input) input.focus();
  };

  const handleValidate = () => {
    const formValues = getFormValue();
    let errors = {};

    Object.entries(validates).forEach(([name, { required, validate, maxLength, minLength, func }]) => {
      const value = formValues[name];

      if (
        required &&
        (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length))
      ) {
        errors[name] = { type: "required" };
        return;
      }

      if (validate) {
        const error = { type: "validate", message: validate[1] };
        if (validate[0] instanceof RegExp) {
          if (!validate[0].test(value)) {
            errors[name] = error;
            return;
          }
        }
        if (validate[0] instanceof Function) {
          if (!validate[0](value)) {
            errors[name] = error;
            return;
          }
        }
      }

      if (maxLength && value.length > maxLength) {
        errors[name] = { type: "maxLength" };
        return;
      }

      if (minLength && value.length < minLength) {
        errors[name] = { type: "minLength" };
        return;
      }

      if (func) {
        func.map((item) => {
          if (!item(value)) errors[name] = { type: "func" };
        });
        return;
      }
    });

    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleSubmit = (onSubmit) => {
    if (!onSubmit) return handleValidate();
    return (e) => {
      e.preventDefault();
      if (!handleValidate()) return;
      onSubmit(getFormValue());
    };
  };

  return { schema, setSchema, getFormValue, setFormValue, setFocus, errors, handleSubmit };
};

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: {
    type: "text",
    validate: [/^[A-Z0-9]{5}$/, "error !!"],
    maxLength: 5,
    label: "Date 필드",
  },
  number_1: { type: "number", validate: [/^[A-Z0-9]{5}$/, "erro222r !!"] },
  password_1: { type: "password", validate: [/^[A-Z0-9]{5}$/, "erro222r !!"] },
  checkbox_1: { type: "checkbox" },
  radio_1: { type: "radio" },
  select_1: { type: "select" },
  hidden_1: { type: "hidden" },
  textarea_1: { type: "textarea" },
  date_1: { type: "date", label: "Date 필드" },
  time_1: { type: "time" },
  datetime_1: { type: "datetime" },
  datebetween_1: { type: "datebetween" },
};

const SCHEMA_SEARCH2 = {
  __form__: "search2",
  text_1: {
    type: "text",
    validate: [/^[A-Z0-9]{5}$/, "error !!"],
    maxLength: 5,
    label: "Date 필드",
  },
  number_1: { type: "number", validate: [/^[A-Z0-9]{5}$/, "erro222r !!"] },
  password_1: { type: "password", validate: [/^[A-Z0-9]{5}$/, "erro222r !!"] },
  checkbox_1: { type: "checkbox" },
  radio_1: { type: "radio" },
  select_1: { type: "select" },
};

export const FormsExample = () => {
  const a = useInit({});

  const [state, setState] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const SCHEMAS = [SCHEMA_SEARCH, SCHEMA_SEARCH2];

  console.log(a);

  return <Form />;
};

const Input = forwardRef((props, ref) => {
  const { invalid, message, ...rest } = props;

  return (
    <div className="text-sm font-mono">
      <input
        ref={ref}
        {...rest}
        aria-invalid={!!invalid}
        className="border outline-none p-2 rounded aria-[invalid=true]:border-red-600"
      />
      {invalid ? (
        <div className="text-red-600 p-1">{invalid.message}</div>
      ) : (
        message && <div className="p-1">{message}</div>
      )}
    </div>
  );
});
