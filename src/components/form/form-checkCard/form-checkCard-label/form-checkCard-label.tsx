import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledFormCheckCardLabel } from "./form-checkCard-label.style";

export type FormCheckCardLabelProps = PropsWithChildren<
  HtmlProps<HTMLSpanElement>
>;

const FormCheckCardLabel: React.FC<FormCheckCardLabelProps> = ({
  children,
  htmlProps,
}) => (
  <StyledFormCheckCardLabel {...htmlProps} data-checkcard-label>
    {children}
  </StyledFormCheckCardLabel>
);

export default FormCheckCardLabel;
