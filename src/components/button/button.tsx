import { PropsWithChildren } from "react";
import { StyledButton } from "./button.style";
import { HtmlProps } from "../styles/theme";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "gray"
  | "white"
  | "whiteOutlineFree"
  | "grayOutlineFree"
  | "lite"
  | "disabled";

export type ButtonSize = "xl" | "m" | "l";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  children,
  htmlProps,
  ...props
}: ButtonProps & PropsWithChildren<HtmlProps<HTMLButtonElement>>) {
  const { type, ...rest } = htmlProps || {};
  return (
    <StyledButton
      type={type as "button" | "submit" | "reset" | undefined}
      disabled={props.variant === "disabled"}
      $styled={{
        variant: props.variant ?? "primary",
        size: props.size ?? "m",
      }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
