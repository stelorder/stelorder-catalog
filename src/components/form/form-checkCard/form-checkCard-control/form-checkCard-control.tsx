import React from "react";
import { HtmlProps } from "../../../styles/theme";
import { FormCheckCardVariant } from "../form-checkCard.style";
import { StyledFormCheckCardControl } from "./form-checkCard-control.style";

export type FormCheckCardControlProps = {
  variant: FormCheckCardVariant;
  disabled?: boolean;
} & HtmlProps<HTMLInputElement>;

const FormCheckCardControl: React.FC<FormCheckCardControlProps> = ({
  variant,
  disabled,
  htmlProps,
}) => {
  const type = variant === "radio" ? "radio" : "checkbox";
  return (
    <StyledFormCheckCardControl
      {...htmlProps}
      type={type}
      disabled={disabled || htmlProps?.disabled}
      $styled={{ variant }}
    />
  );
};

export default FormCheckCardControl;
