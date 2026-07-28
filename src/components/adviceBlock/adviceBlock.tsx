import { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledAdviceBlock } from "./adviceBlock.style";
import { Icon } from "../icon";

export type AdviceBlockType = "info";

export type AdviceBlockProps = {
  variant?: AdviceBlockType;
};

function AdviceBlock({
  variant = "info",
  children,
  htmlProps,
}: AdviceBlockProps & PropsWithChildren<HtmlProps<HTMLDivElement>>) {
  return (
    <StyledAdviceBlock $styled={{ variant }} {...htmlProps}>
      <Icon
        variant={variant}
        width="12px"
        height="12px"
        color="inherit"
        htmlProps={{
          style: {
            minWidth: "fit-content",
          },
        }}
      />

      {children}
    </StyledAdviceBlock>
  );
}

export default AdviceBlock;
