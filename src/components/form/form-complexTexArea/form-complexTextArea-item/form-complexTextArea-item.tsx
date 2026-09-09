import React, { type PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledFormComplexTextAreaItem } from "./form-complexTextArea-item.style";

export type FormComplexTextAreaItemPosition =
  | "top"
  | "bottom"
  | "left"
  | "right";

export type FormComplexTextAreaItemProps = PropsWithChildren<
  HtmlProps<HTMLDivElement> & {
    position: FormComplexTextAreaItemPosition;
  }
>;

const FormComplexTextAreaItem: React.FC<FormComplexTextAreaItemProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledFormComplexTextAreaItem {...props}>
      {children}
    </StyledFormComplexTextAreaItem>
  );
};

export default FormComplexTextAreaItem;
