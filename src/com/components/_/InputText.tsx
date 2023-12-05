import React from "react";
import { FormattedInput, FormattedInputProps } from "@/com/components/_";

export const InputText = React.forwardRef<HTMLInputElement, FormattedInputProps>(
  (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <FormattedInput {...props} ref={ref} autoComplete="off" className="input" />;
  }
);
