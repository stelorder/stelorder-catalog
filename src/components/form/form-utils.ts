import { css } from "styled-components";
import { ValidatingState } from "./form-types";
import { IntegrationsThemeType } from "../styles/theme";

export function mapState(
  isValid?: boolean,
  isInvalid?: boolean,
): ValidatingState {
  if (isInvalid) return "invalid";
  if (isValid) return "valid";
  return "default";
}

export function createValidatingFormControlCssBlock({
  state,
  theme,
}: {
  state?: ValidatingState;
  theme: IntegrationsThemeType;
}) {
  return state === "default"
    ? css`
        .was-validated &:has(.form-control:invalid) {
          border-color: ${theme.colors.alertError.alertError100};
        }

        .was-validated &:has(.form-control:invalid):hover {
          border-color: #dc323280;
          box-shadow: none;
        }

        .was-validated &:has(.form-control:invalid):focus-within {
          border-color: ${theme.colors.alertError.alertError100};
          box-shadow: 0 0 0 2px ${theme.colors.alertError.alertError10};
        }

        .was-validated &:has(.form-control:valid) {
          border-color: ${theme.colors.alertSuccess.alertSuccess100};
        }

        .was-validated &:has(.form-control:valid):hover {
          border-color: ${theme.colors.alertSuccess.alertSuccess100};
          box-shadow: none;
        }

        .was-validated &:has(.form-control:valid):focus-within {
          border-color: ${theme.colors.alertSuccess.alertSuccess100};
          box-shadow: 0 0 0 2px ${theme.colors.alertSuccess.alertSuccess30};
        }

        .was-validated &:has(.form-control:valid) ~ .feedback-valid {
          display: block !important;
        }

        .was-validated &:has(.form-control:invalid) ~ .feedback-invalid {
          display: block !important;
        }
      `
    : css`
        ${state === "valid" &&
        css`
          & ~ .feedback-valid {
            display: block !important;
          }
        `}

        ${state === "invalid" &&
        css`
          & ~ .feedback-invalid {
            display: block !important;
          }
        `}

  /* Estado INVALID */
  ${state === "invalid" &&
        `
    border-color: ${theme.colors.alertError.alertError100};
    &:hover {
      border-color: #DC323280;
      box-shadow: none;
    }
    &:focus-within {
      border-color: ${theme.colors.alertError.alertError100};
      box-shadow: 0 0 0 2px ${theme.colors.alertError.alertError10};
    }
  `}

  ${state === "valid" &&
        `
    border-color: ${theme.colors.alertSuccess.alertSuccess100};
    &:hover {
      border-color: ${theme.colors.alertSuccess.alertSuccess100};
      box-shadow: none;
    }
    &:focus-within {
      border-color: ${theme.colors.alertSuccess.alertSuccess100};
      box-shadow: 0 0 0 2px ${theme.colors.alertSuccess.alertSuccess30};
    }
  `}
      `;
}
