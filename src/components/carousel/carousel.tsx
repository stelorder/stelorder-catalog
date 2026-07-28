import React, { useRef, useState, useEffect, PropsWithChildren } from "react";
import {
  StyledCarousel,
  StyledSlide,
  StyledItem,
  StyledArrowButton,
} from "./carousel.style";
import { Icon } from "../icon";
import { HtmlProps } from "../styles/theme";

export type CarouselProps = {
  gap?: string;
};

const Carousel: React.FC<
  CarouselProps & PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, gap, htmlProps }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const paddingOffset = 10; // padding del StyledCarousel

    setCanScrollLeft(scrollLeft > paddingOffset);
    setCanScrollRight(scrollLeft < maxScroll - paddingOffset);
  };

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);
    const el = carouselRef.current;
    if (!el) return () => clearTimeout(timer);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      {canScrollLeft && (
        <StyledArrowButton
          onClick={() => scroll("left")}
          $styled={{ position: "left" }}
          aria-label="Scroll left"
          type="button"
        >
          <Icon color="#ffffff" height="16px" width="16px" variant="arrow" />
        </StyledArrowButton>
      )}

      <StyledCarousel ref={carouselRef} $styled={{ gap }} {...htmlProps}>
        {children}
      </StyledCarousel>

      {canScrollRight && (
        <StyledArrowButton
          onClick={() => scroll("right")}
          $styled={{ position: "right" }}
          aria-label="Scroll right"
          type="button"
        >
          <Icon color="#ffffff" height="16px" width="16px" variant="arrow" />
        </StyledArrowButton>
      )}
    </div>
  );
};

export type CarouselSlideProps = {
  id: string;
};

const CarouselSlide: React.FC<
  CarouselSlideProps & PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ id, children, htmlProps }) => {
  return (
    <StyledSlide id={id} {...htmlProps}>
      <StyledItem>{children}</StyledItem>
    </StyledSlide>
  );
};

export type CarouselComponent = React.FC<
  CarouselProps & PropsWithChildren<HtmlProps<HTMLDivElement>>
> & {
  Slide: typeof CarouselSlide;
};

const CarouselWithSlide = Carousel as CarouselComponent;
CarouselWithSlide.Slide = CarouselSlide;

export default CarouselWithSlide;
