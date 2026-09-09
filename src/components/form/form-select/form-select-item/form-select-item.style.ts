import styled, { css } from "styled-components";
import { ListItemBase } from "../../../list/list-item/list-item";
import {
  StyledLabel,
  StyledDescription,
  StyledEndContent,
  StyledTextContent,
} from "../../../list/list-item/list-item.style";

export const StyledFormSelectItem = styled(ListItemBase)`
  && {
    padding: 8px 10px 8px 10px;
  }

  ${StyledLabel},
  ${StyledDescription},
  ${StyledEndContent} {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  }

  ${StyledLabel} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${StyledTextContent} {
    min-width: 0;
    overflow: hidden;
  }

  ${({ clickable, expandable, disabled, theme }) =>
    (clickable || expandable) &&
    !disabled &&
    css`
      &&:hover {
        background: ${theme.colors.bn.bn10};

        ${StyledLabel},
        ${StyledDescription},
        ${StyledEndContent} {
          color: ${theme.colors.orderSecondary.orderSecondary90};
        }
      }
    `}
`;
