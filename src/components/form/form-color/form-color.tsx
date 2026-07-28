import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { HtmlProps } from "../../styles/theme";
import { useFormGroupContext } from "../context/form-group-context";
import { CommonProps } from "../form-types";
import { mapState } from "../form-utils";

import {
  StyledColorSwatch,
  StyledDotInput,
  StyledDotLabel,
  StyledHiddenInput,
  StyledInputContainer,
  StyledTextInput,
} from "./form-color.style";

import { Icon } from "../../icon";

export type FormColorVariant = "dot" | "input";

export type FormColorProps = {
  /*
   *
   * Variantes:
   * - dot: círculo pequeño con selector de color.
   * - input: selector + input hexadecimal.
   */
  variant?: FormColorVariant;
  value?: string;
  dotSize?: number;
  borderRadius?: string;
  ariaLabel?: string;
} & CommonProps &
  HtmlProps<HTMLInputElement>;

const DEFAULT_COLOR = "#000000";

const isHexColor = (value: string) =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

const FormColor: React.FC<FormColorProps> = ({
  variant = "input",
  value,
  dotSize = 24,
  borderRadius = "50%",
  ariaLabel,
  isValid,
  isInvalid,
  htmlProps,
}) => {
  const theme = useTheme();
  const { controlId } = useFormGroupContext();

  const resolvedId = htmlProps?.id ?? controlId;

  const [inputValue, setInputValue] = useState(value ?? DEFAULT_COLOR);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const validColor = isHexColor(inputValue);

  const resolvedIsValid = isValid ?? validColor;
  const resolvedIsInvalid = isInvalid ?? !validColor;

  const state = mapState(resolvedIsValid, resolvedIsInvalid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    htmlProps?.onChange?.(e);
  };

  if (variant === "dot") {
    return (
      <StyledDotLabel $styled={{ dotSize, borderRadius }} htmlFor={resolvedId}>
        <StyledDotInput
          {...htmlProps}
          id={resolvedId}
          type="color"
          value={inputValue}
          onChange={handleChange}
          aria-label={ariaLabel}
          className="form-control"
        />
      </StyledDotLabel>
    );
  }

  return (
    <StyledInputContainer $styled={{ state }} className="form-control">
      <StyledColorSwatch
        $styled={{ dotSize, borderRadius }}
        htmlFor={resolvedId ? `${resolvedId}-color-picker` : undefined}
      >
        <StyledHiddenInput
          type="color"
          id={resolvedId ? `${resolvedId}-color-picker` : undefined}
          value={validColor ? inputValue : DEFAULT_COLOR}
          onChange={handleChange}
          disabled={htmlProps?.disabled}
          tabIndex={-1}
          aria-label={ariaLabel ? `${ariaLabel} picker` : "Elegir color"}
        />
      </StyledColorSwatch>

      <StyledTextInput
        {...htmlProps}
        id={resolvedId}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="#000000"
        aria-label={ariaLabel}
        disabled={htmlProps?.disabled}
      />

      {resolvedIsValid && (
        <Icon
          variant="check"
          color={theme.colors.alertSuccess.alertSuccess100}
          width="18px"
          height="18px"
        />
      )}

      {resolvedIsInvalid && (
        <Icon
          variant="markPadding"
          color={theme.colors.alertError.alertError100}
          width="18px"
          height="18px"
        />
      )}
    </StyledInputContainer>
  );
};

export default FormColor;
