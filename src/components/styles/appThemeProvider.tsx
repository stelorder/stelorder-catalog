import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyle.style";
import { integrationsTheme, IntegrationsThemeType } from "./theme";

type Props = PropsWithChildren<{ theme?: IntegrationsThemeType }>;

const AppThemeProvider: React.FC<Props> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme ?? integrationsTheme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};

AppThemeProvider.displayName = "AppThemeProvider";

export default AppThemeProvider;
