/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import { StyledVideoWrapper } from "./videoPreview.style";
import Image from "../image/image";
import VideoPreviewIcon, {
  VideoPreviewIconProps,
} from "./videoPreviewIcon/videoPreviewIcon";
import type { SizePx } from "../icon/icon.style";

export interface VideoProps {
  src: string;
  previewSrc?: string;
  fluid?: boolean;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
  width?: SizePx;
  height?: SizePx;
}

// Declaramos el tipo compuesto: componente + propiedad estática
export type VideoPreviewCompound = React.FC<
  VideoProps &
    React.ImgHTMLAttributes<HTMLImageElement> & {
      children?: React.ReactNode;
    }
> & {
  Icon: typeof VideoPreviewIcon;
};

function VideoPreviewBase({
  src,
  previewSrc,
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  width,
  height,
  children,
  ...rest
}: VideoProps &
  React.ImgHTMLAttributes<HTMLImageElement> & {
    children?: React.ReactNode;
  }) {
  const ytId = useMemo(() => {
    const m = src.match(
      /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return m ? m[1] : null;
  }, [src]);

  const defaultPreview = previewSrc
    ? previewSrc.trim()
    : ytId
      ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`
      : undefined;

  const openVideo = useCallback(() => {
    if (!src) return;
    window.open(src, "_blank", "noopener,noreferrer");
  }, [src]);

  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const element = child as React.ReactElement<
        Partial<VideoPreviewIconProps>
      > & { type: any };

      if (element.type === VideoPreviewIcon && !element.props?.onClick) {
        return React.cloneElement(element, { onClick: openVideo });
      }

      return element;
    });
  }, [children, openVideo]);

  return (
    <StyledVideoWrapper
      $fluid={fluid}
      $rounded={rounded}
      $roundedCircle={roundedCircle}
      $thumbnail={thumbnail}
      $width={width}
      $height={height}
    >
      {defaultPreview ? (
        <Image
          src={defaultPreview}
          alt="video preview"
          style={{
            cursor: "pointer",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          onClick={openVideo}
          {...rest}
        />
      ) : (
        <div
          onClick={openVideo}
          role="button"
          aria-label="Open video"
          style={{
            width: width ?? "100%",
            height: height ?? undefined,
            paddingBottom: !height ? "56.25%" : undefined,
            background: "#000",
            cursor: "pointer",
          }}
        />
      )}
      {enhancedChildren}
    </StyledVideoWrapper>
  );
}

const VideoPreview = VideoPreviewBase as VideoPreviewCompound;
VideoPreview.Icon = VideoPreviewIcon;

export default VideoPreview;
