import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  StyledControl,
  StyledControlFlex,
  StyledIcon,
} from "./form-control.style";
import { CommonProps } from "../form-types";
import Icon from "../../icon/icon";
import { useTheme } from "styled-components";
import { useFormGroupContext } from "../context/form-group-context";
import { HtmlProps } from "../../styles/theme";
import EyeOpen from "../../assets/icons/eyeOpen.svg?react";
import EyeClose from "../../assets/icons/eyeClose.svg?react";
import { mapState } from "../form-utils";

const defaultTypeIcons: Record<string, React.ReactNode> = {
  email: null,
  password: null,
  text: null,
};

const defaultShowValidStateByType: Record<string, boolean> = {
  email: true,
  password: true,
  phone: true,
  text: false,
};

const defaultShowInvalidStateByType: Record<string, boolean> = {
  email: true,
  password: false,
  phone: false,
  text: false,
};

export type FormControlProps = PropsWithChildren<
  CommonProps & HtmlProps<HTMLInputElement | HTMLTextAreaElement>
> &
  ({ as?: "input" } | { as?: "textarea" });

const FormControl: React.FC<FormControlProps> = (props) => {
  const {
    isInvalid,
    isValid,
    htmlProps,
    as = "input",
  } = props as FormControlProps;

  const { controlId } = useFormGroupContext();
  const theme = useTheme();

  const baseType = htmlProps?.type ?? "text";
  const passwordToggleEnabled = as === "input" && baseType === "password";
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Prefetch de los iconos del ojo para evitar el vacío al alternar

  const inputType = passwordToggleEnabled
    ? showPassword
      ? "text"
      : "password"
    : baseType;

  const state = mapState(isValid, isInvalid);

  // Iconos por estado
  const defaultValidIcon = (
    <Icon
      variant="check"
      color={theme.colors.alertSuccess.alertSuccess100}
      width="18px"
      height="18px"
    />
  );
  const defaultInvalidIcon = (
    <Icon
      variant="mark"
      color={theme.colors.alertError.alertError100}
      width="18px"
      height="18px"
    />
  );

  const typeIcon = useMemo(() => {
    if (passwordToggleEnabled) {
      return showPassword ? (
        <EyeOpen width="18px" height="18px" />
      ) : (
        <EyeClose width="18px" height="18px" />
      );
    }
    return defaultTypeIcons[baseType] ?? null;
  }, [passwordToggleEnabled, showPassword, baseType]);

  const allowValidStateIconForType =
    defaultShowValidStateByType[baseType] ?? true;
  const allowInvalidStateIconForType =
    defaultShowInvalidStateByType[baseType] ?? true;
  const resolvedId = htmlProps?.id ?? controlId ?? undefined;

  const inputProps:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    ...(htmlProps || {}),
    id: resolvedId,
    type: inputType,
    placeholder: htmlProps?.placeholder,
    "aria-invalid": state === "invalid",
  };

  const togglePassword = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (passwordToggleEnabled) setShowPassword((v) => !v);
    },
    [passwordToggleEnabled],
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        togglePassword(e);
      }
    },
    [togglePassword],
  );

  return (
    <StyledControlFlex $styled={{ state }}>
      <StyledControl
        className="form-control"
        ref={inputRef}
        as={as}
        {...inputProps}
      />

      {/* Iconos de estado (validación) */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledIcon
          $styled={{
            state: "valid",
            visible:
              state === "valid" && allowValidStateIconForType ? true : false,
            formValidable:
              allowValidStateIconForType &&
              !(state === "invalid" || state === "valid"),
          }}
          style={{ marginRight: passwordToggleEnabled ? "8px" : "0" }}
        >
          {defaultValidIcon}
        </StyledIcon>
        <StyledIcon
          $styled={{
            state: "invalid",
            visible:
              state === "invalid" && allowInvalidStateIconForType
                ? true
                : false,
            formValidable:
              allowInvalidStateIconForType &&
              !(state === "invalid" || state === "valid"),
          }}
          style={{ marginRight: passwordToggleEnabled ? "8px" : "0" }}
        >
          {defaultInvalidIcon}
        </StyledIcon>

        {/* Icono de toggle de contraseña */}
        {typeIcon && (
          <StyledIcon
            $styled={{ state: undefined }}
            data-clickable={passwordToggleEnabled ? "true" : undefined}
            role={passwordToggleEnabled ? "button" : undefined}
            aria-label={
              passwordToggleEnabled
                ? showPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
                : undefined
            }
            tabIndex={passwordToggleEnabled ? 0 : -1}
            onClick={passwordToggleEnabled ? togglePassword : undefined}
            onKeyDown={passwordToggleEnabled ? handleKey : undefined}
          >
            {typeIcon}
          </StyledIcon>
        )}
      </div>
    </StyledControlFlex>
  );
};

export default FormControl;
