import { useForm as _useForm, useFieldArray } from "react-hook-form";

//required
//min
//max
//minLength
//maxLength
//pattern
//validate

/**
 *
 *
 *
 * @param {Object} props
 * @param {Object} props.defaultSchema
 * @returns
 */

export const useForm = (props) => {
  const { defaultSchema } = props || {};
  const { __form__, ..._defaultSchema } = defaultSchema || {};

  const schemaEntries = Object.entries(_defaultSchema);

  const { register, getValues, control, setValue, setFocus } = _useForm();

  const schema = schemaEntries.reduce((prev, curr) => {
    const [name, origin] = curr;
    const { type, pattern, validate, minLength, maxLength, required, ...rest } = origin;
    const id = __form__ + "." + name;
    let commonValue = { id, type, ...rest };

    const inputProps = {};
    const rules = {};
    if (pattern) rules.pattern = pattern;
    if (validate) rules.validate = validate;
    if (minLength) rules.minLength = minLength;
    if (maxLength) {
      inputProps.maxLength = maxLength;
      rules.maxLength = maxLength;
    }
    if (required) {
      inputProps.required = required;
      rules.required = required;
    }

    const returnSch = () => {
      switch (type) {
        case "date":
        case "time":
        case "datetime":
          return Object.assign(commonValue, { name, control, rules });
        default:
          return Object.assign(commonValue, register(name, rules));
      }
    };

    const sch = returnSch();

    return { ...prev, [name]: { ...sch, ...inputProps } };
  }, {});

  return { schema, getValues, setValue, setFocus };
};
