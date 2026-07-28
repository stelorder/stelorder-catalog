import styled from "styled-components";

export const StyledToolbar = styled.div<{
  $height?: string;
  $width?: string;
  $backgroundColor?: string;
}>`
  height: ${({ $height }) => $height ?? "auto"};
  width: ${({ $width }) => $width ?? "100%"};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "#ffffff"};
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
