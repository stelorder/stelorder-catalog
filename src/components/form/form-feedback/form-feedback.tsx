import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledFeedback } from "./form-feedback.style";

export type FormFeedbackProps = {
  name?: string;
  type?: "invalid" | "valid" | undefined;
};

const FormFeedback: React.FC<
  PropsWithChildren<FormFeedbackProps & HtmlProps<HTMLElement>>
> = ({ type = "invalid", children, htmlProps }) => {
  return (
    <StyledFeedback
      className={`feedback-${type}`}
      as="small"
      $styled={{ type }}
      {...htmlProps}
    >
      {children}
    </StyledFeedback>
  );
};

export default FormFeedback;
