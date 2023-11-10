import { useForm as _useForm } from "react-hook-form";

//required
//min
//max
//minLength
//maxLength
//pattern
//validate

/**
 * @param {Object} props
 * @param {Object} props.defaultSchema
 * @returns
 */
export const useForm = (props) => {
  const {
    register,
    getValues,
    control,
    setValue,
    setFocus,
    handleSubmit,
    trigger,
    formState: { errors },
  } = _useForm();

  const { defaultSchema } = props || {};
  const { __form__, ..._defaultSchema } = defaultSchema || {};
  const schemaEntries = Object.entries(_defaultSchema);

  const handleValidate = () => {
    // handleSubmit()
  };

  const getSchema = (entries) => {
    return entries.reduce((prev, curr) => {
      const [name, origin] = curr;

      const getCommon = (name, origin) => {
        const { type, pattern, validate, minLength, maxLength, required, ...rest } = origin;
        const id = __form__ + "." + name;

        const common = { id, type, ...rest };
        const invalid = errors[name];

        if (invalid) common.invalid = invalid;

        return common;
      };

      const getInputProps = (origin) => {
        const inputProps = {};
        const { maxLength, required } = origin;
        if (maxLength) inputProps.maxLength = maxLength;
        if (required) inputProps.required = required;
        return inputProps;
      };

      const getRules = (origin) => {
        const rules = {};
        const { pattern, validate, minLength, maxLength, required } = origin;
        if (maxLength) rules.maxLength = maxLength;
        if (required) rules.required = required;
        if (minLength) rules.minLength = minLength;
        if (pattern) rules.pattern = pattern;
        if (validate) rules.validate = validate;
        return rules;
      };

      const getRegister = (name, origin) => {
        return register(name, getRules(origin));
      };

      const getControl = (name, origin) => {
        return { name, control, rules: getRules(origin) };
      };

      let obj;
      switch (origin.type) {
        case "date":
        case "time":
        case "datetime":
          obj = Object.assign(getCommon(name, origin), getControl(name, origin), getInputProps(origin));
          break;
        case "between":
          obj = Object.assign(getCommon(name, origin), { schema: getSchema(Object.entries(origin.schema)), setValue });
          break;
        default:
          obj = Object.assign(getCommon(name, origin), getRegister(name, origin), getInputProps(origin));
      }
      return { ...prev, [name]: obj };
    }, {});
  };

  const schema = getSchema(schemaEntries);

  return { schema, getValues, setValue, setFocus, control, register, handleSubmit, trigger, errors };
};
