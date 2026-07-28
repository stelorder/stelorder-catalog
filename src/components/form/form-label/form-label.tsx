import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledLabel } from "./form-label.style";
import { useFormGroupContext } from "../context/form-group-context";

export type FormLabelProps = {
  htmlFor?: string;
};

const FormLabel: React.FC<
  PropsWithChildren<FormLabelProps & HtmlProps<HTMLLabelElement>>
> = ({ children, htmlFor, htmlProps }) => {
  const { controlId } = useFormGroupContext();
  return (
    <StyledLabel htmlFor={htmlFor ?? controlId} {...htmlProps}>
      {children}
    </StyledLabel>
  );
};

export default FormLabel;
