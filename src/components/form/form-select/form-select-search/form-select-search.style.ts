import styled from "styled-components";

export const SearchContainer = styled.div`
  align-self: stretch;
  padding-top: 4px;
  padding-bottom: 4px;
  background: ${({ theme }) => theme.colors.bn.bn0};
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`;

export const SearchInputWrapper = styled.div`
  flex: 1 1 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  background: ${({ theme }) => theme.colors.orderSecondary.orderSecondary5};
  border-radius: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const SearchInput = styled.input`
  flex: 1 1 0;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  }
`;
