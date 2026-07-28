import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledDocumentCardInfo } from "./documentCardInfo-body.style";
import { SimpleGrid } from "../../simple-grid";
import DocumentCardInfoBodyBody from "./documentCardInfo-body-body/documentCardInfo-body-body";
import DocumentCardInfoBodyHeader from "./documentCardInfo-body-header/documentCardInfo-body-header";

const DocumentCardInfoBodyBase: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => {
  return (
    <StyledDocumentCardInfo {...htmlProps}>
      <SimpleGrid direction="column" itemsPerLine={1} gap={6}>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => (
            <SimpleGrid.Item key={index}>{child}</SimpleGrid.Item>
          ))}
      </SimpleGrid>
    </StyledDocumentCardInfo>
  );
};

type DocumentCardInfoBodyComponent = typeof DocumentCardInfoBodyBase & {
  Body: typeof DocumentCardInfoBodyBody;
  Header: typeof DocumentCardInfoBodyHeader;
};

const DocumentCardInfoBody =
  DocumentCardInfoBodyBase as DocumentCardInfoBodyComponent;

DocumentCardInfoBody.Body = DocumentCardInfoBodyBody;
DocumentCardInfoBody.Header = DocumentCardInfoBodyHeader;

export default DocumentCardInfoBody;
