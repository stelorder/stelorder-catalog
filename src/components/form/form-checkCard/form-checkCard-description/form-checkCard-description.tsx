import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledFormCheckCardDescription } from "./form-checkCard-description.style";

export type FormCheckCardDescriptionProps = PropsWithChildren<
  HtmlProps<HTMLSpanElement>
>;

const FormCheckCardDescription: React.FC<FormCheckCardDescriptionProps> = ({
  children,
  htmlProps,
}) => (
  <StyledFormCheckCardDescription {...htmlProps}>
    {children}
  </StyledFormCheckCardDescription>
);

export default FormCheckCardDescription;
