import styled, { css } from "styled-components";
import { TooltipAlignMessage } from "./tooltip";
import { StyledProp } from "../styles/theme";
import React, { HTMLAttributes, PropsWithChildren } from "react";

function getRelativePosition({
  childElement,
  ancestorElement,
}: {
  childElement: HTMLElement;
  ancestorElement: HTMLElement;
}) {
  const childRect = childElement.getBoundingClientRect();
  const ancestorRect = ancestorElement.getBoundingClientRect();

  const x = childRect.left - ancestorRect.left;
  const y = childRect.top - ancestorRect.top;

  return { x, y, width: childRect.width, height: childRect.height };
}

export const StyledTooltipContainer: React.FC<
  PropsWithChildren<
    React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
      StyledProp<{
        onHoverDisplay: boolean;
        alignMessage: TooltipAlignMessage;
        isFloat: boolean;
        showIn?: HTMLDivElement | null;
      }>
  > & { tooltipRef: React.RefObject<HTMLDivElement | null> }
> = ({ children, id, tooltipRef, $styled, ...rest }) => {
  return (
    <TooltipContainer
      id={id}
      // eslint-disable-next-line react-hooks/immutability
      onMouseEnter={(e) => {
        if (!tooltipRef.current || !$styled.onHoverDisplay) return;
        // eslint-disable-next-line react-hooks/immutability
        if ($styled.showIn) $styled.showIn.style.position = "relative";
        tooltipRef.current.style.opacity = "0";
        tooltipRef.current.style.display = "flex";
        if (!$styled.isFloat) {
          tooltipRef.current!.classList.add("show");
          return;
        }
        tooltipRef.current.style.visibility = "hidden";
        // tooltipRef.current.style.left = `0px`;
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const triggerRect = getRelativePosition({
          childElement: e.currentTarget,
          ancestorElement: $styled.showIn!,
        });

        const calcRelativePosition = ({
          tooltipElem,
          tooltipRect,
        }: {
          tooltipElem: HTMLElement | null;
          tooltipRect: DOMRect;
        }) => {
          if (!tooltipElem) return;
          tooltipElem.style.top = `${triggerRect.y + triggerRect.height + 8}px`;
          if ($styled.alignMessage === "left") {
            tooltipElem.style.left = `${triggerRect.x - tooltipRect.width}px`;
          } else if ($styled.alignMessage === "right") {
            tooltipElem.style.left = `${triggerRect.x + triggerRect.width}px`;
          } else {
            tooltipElem.style.left = `${triggerRect.x + triggerRect.width / 2 - tooltipRect.width / 2}px`;
          }
        };
        calcRelativePosition({
          tooltipElem: tooltipRef.current,
          tooltipRect,
        });

        const finalTooltipRect = tooltipRef.current.getBoundingClientRect();
        if (finalTooltipRect.width !== tooltipRect.width) {
          calcRelativePosition({
            tooltipElem: tooltipRef.current,
            tooltipRect: finalTooltipRect,
          });
        }
        tooltipRef.current.style.visibility = "visible";
        tooltipRef.current!.classList.add("show");
      }}
      onMouseLeave={() => {
        if (!tooltipRef.current || !$styled.onHoverDisplay) return;
        tooltipRef.current.style.display = "none";
        tooltipRef.current!.classList.remove("show");
      }}
      {...rest}
    >
      {children}
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
`;

function getAlignmentStyle(alignMessage: TooltipAlignMessage) {
  switch (alignMessage) {
    case "left":
      return `
        right: 0;
        /* anclar al borde izquierdo sin desplazar horizontalmente */
        transform: translateY(calc(100% + 8px));
      `;
    case "right":
      return `
        left: 0;
        /* anclar al borde derecho sin desplazar horizontalmente */
        transform: translateY(calc(100% + 8px));
      `;
    case "middle":
    default:
      return `
        left: 50%;
        transform: translateX(-50%) translateY(calc(100% + 8px));
      `;
  }
}

export const StyledTooltipMessage = styled.div.attrs({
  className: "tooltip-message",
})<StyledProp<{ alignMessage: TooltipAlignMessage; notFloat: boolean }>>`
  z-index: 9999 !important;
  position: absolute;
  z-index: 1;
  display: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.07);

  ${({ $styled }) =>
    $styled?.notFloat &&
    css`
      bottom: 0;
      ${getAlignmentStyle($styled.alignMessage)}
    `}

  min-width: 300px;
  height: auto;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-wrap: auto;

  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};

  opacity: 0;

  &.show {
    animation: fadeIn 0.3s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
