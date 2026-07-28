/* eslint-disable @typescript-eslint/no-empty-object-type */
import "styled-components";
import { IntegrationsThemeType } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends IntegrationsThemeType {}
}
