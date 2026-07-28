import React from "react";

import { StyledGroup, StyledGroupTitle } from "./list-group.style";

import { ListGroupProps } from "./list-group.types";

export const ListGroup: React.FC<ListGroupProps> = ({ title, children }) => {
  return (
    <StyledGroup>
      {title && <StyledGroupTitle>{title}</StyledGroupTitle>}

      {children}
    </StyledGroup>
  );
};
