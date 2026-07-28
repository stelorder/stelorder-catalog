import React from "react";
import { StyledImage } from "./image.style";
import type { SizePx } from "../icon/icon.style";

export interface ImageProps {
  fluid?: boolean;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
  src: string;
  width?: SizePx;
  height?: SizePx;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const Image: React.FC<
  ImageProps & React.ImgHTMLAttributes<HTMLImageElement>
> = ({
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  src,
  width,
  height,
  onClick,
  ...rest
}) => {
  return (
    <StyledImage
      $fluid={fluid}
      $rounded={rounded}
      $roundedCircle={roundedCircle}
      $thumbnail={thumbnail}
      $width={width}
      $height={height}
      src={src}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Image;
