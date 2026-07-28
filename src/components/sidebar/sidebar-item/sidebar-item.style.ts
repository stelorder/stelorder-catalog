import styled from "styled-components";

export const StyledSidebarItem = styled.div<{
  $expand?: boolean;
}>`
  display: "flex";
  flexdirection: "column";
  minheight: 0;
  ${({ $expand }) => $expand && { flex: 1 }}
`;
