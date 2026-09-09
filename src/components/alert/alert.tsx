import { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledAlert, StyledCloseButton } from "./alert.style";
import Icon from "../icon/icon";

export type AlertVariant = "error" | "warning" | undefined;

export type AlertProps = {
  variant?: AlertVariant;
  showCloseButton?: boolean;
  showIcon?: boolean;
  onClose?: () => void;
  closeAriaLabel?: string;
};

function Alert({
  variant,
  showCloseButton = true,
  showIcon = true,
  onClose,
  closeAriaLabel = "Cerrar",
  children,
  htmlProps,
}: AlertProps & PropsWithChildren<HtmlProps<HTMLDivElement>>) {
  return (
    <StyledAlert $styled={{ variant }} {...htmlProps}>
      {showIcon && variant !== undefined && (
        <Icon
          variant={variant === "error" ? "alert-triangle" : "alert-circle"}
          width="16px"
          height="16px"
          color="inherit"
          htmlProps={{
            style: {
              paddingRight: "10px",
            },
          }}
        />
      )}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </div>
      {showCloseButton && (
        <StyledCloseButton
          type="button"
          onClick={onClose}
          aria-label={closeAriaLabel}
        >
          <Icon variant="close" width="16px" height="16px" />
        </StyledCloseButton>
      )}
    </StyledAlert>
  );
}

export default Alert;
