import styled from "styled-components";

export const StyledSidebar = styled.div<{
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
}>`
  width: ${({ $width }) => $width ?? "280px"};

  height: ${({ $height }) => $height ?? "100%"};

  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "#ffffff"};

  display: flex;

  flex-direction: column;

  box-sizing: border-box;

  overflow: hidden;

  font-family: Roboto, sans-serif;
`;
