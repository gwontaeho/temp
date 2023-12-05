import { useState } from "react";
import * as rhf from "react-hook-form";
import { GroupControlProps } from "@/com/components";

// required
// min
// max
// minLength
// maxLength
// pattern
// validate

// type GroupControlProps = {
//   type: string;
//   name: string;
//   min?: string | number;
//   max?: string | number;
//   maxLength?: number;
//   minLength?: number;
//   pattern?: string;
//   required?: boolean;
//   disabled?: boolean;
//   validate?: () => void;
//   invalid?: boolean;
//   schema?: any;
//   edit?: boolean;
// };

type FormValuesType = {
  [name: string]: any;
};

type FormControlSchemaType = {
  [name: string]: GroupControlProps;
};

export type FormSchemaType = {
  id: string;
  schema: FormControlSchemaType;
};

type UseFormProps = {
  defaultSchema: FormSchemaType;
  values?: object;
};

export const useForm = <T extends UseFormProps>(props: T) => {
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

  const getSchema = (s: any): any => {
    if (!s) return undefined;
    return Object.fromEntries(
      Object.entries(s).map(([key, value]: any) => {
        const { edit = true, schema, ...rest } = value;
        return [
          key,
          {
            ...rest,
            name: key,
            control,
            setValue,
            getValues,
            edit: Boolean(edit),
            schema: getSchema(schema),
            invalid: errors[key],
          },
        ];
      })
    );
  };

  return {
    schema: getSchema(_schema),
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
