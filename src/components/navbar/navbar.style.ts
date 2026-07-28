import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: flex; /* Necesario para alinear hijos */
  justify-content: space-between;
  width: 100%;

  padding: 0 20px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.bn.bn100};

  && .tooltip-message {
    padding: 0;
    width: auto;
    max-width: unset;
    text-wrap: nowrap;
    white-space: nowrap;
  }

  && .tooltip-message.show {
    display: block;
  }
`;
