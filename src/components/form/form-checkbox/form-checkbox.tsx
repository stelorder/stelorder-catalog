import React, { PropsWithChildren } from "react";
import { AlignLabel, CommonProps } from "../form-types";
import { HtmlProps } from "../../styles/theme";
import { StyledFormCheckbox } from "./form-checkbox.style";
import { mapState } from "../form-utils";

export type FormCheckboxProps = PropsWithChildren<
  {
    label?: string;
    id: string;
    type?: "checkbox" | "radio" | "switch";
    labelPosition?: AlignLabel;
    labelGap?: number;
  } & CommonProps &
    HtmlProps<HTMLInputElement>
>;

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  type = "checkbox",
  id,
  isInvalid,
  isValid,
  labelPosition = "left",
  labelGap = 8,
  ...props
}: FormCheckboxProps) => {
  const state = mapState(isValid, isInvalid);
  return (
    <div style={{ display: "inline-flex", gap: labelGap }}>
      {type !== "switch" && (
        <label
          style={{
            ...props?.htmlProps?.style,
            verticalAlign: "middle",
            order: labelPosition === "left" ? 0 : 1,
          }}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <StyledFormCheckbox
        $styled={{ type, state, label, labelPosition, labelGap }}
        type={type !== "radio" ? "checkbox" : "radio"}
        {...props?.htmlProps}
        {...{ id }}
      />
    </div>
  );
};

export default FormCheckbox;
