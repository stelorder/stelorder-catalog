import React from "react";
import Icon from "../../icon/icon";
import type { SizePx } from "../../icon/icon.style";
import { StyledPlayButton } from "./videoPreviewIcon.style";
import { IconVariant } from "../../icon/icon-constants";

export type VideoPreviewIconProps = {
  variant: IconVariant;
  size?: SizePx;
  color?: string;
  bg?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function VideoPreviewIcon({
  variant,
  size = "40px",
  color = "#FFF",
  className,
  onClick,
  ...rest
}: VideoPreviewIconProps) {
  return (
    <StyledPlayButton
      className={className}
      onClick={onClick}
      type="button"
      aria-label="Play video"
      {...rest}
    >
      <Icon variant={variant} width={size} height={size} color={color} />
    </StyledPlayButton>
  );
}
