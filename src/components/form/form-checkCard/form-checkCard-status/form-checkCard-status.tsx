import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledFormCheckCardStatus } from "./form-checkCard-status.style";

export type FormCheckCardStatusProps = PropsWithChildren<
  HtmlProps<HTMLSpanElement>
>;

const FormCheckCardStatus: React.FC<FormCheckCardStatusProps> = ({
  children,
  htmlProps,
}) => (
  <StyledFormCheckCardStatus {...htmlProps} data-checkcard-status>
    {children}
  </StyledFormCheckCardStatus>
);

export default FormCheckCardStatus;
