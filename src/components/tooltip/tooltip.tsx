import React, { PropsWithChildren, ReactElement, useId, useRef } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledTooltipContainer, StyledTooltipMessage } from "./tooltip.style";
import { createPortal } from "react-dom";

export type TooltipAlignMessage = "left" | "middle" | "right";

export type TooltipProps = {
  onHoverDisplay?: boolean;
  alignMessage?: TooltipAlignMessage;
  message: ReactElement | string;
  showIn?: HTMLDivElement | null;
};

const Tooltip: React.FC<
  PropsWithChildren<
    TooltipProps &
      HtmlProps<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  >
> = ({
  children,
  alignMessage = "middle",
  onHoverDisplay = true,
  message,
  ref,
  htmlProps,
  showIn,
}) => {
  const idx = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <StyledTooltipContainer
      id={idx}
      $styled={{ onHoverDisplay, alignMessage, isFloat: !!showIn, showIn }}
      {...htmlProps}
      tooltipRef={tooltipRef}
      ref={ref}
    >
      {children}
      {showIn ? (
        createPortal(
          <StyledTooltipMessage
            ref={tooltipRef}
            $styled={{ alignMessage, notFloat: false }}
          >
            {message}
          </StyledTooltipMessage>,
          showIn,
        )
      ) : (
        <StyledTooltipMessage
          ref={tooltipRef}
          $styled={{ alignMessage, notFloat: true }}
        >
          {message}
        </StyledTooltipMessage>
      )}
    </StyledTooltipContainer>
  );
};

export default Tooltip;
