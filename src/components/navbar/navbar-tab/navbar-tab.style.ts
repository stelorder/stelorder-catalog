import styled from "styled-components";

export const StyledLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.bn.bn0};
  font-feature-settings: ${({ theme }) =>
    theme.defaults.navbarLabel.fontFeatureSettings};
  font-family: ${({ theme }) => theme.defaults.navbarLabel.fontFamily};
  font-size: ${({ theme }) => theme.defaults.navbarLabel.fontSize};
  font-style: ${({ theme }) => theme.defaults.navbarLabel.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.navbarLabel.fontWeight};
  line-height: ${({ theme }) => theme.defaults.navbarLabel.lineHeight};
  padding: 8px 12px;
  cursor: pointer;
  transition: color 0.2s ease;
  padding-bottom: 0 !important;

  &:hover {
    color: ${({ theme }) => theme.colors.bn.bn25};
    background: ${({ theme }) => theme.colors.bn.bn90};
  }
  & > *::after {
    content: "";
    width: 100%;
    height: 5px;
    position: initial !important;
    display: block !important;
    transform: none !important;
    margin-top: 3px;
    background-color: transparent !important;
  }

  & > *::before {
    content: "";
    width: 100%;
    height: 5px;
    left: 0;
    bottom: 0;
    position: absolute;
    border-radius: 2px 2px 0 0;
    background-color: transparent;
  }

  & .active {
    letter-spacing: 0.2px;

    &::before {
      background: ${({ theme }) => theme.colors.orderPrimary.orderPrimary100};
    }
  }

  @media (max-width: 1439px) {
    padding: 8px 6px;
  }
`;
