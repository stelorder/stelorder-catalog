import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledFormGroup } from "./form-group.style";
import { FormGroupProvider } from "../context/form-group-context";

export type FormGroupProps = {
  controlId?: string;
};

const FormGroup: React.FC<
  PropsWithChildren<FormGroupProps & HtmlProps<HTMLDivElement>>
> = ({ children, controlId, htmlProps }) => {
  return (
    <FormGroupProvider controlId={controlId}>
      <StyledFormGroup {...htmlProps}>{children}</StyledFormGroup>
    </FormGroupProvider>
  );
};

export default FormGroup;
