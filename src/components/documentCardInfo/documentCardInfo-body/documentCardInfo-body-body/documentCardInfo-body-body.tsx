import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../../styles/theme";
import { StyledDocumentCardInfoBodyBody } from "./documentCardInfo-body-body.style";

const DocumentCardInfoBodyBody: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => (
  <StyledDocumentCardInfoBodyBody {...htmlProps}>
    {children}
  </StyledDocumentCardInfoBodyBody>
);

export default DocumentCardInfoBodyBody;
