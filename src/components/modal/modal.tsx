/* eslint-disable no-undef */
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HtmlProps } from "../styles/theme";
import Icon from "../icon/icon";
import { IconVariant } from "../icon/icon-constants";
import {
  StyledBackdropContainer,
  StyledCenteredIconWrapper,
  StyledCloseButton,
  StyledIconAddon,
  StyledModalContainer,
  StyledModalContent,
  StyledModalIconRow,
} from "./modal.style";

export type ModalLayout = "default" | "centered" | "none";

export type ModalProps = {
  isOpen: boolean;
  isCentered?: boolean;
  animationDurationSec?: number;
  fade?: boolean;
  showIn?: HTMLElement | null;
  icon?: IconVariant;
  showCloseButton?: boolean;
  onClose?: () => void;
  layout?: ModalLayout;
};

// Modal component
const Modal: React.FC<
  PropsWithChildren<ModalProps & HtmlProps<HTMLDivElement>>
> = ({
  isOpen,
  isCentered = false,
  animationDurationSec = 0.3,
  fade = true,
  children,
  showIn,
  htmlProps,
  icon,
  showCloseButton = false,
  onClose,
  layout = "default",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen, setShow]);

  useEffect(() => {
    if (ref.current) {
      if (show) {
        ref.current.classList.add("show");
      }
    }
  }, [show]);

  useEffect(() => {
    const prev = ref.current;
    let timeout = null as NodeJS.Timeout | null;
    if (prev) {
      if (!isOpen) {
        prev!.classList.remove("show");
        timeout = setTimeout(() => {
          setShow(false);
        }, animationDurationSec * 1000);
      }
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen, animationDurationSec, setShow]);

  return show
    ? createPortal(
        <>
          <StyledBackdropContainer
            className="fade"
            $styled={{
              fade,
              animationDurationSec,
            }}
            ref={ref}
          ></StyledBackdropContainer>
          <StyledModalContainer $styled={{ isCentered }}>
            <StyledModalContent
              {...htmlProps}
              $styled={{ animationDurationSec, layout }}
            >
              {showCloseButton && (
                <StyledCloseButton
                  type="button"
                  onClick={onClose}
                  aria-label="close"
                >
                  <Icon variant="close" width="22px" height="22px" />
                </StyledCloseButton>
              )}
              {layout === "centered" && icon !== undefined && (
                <StyledCenteredIconWrapper>
                  <StyledIconAddon>
                    <Icon variant={icon} width="100px" height="100px" />
                  </StyledIconAddon>
                </StyledCenteredIconWrapper>
              )}
              {layout === "none" && icon !== undefined && (
                <StyledIconAddon>
                  <Icon variant={icon} width="24px" height="24px" />
                </StyledIconAddon>
              )}
              {layout === "default" && icon !== undefined ? (
                <StyledModalIconRow>
                  <StyledIconAddon>
                    <Icon variant={icon} width="24px" height="24px" />
                  </StyledIconAddon>
                  <div style={{ flex: "1 0 0", minWidth: 0 }}>{children}</div>
                </StyledModalIconRow>
              ) : (
                children
              )}
            </StyledModalContent>
          </StyledModalContainer>
        </>,
        showIn ?? document.body,
      )
    : null;
};

export default Modal;
