import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledDocumentCardInfoBodyHeader } from "./documentCardInfo-body-header.style";

const DocumentCardInfoBodyHeader: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => (
  <StyledDocumentCardInfoBodyHeader {...htmlProps}>
    {children}
  </StyledDocumentCardInfoBodyHeader>
);

export default DocumentCardInfoBodyHeader;
