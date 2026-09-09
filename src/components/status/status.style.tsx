import styled from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../styles/theme";
import { StatusOrderElements, StatusType, StatusVariant } from "./status";
import React, { HTMLAttributes } from "react";
import FormLabel from "../form/form-label/form-label";

const StyledStatusContainer = styled.div<StyledProp<{ gap: number }>>`
  display: flex;
  align-items: center;
  gap: ${({ $styled }) => $styled.gap}px;
`;

const statusColorDict = ({
  theme,
  status,
}: {
  theme: IntegrationsThemeType;
  status: StatusType;
}): string => {
  switch (status) {
    case "warning":
      return theme.colors.status.warning;
    case "danger":
      return theme.colors.alertError.alertError100;
    case "info":
      return theme.colors.blue.blue70;
    case "paused":
      return theme.colors.orderSecondary.orderSecondary70;

    case "active":
      return theme.colors.alertSuccess.alertSuccess100;
    case "success":
    default:
      return theme.colors.status.success;
  }
};

const StyledStatusIcon = styled.svg.attrs<
  StyledProp<{ status: StatusType; order: number }>
>({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 14 14",
  "aria-hidden": true,
})`
  order: ${({ $styled }) => $styled.order};
  width: 14px;
  height: 14px;
  flex: 0 0 auto;

  & > circle {
    fill: ${({ theme, $styled }) =>
      statusColorDict({ theme, status: $styled.status })};
  }
`;

const statusStrokeDict = ({
  theme,
  status,
}: {
  theme: IntegrationsThemeType;
  status: StatusType;
}): string => {
  switch (status) {
    case "danger":
      return theme.colors.posPrimary.posPrimary80;
    case "success":
      return theme.colors.alertSuccess.alertSuccess30;
    default:
      return statusColorDict({ theme, status });
  }
};

/** Variante `dot`: punto de 11px con borde claro. */
const StyledStatusDotIcon = styled.svg.attrs<
  StyledProp<{ status: StatusType; order: number }>
>({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 11 11",
  fill: "none",
  "aria-hidden": true,
})`
  order: ${({ $styled }) => $styled.order};
  width: 11px;
  height: 11px;
  flex: 0 0 auto;

  & > circle {
    fill: ${({ theme, $styled }) =>
      statusColorDict({ theme, status: $styled.status })};
    stroke: ${({ theme, $styled }) =>
      statusStrokeDict({ theme, status: $styled.status })};
  }
`;

const StyledStatusText = styled.span<StyledProp<{ order: number }>>`
  order: ${({ $styled }) => $styled.order};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  font-style: ${({ theme }) => theme.fonts.h1500.fontStyle};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
`;

export const StyledStatusComponent: React.FC<
  StyledProp<{
    gap: number;
    status: StatusType;
    variant: StatusVariant;
    order: StatusOrderElements;
    label?: string;
    statusText?: string;
  }> &
    HTMLAttributes<HTMLDivElement>
> = ({ $styled, ...rest }) => {
  return (
    <StyledStatusContainer $styled={{ gap: $styled.gap }} {...rest}>
      {$styled.label && (
        <FormLabel
          htmlProps={{
            style: { order: $styled.order.label },
          }}
        >
          {$styled.label}
        </FormLabel>
      )}
      {$styled.variant === "dot" ? (
        <StyledStatusDotIcon
          $styled={{ status: $styled.status, order: $styled.order.icon }}
        >
          <circle cx="5.5" cy="5.5" r="4.75" strokeWidth="1.5" />
        </StyledStatusDotIcon>
      ) : (
        <StyledStatusIcon
          $styled={{ status: $styled.status, order: $styled.order.icon }}
        >
          <circle cx="7" cy="7" r="7" />
        </StyledStatusIcon>
      )}
      {$styled.statusText && (
        <StyledStatusText $styled={{ order: $styled.order.text }}>
          {$styled.statusText}
        </StyledStatusText>
      )}
    </StyledStatusContainer>
  );
};
