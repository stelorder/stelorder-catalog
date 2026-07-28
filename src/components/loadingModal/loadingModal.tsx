import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledLoader } from "./loadingModal.style";
import { Modal } from "../modal";

export type LoadingModalProps = {
  isOpen: boolean;
  isCentered?: boolean;
  animationDurationSec?: number;
  fade?: boolean;
  showIn?: HTMLElement | null;
};

// LoadingModal component
const LoadingModal: React.FC<
  PropsWithChildren<LoadingModalProps & HtmlProps<HTMLDivElement>>
> = ({
  isOpen,
  isCentered = false,
  animationDurationSec = 0.3,
  fade = true,
  children,
  showIn,
  htmlProps,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      isCentered={isCentered}
      animationDurationSec={animationDurationSec}
      fade={fade}
      showIn={showIn}
      htmlProps={{
        ...htmlProps,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...(htmlProps?.style || {}),
        },
      }}
    >
      <StyledLoader />
      {children}
    </Modal>
  );
};

export default LoadingModal;
