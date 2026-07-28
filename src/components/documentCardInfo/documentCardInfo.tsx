import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledDocumentCardInfo } from "./documentCardInfo.style";
import DocumentCardInfoBody from "./documentCardInfo-body/documentCardInfo-body";
import DocumentCardInfoFooter from "./documentCardInfo-footer/documentCardInfo-footer";
import { SimpleGrid } from "../simple-grid";

// Crear el componente base
const DocumentCardInfoBase: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => {
  return (
    <StyledDocumentCardInfo {...htmlProps}>
      <SimpleGrid
        direction="column"
        itemsPerLine={1}
        gap={12}
        htmlProps={{ as: "header" }}
      >
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => (
            <SimpleGrid.Item key={index}>{child}</SimpleGrid.Item>
          ))}
      </SimpleGrid>
    </StyledDocumentCardInfo>
  );
};

type DocumentCardInfoComponent = typeof DocumentCardInfoBase & {
  Body: typeof DocumentCardInfoBody;
  Footer: typeof DocumentCardInfoFooter;
};

const DocumentCardInfo = DocumentCardInfoBase as DocumentCardInfoComponent;

DocumentCardInfo.Body = DocumentCardInfoBody;
DocumentCardInfo.Footer = DocumentCardInfoFooter;

export default DocumentCardInfo;
