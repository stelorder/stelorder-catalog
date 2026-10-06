import React from "react";
import { HtmlProps } from "../styles/theme";
import { StyledStatusComponent } from "./status.style";

export type StatusType =
  "success" | "danger" | "warning" | "info" | "paused" | "active";

export type StatusOrderElements = {
  label: number;
  icon: number;
  text: number;
};

/**
 * - `default`: círculo macizo de 14px.
 * - `dot`: punto de 11px con borde claro (`statusDot`).
 */
export type StatusVariant = "default" | "dot";

const Status: React.FC<
  {
    gap?: number;
    status: StatusType;
    variant?: StatusVariant;
    order?: Partial<StatusOrderElements>;
    label?: string;
    statusText?: string;
  } & HtmlProps<HTMLDivElement>
> = ({
  gap = 6,
  status,
  variant = "default",
  order,
  label,
  statusText,
  htmlProps,
}) => {
  const defaultOrder: StatusOrderElements = {
    label: 0,
    icon: 1,
    text: 2,
  };

  const mergedOrder: StatusOrderElements = {
    ...defaultOrder,
    ...order,
  };

  return (
    <StyledStatusComponent
      $styled={{
        gap,
        status,
        variant,
        order: mergedOrder,
        label,
        statusText,
      }}
      {...htmlProps}
    />
  );
};

export default Status;
