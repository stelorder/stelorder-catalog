import React from "react";
import { HtmlProps } from "../styles/theme";
import { StyledStatusComponent } from "./status.style";

export type StatusType =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "paused"
  | "active";

export type StatusOrderElements = {
  label: number;
  icon: number;
  text: number;
};

const Status: React.FC<
  {
    gap?: number;
    status: StatusType;
    order?: Partial<StatusOrderElements>;
    label?: string;
    statusText?: string;
  } & HtmlProps<HTMLDivElement>
> = ({ gap = 6, status, order, label, statusText, htmlProps }) => {
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
        order: mergedOrder,
        label,
        statusText,
      }}
      {...htmlProps}
    />
  );
};

export default Status;
