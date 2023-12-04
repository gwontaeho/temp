import { useState } from "react";
import * as rhf from "react-hook-form";

// required
// min
// max
// minLength
// maxLength
// pattern
// validate

type GroupControlProps = {
  type: string;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  validate?: () => void;
  invalid?: boolean;
  schema?: any;
  edit?: boolean;
};

type FormValuesType = {
  [name: string]: any;
};

type FormSchemaType = {
  id: string;
  schema: FormControlSchemaType;
};

type FormControlSchemaType = {
  [name: string]: GroupControlProps;
};

type UseFormProps = {
  defaultSchema: FormSchemaType;
  values: object;
};

type Entry<T> = [keyof T, T[keyof T]];

type Entries<T> = Entry<T>[];

export const useForm = (props: UseFormProps) => {
  const { defaultSchema, values } = props;

  const {
    control,
    register,
    getValues,
    setValue,
    setFocus,
    handleSubmit,
    trigger,
    reset,
    clearErrors,
    watch,
    formState: { errors, isSubmitted },
  } = rhf.useForm<FormValuesType>({ values });

  const { id, schema } = defaultSchema;
  const [_schema, _setSchema] = useState<FormControlSchemaType>(schema);

  const setSchema = (name: string, value: any) => {
    _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
  };

  const resetSchema = () => {
    _setSchema(schema);
    reset();
  };

  const setEditable = (name: string, value?: boolean) => {
    if (value === undefined)
      return _setSchema((prev) =>
        Object.fromEntries(
          Object.entries(prev).map((_) => {
            return [_[0], { ..._[1], edit: !!name }];
          })
        )
      );

    _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], edit: value } }));
  };

  const validate = (name: string) => {
    if (name in _schema) trigger(name, { shouldFocus: true });
    else trigger();
  };

  const clearValues = () => {
    reset();
  };

  const setValues = (values: object) => {
    reset(values);
  };

  const getSchema = (entries: any): any => {
    return entries.reduce((prev: Entry<FormControlSchemaType>, curr: Entry<FormControlSchemaType>) => {
      const [name, origin] = curr;

      const getCommon = (name: string | number, origin: GroupControlProps) => {
        const { type, pattern, validate, minLength, maxLength, required, ...rest } = origin;
        const common: any = { id: id + "." + name, type, getValues, setValue, ...rest };
        const invalid = errors[name];
        if (invalid) common.invalid = invalid;
        return common;
      };

      const getInputProps = (origin: GroupControlProps) => {
        const inputProps: any = {};
        const { maxLength, required } = origin;
        if (maxLength) inputProps.maxLength = maxLength;
        if (required) inputProps.required = required;
        return inputProps;
      };

      const getRules = (origin: GroupControlProps) => {
        const rules: any = {};
        const { pattern, validate, minLength, maxLength, required } = origin;
        if (maxLength) rules.maxLength = maxLength;
        if (required) rules.required = required;
        if (minLength) rules.minLength = minLength;
        if (pattern) rules.pattern = pattern;
        if (validate) rules.validate = validate;
        // rules.onChange = () => {
        //   if (getFieldState(name).invalid) trigger(name);
        // };
        return rules;
      };

      const getRegister = (name: any, origin: GroupControlProps) => {
        return register(name, { ...getRules(origin) });
      };

      const getControl = (name: string | number, origin: GroupControlProps) => {
        return { name, control, rules: getRules(origin) };
      };

      let obj;
      switch (origin.type) {
        case "date":
        case "time":
        case "datetime":
          obj = Object.assign(getCommon(name, origin), getControl(name, origin), getInputProps(origin));
          break;
        // case "between":
        //   obj = Object.assign(getCommon(name, origin), { schema: getSchema(Object.entries(origin.schema)), setValue });
        //   break;
        case "daterange":
          obj = Object.assign(getCommon(name, origin), {
            // schema: getSchema(
            //   Object.entries(origin.schema).map((_) => {
            //     const withEdit: any = _[1];
            //     withEdit.edit = origin.edit === false ? false : true;
            //     return [_[0], withEdit];
            //   })
            // ),
          });
          break;
        default:
          obj = Object.assign(getCommon(name, origin), getRegister(name, origin), getInputProps(origin));
      }
      return { ...prev, [name]: obj };
    }, {});
  };

  return {
    schema: getSchema(Object.entries(_schema)),
    setSchema,
    resetSchema,
    setEditable,
    getValues,
    setValue,
    setFocus,
    control,
    register,
    handleSubmit,
    validate,
    errors,
    clearValues,
    clearErrors,
    watch,
    isSubmitted,
    setValues,
  };
};
