import styled from "styled-components";

export const StyledScrollListItem = styled.div`
  scroll-snap-align: start;
  padding: 9px 0px;
  border-bottom: 0.75px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
`;
