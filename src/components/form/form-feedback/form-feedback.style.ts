import styled from "styled-components";
import { StyledProp } from "../../styles/theme";

export const StyledFeedback = styled.small<
  StyledProp<{ type?: "invalid" | "valid" }>
>`
  color: ${({ $styled, theme }) =>
    $styled.type === "valid"
      ? theme.colors.alertSuccess.alertSuccess100
      : theme.colors.alertError.alertError100};
  font-feature-settings: ${({ theme }) =>
    theme.defaults.formFeedback.fontFeatureSettings};
  font-family: ${({ theme }) => theme.defaults.formFeedback.fontFamily};
  font-size: ${({ theme }) => theme.defaults.formFeedback.fontSize};
  font-style: ${({ theme }) => theme.defaults.formFeedback.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.formFeedback.fontWeight};
  line-height: ${({ theme }) => theme.defaults.formFeedback.lineHeight};
  display: none;
`;
