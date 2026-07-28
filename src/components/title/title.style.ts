// ...existing code...
import styled from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../styles/theme";
import { TextAlign, TitleVariant } from "./title";

const colorDict = ({
  theme,
  variant,
}: {
  theme: IntegrationsThemeType;
  variant: TitleVariant;
}): string => {
  switch (variant) {
    case "primary":
      return theme.colors.orderSecondary.orderSecondary100;
    case "default":
    default:
      return theme.colors.orderSecondary.orderSecondary100;
  }
};

// NUEVO: tipografía por variant
const typographyByVariant = (
  theme: IntegrationsThemeType,
  variant: TitleVariant,
) => {
  switch (variant) {
    case "primary":
      return theme.fonts.titleL500;
    case "default":
    default:
      return theme.fonts.titleL700; // cambia aquí si quieres otro token
  }
};

// NUEVO: text-align por variant con override desde props
const textAlignByVariant = (
  variant: TitleVariant,
  explicit?: TextAlign,
): TextAlign => {
  if (explicit) return explicit;
  switch (variant) {
    case "primary":
      return "center";
    case "default":
    default:
      return "left";
  }
};

export const StyledTitle = styled.h1<
  StyledProp<{ variant: TitleVariant; textAlign: TextAlign }>
>`
  color: ${({ theme, $styled }) =>
    colorDict({ theme, variant: $styled.variant })};

  text-align: ${({ $styled }) =>
    textAlignByVariant($styled.variant, $styled.textAlign)};

  font-family: ${({ theme, $styled }) =>
    typographyByVariant(theme as IntegrationsThemeType, $styled.variant)
      .fontFamily};
  font-size: ${({ theme, $styled }) =>
    typographyByVariant(theme as IntegrationsThemeType, $styled.variant)
      .fontSize};
  font-weight: ${({ theme, $styled }) =>
    typographyByVariant(theme as IntegrationsThemeType, $styled.variant)
      .fontWeight};
  line-height: ${({ theme, $styled }) =>
    typographyByVariant(theme as IntegrationsThemeType, $styled.variant)
      .lineHeight};

  margin: 0;
`;
