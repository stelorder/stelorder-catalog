import { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledAvatar } from "./avatar.style";
import Image from "../image/image";
import Icon from "../icon/icon";
import type { SizePx } from "../icon/icon.style";

export interface AvatarProps {
  size?: SizePx;
  src?: string | null;
  alt?: string;
  color?: string;
}

function Avatar({
  size = "40px",
  src,
  alt = "",
  color,
  children,
  htmlProps,
}: AvatarProps & PropsWithChildren<HtmlProps<HTMLDivElement>>) {
  return (
    <StyledAvatar $styled={{ size, color }} {...htmlProps}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          roundedCircle
          style={{ objectFit: "cover" }}
        />
      ) : (
        (children ?? (
          <Icon variant="user" width="60%" height="60%" color="white" />
        ))
      )}
    </StyledAvatar>
  );
}

export default Avatar;
