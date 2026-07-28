import { HtmlProps } from "../../styles/theme";
import React, { PropsWithChildren } from "react";
import { StyledDocumentCardInfoFooter } from "./documentCardInfo-footer.style";

const DocumentCardInfoFooter: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => (
  <StyledDocumentCardInfoFooter {...htmlProps}>
    {children}
  </StyledDocumentCardInfoFooter>
);

export default DocumentCardInfoFooter;
