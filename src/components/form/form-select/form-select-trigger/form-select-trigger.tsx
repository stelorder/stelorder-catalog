import React from "react";
import { StyledTrigger, StyledChevron } from "./form-select-trigger.style";

type FormSelectTriggerProps = {
  selectedLabel?: string;
  defaultLabel?: string;
  htmlProps?: React.HTMLProps<HTMLDivElement>;
};

export const FormSelectTrigger: React.FC<FormSelectTriggerProps> = ({
  selectedLabel,
  defaultLabel,
  htmlProps,
}) => (
  <StyledTrigger $selected={!!selectedLabel} {...htmlProps}>
    <span>{selectedLabel || defaultLabel || ""}</span>
    <StyledChevron>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.08736 0.837358C1.31516 0.609552 1.68451 0.609552 1.91232 0.837358L4.99984 3.92488L8.08736 0.837358C8.31516 0.609552 8.68451 0.609552 8.91232 0.837358C9.14012 1.06516 9.14012 1.43451 8.91232 1.66232L5.41232 5.16232C5.18451 5.39012 4.81516 5.39012 4.58736 5.16232L1.08736 1.66232C0.859552 1.43451 0.859552 1.06516 1.08736 0.837358Z"
          fill="currentColor"
        />
      </svg>
    </StyledChevron>
  </StyledTrigger>
);
